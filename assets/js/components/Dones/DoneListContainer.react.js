var React = require( 'react' );

var DoneForm = require( './DoneForm.react' );
var DoneList = require( './DoneList.react' );
var DoneFilter = require( './DoneFilter.react' );

var DoneListContainer = React.createClass( {
	render: function () {
		return (
			<div className="row">
				<DoneForm />
				<div className="col-sm-4 col-xs-12 pull-right">
					<DoneFilter />
				</div>
				<div className="col-sm-8 col-xs-12 pull-left">
					<DoneList />
				</div>
			</div>
		);
	}
} );

module.exports = DoneListContainer;
