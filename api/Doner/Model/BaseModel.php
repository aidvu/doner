<?php

namespace Doner\Model;

use Doner\Database\MySql;
use Doner\Exception\InternalErrorException;

/**
 * Class BaseModel
 *
 * @package Doner\Model
 */
class BaseModel {

	/**
	 * @var string $table DB table
	 */
	protected static $table;

	/**
	 * @var array $fields DB table fields
	 */
	protected static $fields;

	/**
	 * @var array $order_by DB order_by fields
	 */
	protected static $order_by;

	/**
	 * Get a list of records from database filtered by parameters
	 *
	 * @param array $parameters query parameters
	 * @param int $limit number of records to be returned by query
	 *
	 * @return array fetched rows from DB
	 */
	public static function get( $parameters = array(), $limit = 0 ) {
		$db = MySql::getInstance();

		$query = "SELECT " . implode( ', ', static::$fields ) . " FROM " . static::$table;

		$bindings = array();
		if ( ! empty( $parameters ) ) {
			$query .= " WHERE ";

			foreach ( $parameters as $parameter ) {
				$query .= $parameter['field'] . ' ' . $parameter['operator'] . ' ? ';
				$bindings[] = $parameter['value'];
			}
		}

		if ( ! empty( static::$order_by ) ) {
			$query .= " ORDER BY " . implode( ', ', static::$order_by );
		}

		if (!empty($limit)) {
			$query .= " LIMIT $limit ";
		}

		$stmt = $db->prepare( $query );
		$stmt->execute( $bindings );
		$rows = $stmt->fetchAll( \PDO::FETCH_CLASS, get_called_class() );

		return $rows;
	}

	/**
	 * Fetch a single record from DB filtered by parameters
	 *
	 * @param array $parameters query parameters
	 *
	 * @return BaseModel|null fetched model or null if it doesn't exist
	 */
	public static function get_one( $parameters ) {
		$model = null;

		$models = static::get( $parameters, 1 );
		if ( ! empty( $models ) ) {
			$model = $models[0];
		}

		return $model;
	}

	/**
	 * Delete record from DB by id
	 *
	 * @param int $id id of the record to be deleted
	 *
	 * @return int Number of rows affected
	 */
	public static function delete( $id ) {
		$db = MySql::getInstance();

		$stmt = $db->prepare( "DELETE FROM " . static::$table . " WHERE id = ?" );
		$stmt->execute( array( $id ) );

		$count = $stmt->rowCount();

		return $count;
	}

	/**
	 * Insert or update model in DB
	 *
	 * @return int Number of rows affected
	 */
	public function save() {
		$db = MySql::getInstance();

		$save_values = array();

		foreach ( static::$fields as $field ) {
			if ( isset( $this->$field ) ) {
				$save_values[ $field ] = $this->$field;
			}
		}

		if ( empty( $save_values['id'] ) ) {
			$query = "INSERT INTO " . static::$table . " (" . implode( ", ", array_keys( $save_values ) ) . ")
						VALUES (?" . str_repeat( ", ?", count( $save_values ) - 1 ) . ")";
			$bindings = array_values( $save_values );
		} else {
			$id = $save_values['id'];
			unset( $save_values['id'] );

			$query = "UPDATE " . static::$table . " SET ";
			$query .= implode( " = ?, ", array_keys( $save_values ) ) . " = ? ";
			$query .= " WHERE id = ?";
			array_push( $save_values, $id );
			$bindings = array_values( $save_values );
		}

		$db->beginTransaction();

		$stmt = $db->prepare( $query );
		$stmt->execute( $bindings );

		if ( empty( $this->id ) ) {
			$this->id = $db->lastInsertId();
		}

		$model = static::get_one(
			array(
				array(
					'field' => 'id',
					'operator' => '=',
					'value' => $this->id,
				),
			)
		);

		if ( empty( $model ) ) {
			$db->rollBack();
			throw new InternalErrorException($db->errorInfo());
		}

		$db->commit();

		foreach ( static::$fields as $field ) {
			$this->$field = $model->$field;
		}

		return $this;
	}
}
