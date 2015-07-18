<?php

require_once 'vendor/autoload.php';
require_once 'config.php';

$auth_class = AUTH_CLASS;
$api = new \Doner\API( new $auth_class() );

$api->add_route( 1, \Doner\API::HTTP_GET, 'me', function () use ( $api ) {
	$api->response->set_body( $api->get_user() );
} );

$api->add_route( 1, \Doner\API::HTTP_GET, 'users', function () use ( $api ) {
	$api->response->set_body( \Doner\Model\User::get( array( 'id', 'name' ) ) );
} );

$api->add_route( 1, \Doner\API::HTTP_GET, 'dones', function () use ( $api ) {
	$variables = $api->variables;

	$where = array();

	if ( ! empty( $variables['user_id'] ) ) {
		$where[] = array(
			'field' => 'user_id',
			'operator' => 'IN',
			'value' => $variables['user_id'],
		);
	}

	if ( ! empty( $variables['created_at'] ) ) {
		$where[] = array(
			'field' => 'DATE(dones.created_at)',
			'operator' => 'IN',
			'value' => $variables['created_at'],
		);
	}

	$api->response->set_body( \Doner\Model\Done::get( null, $where ) );
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

$api->add_route( 1, \Doner\API::HTTP_GET, 'tags/{name}/dones', function () use ( $api ) {
	$variables = $api->variables;

	$where = array(
		array(
			'field' => 'name',
			'operator' => '=',
			'value' => $variables['name'],
		)
	);
	$tag = \Doner\Model\Tag::get_one( null, $where );

	if ( $tag === null ) {
		$api->response->set_body( array() );

		return;
	}

	$results = \Doner\Model\Done::get(
		null,
		array(
			array(
				'field' => 'tags_id',
				'operator' => '=',
				'value' => $tag->id,
			)
		),
		array(
			array(
				'fields' => array(
					'dones_tags.tags_id AS tags_id'
				),
				'join' => 'dones_tags ON dones.id = dones_tags.dones_id'
			),
		)
	);

	$api->response->set_body( $results );
} );

$api->run();
