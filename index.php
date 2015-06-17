<?php

require_once 'vendor/autoload.php';
require_once 'config.php';

$api = new \Doner\API();

$api->add_route( 1, \Doner\API::HTTP_GET, 'dones', function () use ( $api ) {
	echo json_encode(\Doner\Model\Done::get());
} );

$api->run();
