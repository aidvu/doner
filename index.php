<?php

require_once 'vendor/autoload.php';
require_once 'config.php';

$api = new \Doner\API();

$api->add_route( 1, \Doner\API::HTTP_GET, 'dones', function () use ( $api ) {
	$api->response()->set_body( \Doner\Model\Done::get() );
} );

$api->add_route( 1, \Doner\API::HTTP_DELETE, 'dones/{id}', function () use ( $api ) {
	$variables = $api->get_variables();
	\Doner\Model\Done::delete( $variables['id'] );
} );

$api->run();
