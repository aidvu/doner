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
	 * Get a list of records from database filtered by parameters
	 *
	 * @param array $parameters query parameters
	 *
	 * @return array fetched rows from DB
	 */
	public static function get($parameters = array()) {

		$db = MySql::getInstance();

		$query = "SELECT " . implode(', ', static::$fields) . " FROM " . static::$table;

		$bindings = array();
		if (!empty($parameters)) {
			$query .= " WHERE ";

			foreach ($parameters as $parameter) {
				$query .= $parameter['field'] . ' ' . $parameter['operator'] . ' ? ';
				$bindings[] = $parameter['value'];
			}
		}

		$stmt = $db->prepare($query);
		$stmt->execute($bindings);
		$rows = $stmt->fetchAll(\PDO::FETCH_ASSOC);

		return $rows;
	}
}
