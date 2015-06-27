<?php

namespace Doner\Model;

use Doner\Validator;

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

	public function save() {
		Validator::validate(
			$this,
			array(
				'id' => array( Validator::INT ),
				'user_id' => array( Validator::REQUIRED, Validator::INT ),
				'text' => array( Validator::NOT_EMPTY, Validator::STRING ),
				'status' => array( Validator::NOT_EMPTY, Validator::INT ),
			)
		);

		if ( ! isset( $this->id ) ) {
			$this->created_at = gmdate( 'Y-m-d H:i:s' );
		}

		parent::save();
	}
}
