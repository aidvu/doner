<?php

namespace Doner;

use Doner\Exception\BaseException;
use Doner\Exception\ContentTypeException;
use Doner\Exception\JSONFormatException;
use Doner\Exception\NotFoundException;

class API {

	const HTTP_GET = 'GET';
	const HTTP_POST = 'POST';
	const HTTP_PUT = 'PUT';
	const HTTP_DELETE = 'DELETE';

	/**
	 * @var string $path path requested
	 */
	private $path;

	/**
	 * @var array $route current request matched route
	 */
	private $route;

	/**
	 * @var string $version requested api version
	 */
	private $version;

	/**
	 * @var string $http_method HTTP Request Method
	 */
	private $http_method;

	/**
	 * @var array $routes Holds all available routes
	 */
	private $routes = array();

	/**
	 * @var array $variables Parsed variables from request
	 */
	private $variables = array();

	/**
	 * @var array $allowed_content_types allowed HTTP content type header
	 */
	private $allowed_content_types = array(
		'application/json',
	);

	public function __construct() {
	}

	/**
	 * Add route to the API
	 *
	 * @param int $version route version
	 * @param string $http_method http method
	 * @param string $path route path
	 * @param callable $function anonymous function to be run
	 */
	public function add_route( $version, $http_method, $path, $function ) {
		$this->routes[ 'v' . $version ][ $http_method ][] = array(
			'path' => $path,
			'function' => $function,
		);
	}

	/**
	 * Run the API
	 */
	public function run() {
		try {
			header( 'Content-Type: application/json' );

			$this->check_content_type();
			$this->parse_route();
			$this->parse_variables();

			$this->route['function']();
		} catch ( \Exception $e ) {
			// TODO: Add generic case for non-Doner exceptions
			if ( $e instanceof BaseException ) {
				$e->return_error();
			}
		}
	}

	/**
	 * Checks if the request Content-Type is supported by the API
	 *
	 * @throws ContentTypeException
	 */
	private function check_content_type() {
		if ( ! empty( $_SERVER['CONTENT_TYPE'] ) && ! in_array( $_SERVER['CONTENT_TYPE'], $this->allowed_content_types, true ) ) {
			throw new ContentTypeException();
		}
	}

	/**
	 * Parses the route in the current request and populates class variables if the route matches
	 *
	 * @throws NotFoundException
	 */
	private function parse_route() {

		$this->http_method = $_SERVER['REQUEST_METHOD'];

		// Cut any $_GET parameters when validating route
		$request_uri = $_SERVER['REQUEST_URI'];

		if ( $this->http_method == $this::HTTP_GET ) {
			$cut = strpos( $request_uri, '?' );
			if ( $cut !== false ) {
				$request_uri = substr( $request_uri, 0, $cut );
			}
		}

		$request_uri = explode( '/', trim( $request_uri, '/' ) );

		if ( count( $request_uri ) < 2 ) {
			throw new NotFoundException();
		}

		$this->version = $request_uri[0];
		unset( $request_uri[0] );

		$this->path = implode( '/', $request_uri );

		if ( ! empty( $this->routes[ $this->version ] ) ) {
			$path_explode = explode( '/', $this->path );
			if ( ! empty( $this->routes[ $this->version ][ $this->http_method ] ) ) {
				foreach ( $this->routes[ $this->version ][ $this->http_method ] as $route ) {
					$route_explode = explode( '/', $route['path'] );
					if ( count( $route_explode ) !== count( $path_explode ) ) {
						continue;
					}
					foreach ( $route_explode as $key => $value ) {
						if ( strpos( $route_explode[ $key ], '{' ) !== false ) {
							continue;
						} else if ( $route_explode[ $key ] !== $path_explode[ $key ] ) {
							break;
						}

						$this->route = $route;
					}

					if ( ! empty( $this->route ) ) {
						break;
					}
				}
			}
		}

		if ( empty( $this->route ) ) {
			throw new NotFoundException();
		}
	}

	/**
	 * Parses request variables, both route and submitted, and sets $this->variables
	 *
	 * @throws JSONFormatException
	 */
	private function parse_variables() {
		foreach ( $_GET as $key => $value ) {
			$this->variables[ $key ] = $value;
		}

		if ( ! empty( $_SERVER['CONTENT_TYPE'] ) && $_SERVER['CONTENT_TYPE'] === 'application/json' ) {
			if ( $raw_array = json_decode( file_get_contents( "php://input" ), true ) ) {
				$this->variables = array_merge( $this->variables, $raw_array );
			} else {
				throw new JSONFormatException();
			}
		}

		$route_explode = explode( '/', $this->route['path'] );
		$path_explode  = explode( '/', $this->path );

		foreach ( $route_explode as $key => $value ) {
			if ( strpos( $value, '{' ) !== false ) {
				$this->variables[ substr( $value, 1, strlen( $value ) - 2 ) ] = $path_explode[ $key ];
			}
		}
	}

	/**
	 * @return array variables from current request
	 */
	public function get_variables() {
		return $this->variables;
	}
}
