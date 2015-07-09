<?php

namespace Doner;

use Doner\Exception\ValidationException;

/**
 * Class Validator
 *
 * Validator for various data types
 *
 * @package Doner
 */
class Validator {

	/**
	 * Validator type constants
	 */
	const INT = 'int';
	const STRING = 'string';
	const REQUIRED = 'required';
	const DATE = 'date';
	const NOT_EMPTY = 'not_empty';

	/**
	 * Validates the model with the given field_validators
	 *
	 * @param \Doner\Model\BaseModel $model
	 * @param array $field_validators field => validators array
	 *
	 * @throws ValidationException
	 */
	public static function validate( $model, $field_validators ) {
		foreach ( $field_validators as $field => $validators ) {
			foreach ( $validators as $validator ) {
				$function = 'validate_' . $validator;
				if ( ! Validator::$function( $model, $field ) ) {
					if ( ! isset( $errors[ $field ] ) ) {
						$errors[ $field ] = array();
					}
					$field_value = null;
					if ( isset( $model->$field ) ) {
						$field_value = $model->$field;
					}
					$errors[ $field ][] = "$validator validator for $field with value " . var_export( $field_value, true );
				}
			}
		}
		if ( ! empty( $errors ) ) {
			throw new ValidationException( $errors );
		}
	}

	/**
	 * Validate that $field for given $model is an integer if set
	 *
	 * @param $model
	 * @param $field
	 *
	 * @return bool
	 */
	public static function validate_int( $model, $field ) {
		return ! isset( $model->$field ) || preg_match( '/^\d+$/', $model->$field );
	}

	/**
	 * Validate that $field for given $model is a string if set
	 *
	 * @param $model
	 * @param $field
	 *
	 * @return bool
	 */
	public static function validate_string( $model, $field ) {
		return ! isset( $model->$field ) || is_string( $model->$field );
	}

	/**
	 * Validate that $field for given $model is set
	 *
	 * @param $model
	 * @param $field
	 *
	 * @return bool
	 */
	public static function validate_required( $model, $field ) {
		return isset( $model->$field ) && strlen( $model->$field ) > 0;
	}

	/**
	 * Validate that $field for given $model is a 'Y-m-d H:i:s' formatted date if set
	 *
	 * @param $model
	 * @param $field
	 *
	 * @return bool
	 */
	public static function validate_date( $model, $field ) {
		return ! isset( $model->$field ) || \DateTime::createFromFormat( 'Y-m-d H:i:s', $model->$field ) !== false;
	}

	/**
	 * Validate that $field for given $model is not empty if set
	 *
	 * @param $model
	 * @param $field
	 *
	 * @return bool
	 */
	public static function validate_not_empty( $model, $field ) {
		return ! isset( $model->$field ) || strlen( $model->$field ) > 0;
	}
}
