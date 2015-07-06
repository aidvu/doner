var React = require( 'react' );

var DoneFilterTypeahead = require( './DoneFilterTypeahead.react' );
var DoneFilterDatepicker = require( './DoneFilterDatepicker.react' );

var DoneFilter = React.createClass( {
	/**
	 * @return {object}
	 */
	render: function () {
		return (
			<div className="filter">
				<DoneFilterDatepicker name='filter-datepicker' />
				<DoneFilterTypeahead url='/api/v1/users' name='filter-users' text='name' value='id' />
			</div>
		);
	}
} );

module.exports = DoneFilter;
