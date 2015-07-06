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
	protected static $fields = array();

	/**
	 * @var array $order_by DB order_by fields
	 */
	protected static $order_by = array();

	/**
	 * @var array $additional_fields fields to pull from join tables
	 */
	protected static $additional_fields = array();

	/**
	 * Get a list of records from database filtered by parameters
	 *
	 * @param array|null $select_fields fields to fetch or null to fetch all fields for Model
	 * @param array $parameters query parameters
	 * @param int $limit number of records to be returned by query
	 *
	 * @return array fetched rows from DB
	 */
	public static function get( $select_fields = null, $parameters = array(), $limit = 0 ) {
		$db = MySql::getInstance();

		if ( empty( $select_fields ) ) {
			$select_fields = static::$fields;
		}

		$fields = array();
		foreach ( $select_fields as $field ) {
			$fields[] = static::$table . '.' . $field . ' as ' . $field;
		}

		$join_tables = array();
		foreach ( static::$additional_fields as $additional_field ) {
			$fields = array_merge( $fields, $additional_field['fields'] );
			$join_tables[] = ' INNER JOIN ' . $additional_field['join'];
		}

		$query = "SELECT " . implode( ', ', $fields ) . " FROM " . static::$table . implode( ' ', $join_tables );

		$bindings = array();
		if ( ! empty( $parameters ) ) {
			$query .= " WHERE ";

			$query_parts = array();
			foreach ( $parameters as $parameter ) {
				if ( in_array( $parameter['field'], static::$fields, true ) ) {
					$parameter['field'] = static::$table . '.' . $parameter['field'];
				}

				$query_part = $parameter['field'] . ' ' . $parameter['operator'] . ' ? ';
				$binding = $parameter['value'];

				if ( strtoupper($parameter['operator']) === 'IN' ) {
					$query_part = $parameter['field'] . ' ' . $parameter['operator'] . ' ( ';
					$query_part .= '?' . str_repeat(',?', sizeof($parameter['value']) - 1);
					$query_part .= ' ) ';
					$binding = $parameter['value'];
				}

				$query_parts[] = $query_part;
				if (is_array($binding)) {
					$bindings = array_merge($bindings, $binding);
				} else {
					$bindings[] = $binding;
				}
			}
			$query .= implode( ' AND ', $query_parts );
		}

		if ( ! empty( static::$order_by ) ) {
			$query .= " ORDER BY " . implode( ', ', static::$order_by );
		}

		if ( ! empty( $limit ) ) {
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
	 * @param array|null $select_fields fields to fetch or null to fetch all fields for Model
	 * @param array $parameters query parameters
	 *
	 * @return BaseModel|null fetched model or null if it doesn't exist
	 */
	public static function get_one( $select_fields = null, $parameters ) {
		$model = null;

		$models = static::get( $select_fields, $parameters, 1 );
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
	 *
	 * @throws InternalErrorException
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
			$query = "INSERT INTO " . static::$table .
			            " (" . implode( ", ", array_keys( $save_values ) ) . ") " .
			            " VALUES (?" . str_repeat( ", ?", count( $save_values ) - 1 ) . ")";
			$bindings = array_values( $save_values );
		} else {
			$id = $save_values['id'];
			unset( $save_values['id'] );

			$query = "UPDATE " . static::$table .
			         " SET " . implode( " = ?, ", array_keys( $save_values ) ) . " = ? " .
			         " WHERE id = ?";
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
			null,
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
			throw new InternalErrorException( $db->errorInfo() );
		}

		$db->commit();

		$this->populate_model( (array) $model, true );
	}

	/**
	 * Populates model from a given key => value array based on $fields defined for the Model
	 *
	 * @param array $variables key => value fields to populate model with
	 * @param boolean $skip_fields_check skip check if a field is in the Models $fields array
	 */
	public function populate_model( $variables, $skip_fields_check = false ) {
		foreach ( $variables as $key => $value ) {
			if ( $skip_fields_check || in_array( $key, static::$fields ) ) {
				$this->$key = $value;
			}
		}
	}
}
