<?php

namespace Doner\Model;

use Doner\Validator;

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
		'name',
	);

	/**
	 * Find the Tag with given $name or create one if it doesn't exist
	 *
	 * @param string $name to search for
	 */
	public function find_or_save( $name ) {
		$this->name = strtolower( $name );
		Validator::validate(
			$this,
			array(
				'name' => array( Validator::NOT_EMPTY, Validator::STRING ),
			)
		);

		$model = static::get_one(
			null,
			array(
				array(
					'field' => 'name',
					'operator' => '=',
					'value' => $this->name,
				),
			)
		);

		if ( ! empty( $model ) ) {
			$this->populate_model( (array) $model, true );

			return;
		}

		$this->save();
	}
}
