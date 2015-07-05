var React = require( 'react' );

var DoneForm = require( './DoneForm.react' );
var DoneList = require( './DoneList.react' );

var DoneListContainer = React.createClass( {
	render: function () {
		return (
			<div>
				<DoneForm />
				<DoneList />
			</div>
		);
	}
} );

module.exports = DoneListContainer;
