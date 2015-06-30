var React = require( 'react' );

var Header = require( './Header.react' );
var DoneForm = require( './Dones/DoneForm.react' );
var DoneList = require( './Dones/DoneList.react' );

var Doner = React.createClass( {
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
