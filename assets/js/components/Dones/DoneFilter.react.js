var React = require( 'react' );

var DoneFilter = React.createClass( {
	getInitialState: function () {
		return {
		};
	},
	componentDidMount: function() {
		$('#datepicker').datepicker({
			multidate: true,
			todayHighlight: true
		}).on('changeDate', function(e) {
			console.log(e.dates);
		});

		$('#users-input').on('itemAdded itemRemoved', function(event) {
			console.log($("#users-input").tagsinput('items'));
			console.log($("#users-input").val());
		});
	},
	/**
	 * @return {object}
	 */
	render: function () {
		return (
			<div className="filter">
				<div id="datepicker">
				</div>
				<div id="users">
					<select placeholder="Filter dones by user" id="users-input" multiple data-role="tagsinput" />
				</div>
			</div>
		);
	}
} );

module.exports = DoneFilter;
