<?php

namespace Doner\Database;

class MySql
{
	// Hold an instance of the class
	private static $instance;

	// Disable clone function
	private function __clone() {}

	// A private constructor; prevents direct creation of object
	private function __construct() {}

	// The singleton method
	public static function getInstance() {
		if (!isset(self::$instance)) {
			self::$instance = new \PDO('mysql:host=' . HOST . ';dbname=' . DATABASE, USERNAME, PASSWORD);
		}
		return self::$instance;
	}
}
