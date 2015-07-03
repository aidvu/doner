var React = require( 'react' );

var Header = require( './Header.react' );
var DoneForm = require( './Dones/DoneForm.react' );
var DoneList = require( './Dones/DoneList.react' );
var LoginActions = require( '../actions/LoginActions' );
var DoneActions = require( '../actions/DoneActions' );

var Doner = React.createClass( {
	componentDidMount: function () {
		LoginActions.loadUser();
		DoneActions.load();
	},
	render: function () {
		return (
			<div>
				<Header />
				<div className="container">
					<DoneForm />
					<DoneList />
				</div>
			</div>
		);
	}
} );

module.exports = Doner;
