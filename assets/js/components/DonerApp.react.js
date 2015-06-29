var React = require( 'react' );

var Header = require( './Header.react' );
var DoneForm = require( './DoneForm.react' );
var DoneList = require( './DoneList.react' );

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
