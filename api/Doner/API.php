<?php

namespace Doner;

use Doner\Authorization\AuthorizationInterface;
use Doner\Exception\BaseException;
use Doner\Exception\ContentTypeException;
use Doner\Exception\InternalErrorException;
use Doner\Exception\JSONFormatException;
use Doner\Exception\NotFoundException;
use Doner\Http\Response;

/**
 * Class API
 *
 * REST API class for registering, parsing and firing routes
 *
 * @package Doner
 */
class API {

	/**
	 * HTTP Method constants
	 */
	const HTTP_GET = 'GET';
	const HTTP_POST = 'POST';
	const HTTP_PUT = 'PUT';
	const HTTP_DELETE = 'DELETE';
	const HTTP_OPTIONS = 'OPTIONS';

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
	public $variables = array();

	/**
	 * @var Response $response API Response Object
	 */
	public $response;

	/**
	 * @var AuthorizationInterface $auth_class Used for request authorization
	 */
	private $auth_class;

	/**
	 * @var array $allowed_content_types allowed HTTP content type header
	 */
	private $allowed_content_types = array(
		'application/json',
	);

	/**
	 * @param AuthorizationInterface $auth_class Interface for authorizing users
	 */
	public function __construct($auth_class) {
		$this->auth_class = $auth_class;
		$this->response = new Response();
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
	 * Run the API request
	 */
	public function run() {
		try {
			$this->auth_class->authorize();

			$this->check_content_type();
			$this->parse_route();
			$this->parse_variables();

			$this->route['function']();
		} catch ( \Exception $e ) {
			if ( ! ( $e instanceof BaseException ) ) {
				$e = new InternalErrorException( $e->getMessage() );
			}

			$this->response->set_body( $e->get_message() );
			$this->response->set_status( $e->getCode() );
		}

		$this->response->output();
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

		if ( 0 !== strpos( $request_uri, API_PATH ) ) {
			throw new NotFoundException();
		}

		$request_uri = substr( $request_uri, strlen( API_PATH ) );

		$request_uri = explode( '/', trim( $request_uri, '/' ) );

		if ( count( $request_uri ) < 2 ) {
			throw new NotFoundException();
		}

		$this->version = $request_uri[0];
		unset( $request_uri[0] );

		$this->path = implode( '/', $request_uri );

		if ( empty( $this->routes[ $this->version ] ) || empty( $this->routes[ $this->version ][ $this->http_method ] ) ) {
			throw new NotFoundException();
		}

		// Search for given route in registered routes
		$path_explode = explode( '/', $this->path );
		foreach ( $this->routes[ $this->version ][ $this->http_method ] as $route ) {
			$route_explode = explode( '/', $route['path'] );
			if ( count( $route_explode ) !== count( $path_explode ) ) {
				continue;
			}
			foreach ( $route_explode as $key => $value ) {
				if ( $this->is_route_variable( $value ) ) {
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
			if ( ( $raw_array = json_decode( file_get_contents( "php://input" ), true ) ) === null ) {
				throw new JSONFormatException();
			}
			$this->variables = array_merge( $this->variables, $raw_array );
		}

		$route_explode = explode( '/', $this->route['path'] );
		$path_explode  = explode( '/', $this->path );

		foreach ( $route_explode as $key => $value ) {
			if ( $this->is_route_variable( $value ) ) {
				$this->variables[ substr( $value, 1, strlen( $value ) - 2 ) ] = $path_explode[ $key ];
			}
		}
	}

	/**
	 * Check if given route part is a variable
	 *
	 * @param string $value part of the path
	 *
	 * @return bool
	 */
	private function is_route_variable($value) {
		if ( strpos( $value, '{' ) === 0 && strpos( $value, '}' ) === (strlen($value) - 1)) {
			return true;
		}

		return false;
	}

	/**
	 * @return object Currently logged user
	 */
	public function get_user() {
		return $this->auth_class->get_user();
	}
}
