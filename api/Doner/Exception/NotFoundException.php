<?php

namespace Doner\Exception;

/**
 * Class NotFoundException
 *
 * @package Doner\Exception
 */
class NotFoundException extends BaseException {
	public function __construct() {
		$this->message = 'Route not found';
		$this->code = 404;
	}
}
