var React = require( 'react' );

var DoneForm = require( './DoneForm.react' );
var DoneList = require( './DoneList.react' );
var DoneFilter = require( './DoneFilter.react' );
var DoneActions = require( '../../actions/DoneActions' );

/**
 * Done List View which contains a new done creation component, filtering component, and the done display component
 */
var DoneListContainer = React.createClass( {
	componentDidMount: function () {
		DoneActions.load( {} );
	},
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
