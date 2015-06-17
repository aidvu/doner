<?php

namespace Doner\Exception;

/**
 * Class ContentTypeException
 *
 * @package Doner\Exception
 */
class ContentTypeException extends BaseException {
	public function __construct() {
		$this->message = json_encode(
			array(
				'message' => 'Only application/json Content-Type supported'
			)
		);
		$this->header = '400 Bad Request';
	}
}
