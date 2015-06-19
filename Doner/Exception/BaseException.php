<?php

namespace Doner\Exception;

use Doner\Http\Response;

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
	public function output() {
		$response = new Response(
			array(
				'message' => $this->message,
			),
			$this->code
		);
		$response->output();
	}
}
