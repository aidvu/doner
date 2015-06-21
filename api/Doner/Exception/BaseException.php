<?php

namespace Doner\Exception;

/**
 * Class BaseException
 * Abstract class for API exceptions
 *
 * @package Doner\Exception
 */
abstract class BaseException extends \Exception {

	/**
	 * Processes the Exception response
	 */
	public function get_message() {
		return array(
			'code' => $this->code,
			'message' => $this->message,
		);
	}
}
