<?php

namespace Doner\Model;

/**
 * Class Done
 *
 * @package Doner\Model
 */
class Done extends BaseModel {

	/**
	 * @var string $table DB table
	 */
	protected static $table = 'dones';

	/**
	 * @var array $fields DB table fields
	 */
	protected static $fields = array(
		'id',
		'user_id',
		'text',
		'status',
		'created_at',
		'updated_at',
	);

	/**
	 * @var array $order_by DB order_by fields
	 */
	protected static $order_by = array(
		'created_at DESC',
		'updated_at DESC',
	);

	public static function save( $variables ) {
		return parent::save( $variables );
	}
}