<?php

namespace Doner\Exception;

/**
 * Class JSONFormatException
 *
 * @package Doner\Exception
 */
class JSONFormatException extends BaseException {
	public function __construct() {
		$this->message = json_encode(
			array(
				'message' => 'Request data is not a JSON formatted string'
			)
		);
		$this->header = '400 Bad Request';
	}
}
