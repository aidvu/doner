var React = require( 'react' );
var Router = require( 'react-router' );
var RouteHandler = Router.RouteHandler;

var Header = require( './Header.react' );
var LoginActions = require( '../actions/LoginActions' );

/**
 * This component is the top level component of the app
 * It runs all the actions for initial data load, and then the changes get picked in the app when stores emit events
 */
var Doner = React.createClass( {
	componentDidMount: function () {
		LoginActions.loadUser();
	},
	render: function () {
		return (
			<div>
				<Header />

				<div className="container">
					<RouteHandler />
				</div>
			</div>
		);
	}
} );

module.exports = Doner;
