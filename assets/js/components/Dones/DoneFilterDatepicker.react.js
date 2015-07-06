var React = require( 'react' );

var DoneFilterDatepicker = React.createClass( {
	componentDidMount: function() {
		$('#' + this.props.name).datepicker({
			multidate: true,
			todayHighlight: true
		}).on('changeDate', function(e) {
			console.log(e.dates);
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
