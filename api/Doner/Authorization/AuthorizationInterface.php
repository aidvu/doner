<?php

namespace Doner\Authorization;

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
