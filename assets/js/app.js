var React = require( 'react' );
var Router = require( 'react-router' );
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

var Doner = require( './components/DonerApp.react' );

var DoneListContainer = require( './components/Dones/DoneListContainer.react' );
var TagListContainer = require( './components/Tags/TagListContainer.react' );

document.cookie = "doner_cookie=auto-mata-2015";

var routes = (
	<Route handler={Doner}>
		<DefaultRoute handler={DoneListContainer}/>
		<Route path="tag/:name" handler={TagListContainer}/>
	</Route>
);

Router.run( routes, Router.HashLocation, function ( Handler ) {
	React.render(
		<Handler/>,
		document.getElementById( 'content' )
	);
} );
