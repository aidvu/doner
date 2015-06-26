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

	$done = new \Doner\Model\Done();

	$done->status = $variables['status'];
	$done->text = $variables['text'];
	$done->user_id = $api->get_user()->id;
	$done->created_at = gmdate( 'Y-m-d H:i:s' );

	$done->save();

	$api->response()->set_body( $done );
	$api->response()->set_status( 200 );
} );

$api->add_route( 1, \Doner\API::HTTP_PUT, 'dones/{id}', function () use ( $api ) {
	$variables = $api->get_variables();

	$done = new \Doner\Model\Done();

	$done->id = $variables['id'];
	$done->status = $variables['status'];
	$done->text = $variables['text'];

	$done->save();

	$api->response()->set_body( $done );
	$api->response()->set_status( 200 );
} );

$api->run();
