<?php

namespace Doner\Model;

use Doner\Database\MySql;

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
	 * Insert or update record in DB
	 *
	 * @param array $variables variables parsed from request
	 *
	 * @return int Number of rows affected
	 */
	public static function save( $variables ) {
		$db = MySql::getInstance();

		$save_values = array();

		foreach ( $variables as $key => $value ) {
			if ( in_array( $key, static::$fields ) ) {
				$save_values[ $key ] = $value;
			}
		}

		$stmt = $db->prepare( "INSERT INTO " . static::$table .
		                      " (" . implode( ", ", array_keys( $save_values ) ) . ")
		                     VALUES (?" . str_repeat( ", ?", count( $save_values ) - 1 ) . ")" );
		$stmt->execute( array_values( $save_values ) );
		$count = $stmt->rowCount();

		return $count;
	}
}
