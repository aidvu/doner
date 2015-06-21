<?php

namespace Doner\Exception;

/**
 * Class ContentTypeException
 *
 * @package Doner\Exception
 */
class ContentTypeException extends BaseException {
	public function __construct() {
		$this->message = 'Only application/json Content-Type supported';
		$this->code = 400;
	}
}
