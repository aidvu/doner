<?php

namespace Doner\Model;

use Doner\Exception\AuthorizationException;
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
	);

	/**
	 * @var array $additional_fields fields to pull from join tables
	 */
	protected static $additional_fields = array(
		array(
			'fields' => array(
				'users.name AS user'
			),
			'join' => 'users ON dones.user_id = users.id'
		),
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

		$tags = array();
		$parsed_tags = $this->parse_tags( $this->text );
		foreach ( $parsed_tags as $parsed_tag ) {
			$tag = new Tag();
			$tag->find_or_save( $parsed_tag );
			$tags[] = $tag;
		}
	}

	/**
	 * Find all #tags in the done text. A tag starts with # and ends with a space.
	 *
	 * @return array of parsed tags
	 */
	private function parse_tags() {
		preg_match_all( "/#([^ ]+)/i", $this->text, $matches );

		return $matches[1];
	}

	/**
	 * Checks if given user is owner of the done
	 *
	 * @param int $id Done Id
	 * @param int $user_id User Id
	 *
	 * @throws AuthorizationException
	 */
	public static function is_owner( $id, $user_id ) {
		$model = static::get_one(
			array( 'id' ),
			array(
				array(
					'field' => 'id',
					'operator' => '=',
					'value' => $id,
				),
				array(
					'field' => 'user_id',
					'operator' => '=',
					'value' => $user_id,
				),
			)
		);

		if ( empty( $model ) ) {
			throw new AuthorizationException();
		}
	}
}
