var React = require( 'react' );

var DoneFilterTypeahead = require( './DoneFilterTypeahead.react' );
var DoneFilterDatepicker = require( './DoneFilterDatepicker.react' );

var DoneActions = require( '../../actions/DoneActions' );

/**
 * Filters container component
 */
var DoneFilter = React.createClass( {
	/**
	 * Collects parameters from filter components and invokes the load action
	 * @private
	 */
	_onChange: function () {
		var parameters = {
			created_at: this.refs.datepicker.getValue(),
			user_id: this.refs.typeahead.getValue()
		};
		DoneActions.load( parameters );
	},
	/**
	 * @return {object}
	 */
	render: function () {
		return (
			<div className="filter">
				<DoneFilterDatepicker ref="datepicker" name='filter-datepicker' onChange={this._onChange} />
				<DoneFilterTypeahead ref="typeahead" url='api/v1/users' name='filter-users' display='name' value='id' onChange={this._onChange} />
			</div>
		);
	}
} );

module.exports = DoneFilter;
