<?php

namespace Doner\Exception;

/**
 * Class JSONFormatException
 *
 * @package Doner\Exception
 */
class JSONFormatException extends BaseException {
	public function __construct() {
		$this->message =  'Request data is not a JSON formatted string';
		$this->code = 400;
	}
}
