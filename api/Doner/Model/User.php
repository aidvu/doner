<?php

namespace Doner\Model;

/**
 * Class User
 *
 * @package Doner\Model
 */
class User extends BaseModel {

	/**
	 * @var string $table DB table
	 */
	protected static $table = 'users';

	/**
	 * @var array $fields DB table fields
	 */
	protected static $fields = array(
		'id',
		'email',
		'token',
		'name',
	);
}
