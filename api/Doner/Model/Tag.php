<?php

namespace Doner\Model;

/**
 * Class Tag
 *
 * @package Doner\Model
 */
class Tag extends BaseModel {

	/**
	 * @var string $table DB table
	 */
	protected static $table = 'tags';

	/**
	 * @var array $fields DB table fields
	 */
	protected static $fields = array(
		'id',
		'name'
	);
}
