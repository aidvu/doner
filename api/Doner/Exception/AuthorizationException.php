<?php

namespace Doner\Exception;

/**
 * Class AuthorizationException
 *
 * @package Doner\Exception
 */
class AuthorizationException extends BaseException {
	public function __construct() {
		$this->message = 'Unauthorized';
		$this->code = 401;
	}
}
