<?php

namespace Doner\Exception;

/**
 * Class ValidationException
 *
 * @package Doner\Exception
 */
class ValidationException extends BaseException {

	/**
	 * @var array $errors Validation errors
	 */
	private $errors;

	public function __construct( $errors ) {
		$this->message = 'Validation error';
		$this->code = 400;
		$this->errors = $errors;
	}

	/**
	 * Processes the Exception response
	 */
	public function get_message() {
		return array(
			'code' => $this->code,
			'message' => $this->message,
			'errors' => $this->errors,
		);
	}
}
