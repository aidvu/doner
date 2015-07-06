var React = require( 'react' );

var DoneFilterDatepicker = React.createClass( {
	getValue: function () {
		var dates = $('#' + this.props.name).datepicker('getDates');

		var values = [];
		for (var date in dates) {
			values.push(dates[date].getFullYear() + '-' + (dates[date].getMonth() + 1) + '-' + dates[date].getDate());
		}

		return values;
	},
	componentDidMount: function() {
		var onChange = this.props.onChange;

		$('#' + this.props.name).datepicker({
			multidate: true,
			todayHighlight: true
		}).on('changeDate', function(e) {
			onChange();
		});
	},
	/**
	 * @return {object}
	 */
	render: function () {
		return (
			<div id={this.props.name}>
			</div>
		);
	}
} );

module.exports = DoneFilterDatepicker;
