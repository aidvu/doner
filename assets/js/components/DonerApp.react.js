var React = require( 'react' );

var Header = require( './Header.react' );
var DoneListContainer = require( './Dones/DoneListContainer.react' );
var LoginActions = require( '../actions/LoginActions' );
var DoneActions = require( '../actions/DoneActions' );

/**
 * This component is the top level component of the app
 * It runs all the actions for initial data load, and then the changes get picked in the app when stores emit events
 */
var Doner = React.createClass( {
	componentDidMount: function () {
		LoginActions.loadUser();
		DoneActions.load( {} );
	},
	render: function () {
		return (
			<div>
				<Header />
				<div className="container">
					<DoneListContainer />
				</div>
			</div>
		);
	}
} );

module.exports = Doner;
