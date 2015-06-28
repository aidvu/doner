var React = require( 'react' );

var Header = require( './Header.react' );
var DoneForm = require( './DoneForm.react' );
var DoneList = require( './DoneList.react' );

var Doner = React.createClass( {
	render: function () {
		var url = "api/v1/dones";

		return (
			<div>
				<Header />
				<div className="container">
					<DoneForm url={url} />
					<DoneList url={url} pollInterval={1200} />
				</div>
			</div>
		);
	}
} );

module.exports = Doner;
