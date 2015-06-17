<?php

namespace Doner\Exception;

/**
 * Class NotFoundException
 *
 * @package Doner\Exception
 */
class NotFoundException extends BaseException {
	public function __construct() {
		$this->message = json_encode(
			array(
				'message' => 'Route not found'
			)
		);
		$this->header = '404 Not Found';
	}
}
