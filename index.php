<?php

require_once 'vendor/autoload.php';

$api = new \Doner\API();

$api->add_route( 1, \Doner\API::HTTP_GET, 'dones', function () use ( $api ) {
	var_dump( $api->get_variables() );
} );

$api->run();
