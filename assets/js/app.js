var React = require( 'react' );

var Doner = require( './components/DonerApp.react' );

document.cookie = "doner_cookie=auto-mata-2015";

React.render(
	<Doner />,
	document.getElementById( 'content' )
);
