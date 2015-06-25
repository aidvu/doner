<?php

namespace Doner\Authorization;

use Doner\Exception\AuthorizationException;
use Doner\Model\User;

class CookieAuthorization implements AuthorizationInterface {

	/**
	 * @var User $user Authorized user
	 */
	private $user;

	/**
	 * Returns the logged in user
	 */
	public function get_user() {
		return $this->user;
	}

	/**
	 * Authorize user by some means
	 */
	public function authorize() {
		if ( empty( $_COOKIE['doner_cookie'] ) ) {
			throw new AuthorizationException();
		}
		$auth_cookie = $_COOKIE['doner_cookie'];

		$this->user = User::get_one(
			array(
				array(
					'field' => 'token',
					'operator' => '=',
					'value' => $auth_cookie,
				),
			)
		);

		if ( empty( $this->user ) ) {
			throw new AuthorizationException();
		}
	}
}
