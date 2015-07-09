<?php

namespace Doner\Authorization;

/**
 * Interface AuthorizationInterface
 *
 * Should be implemented by all Authorization classes to be used in the API
 *
 * @package Doner\Authorization
 */
interface AuthorizationInterface {
	/**
	 * Returns the logged in user
	 */
	public function get_user();

	/**
	 * Authorize user by some means
	 */
	public function authorize();
}
