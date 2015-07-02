<?php

require_once 'vendor/autoload.php';
require_once 'config.php';

$auth_class = AUTH_CLASS;
$api = new \Doner\API( new $auth_class() );

$api->add_route( 1, \Doner\API::HTTP_GET, 'me', function () use ( $api ) {
	$api->response->set_body( $api->get_user() );
} );

$api->add_route( 1, \Doner\API::HTTP_GET, 'dones', function () use ( $api ) {
	$api->response->set_body( \Doner\Model\Done::get() );
} );

$api->add_route( 1, \Doner\API::HTTP_DELETE, 'dones/{id}', function () use ( $api ) {
	$variables = $api->variables;

	\Doner\Model\Done::is_owner( $variables['id'], $api->get_user()->id );

	\Doner\Model\Done::delete( $variables['id'] );

	$api->response->set_status( 204 );
} );

$api->add_route( 1, \Doner\API::HTTP_POST, 'dones', function () use ( $api ) {
	$variables = $api->variables;
	unset( $variables['id'] );
	$variables['user_id'] = $api->get_user()->id;

	$done = new \Doner\Model\Done();
	$done->populate_model( $variables );
	$done->save();

	$api->response->set_body( $done );
} );

$api->add_route( 1, \Doner\API::HTTP_PUT, 'dones/{id}', function () use ( $api ) {
	$variables = $api->variables;

	\Doner\Model\Done::is_owner( $variables['id'], $api->get_user()->id );

	$done = new \Doner\Model\Done();
	$done->populate_model( $variables );
	$done->save();

	$api->response->set_body( $done );
} );

$api->run();
