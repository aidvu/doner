<?php

require_once 'vendor/autoload.php';
require_once 'config.php';

$auth_class = AUTH_CLASS;
$api = new \Doner\API( new $auth_class() );

$api->add_route( 1, \Doner\API::HTTP_GET, 'dones', function () use ( $api ) {
	$api->response()->set_body( \Doner\Model\Done::get() );
} );

$api->add_route( 1, \Doner\API::HTTP_DELETE, 'dones/{id}', function () use ( $api ) {
	$variables = $api->get_variables();
	\Doner\Model\Done::delete( $variables['id'] );

	$api->response()->set_status( 204 );
} );

$api->add_route( 1, \Doner\API::HTTP_POST, 'dones', function () use ( $api ) {
	$variables = $api->get_variables();

	$variables['user_id'] = $api->get_user()['id'];
	$variables['created_at'] = gmdate( 'Y-m-d H:i:s' );

	\Doner\Model\Done::save( $variables );

	$api->response()->set_status( 200 );
} );

$api->run();
