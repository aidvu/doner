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
	 * @var string $message response message
	 */
	protected $message;

	/**
	 * @var string $header response http header
	 */
	protected $header;

	/**
	 * Processes the Exception response
	 */
	public function return_error() {
		header( 'HTTP/1.1 ' . $this->get_header() );
		echo $this->get_message();
	}

	/**
	 * @return string returns $this->message
	 */
	private function get_message() {
		return $this->message;
	}

	/**
	 * @return string returns $this->header
	 */
	private function get_header() {
		return $this->header;
	}
}
