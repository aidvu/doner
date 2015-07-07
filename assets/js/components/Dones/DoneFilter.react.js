var React = require( 'react' );

var DoneFilterTypeahead = require( './DoneFilterTypeahead.react' );
var DoneFilterDatepicker = require( './DoneFilterDatepicker.react' );

var DoneActions = require( '../../actions/DoneActions' );

var DoneFilter = React.createClass( {
	_onChange: function () {
		parameters = {
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
				<DoneFilterTypeahead ref="typeahead" url='api/v1/users' name='filter-users' text='name' value='id' onChange={this._onChange} />
			</div>
		);
	}
} );

module.exports = DoneFilter;
