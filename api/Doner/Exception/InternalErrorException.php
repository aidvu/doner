<?php

namespace Doner\Exception;

/**
 * Class InternalErrorException
 *
 * @package Doner\Exception
 */
class InternalErrorException extends BaseException {
	public function __construct($message = 'Internal Server Error') {
		$this->message = $message;
		$this->code = 500;
	}
}
