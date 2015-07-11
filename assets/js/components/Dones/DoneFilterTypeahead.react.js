var React = require( 'react' );

/**
 * twitter-typeahead component
 *
 * @param {string} name used as component id, unique
 * @param {string} url endpoint for prefetching an array of objects
 * @param {string} display object key to display
 * @param {string} value object value to return
 * @param {callback} onChange
 */
var DoneFilterTypeahead = React.createClass( {
	/**
	 * @returns {Array} of selected user ids
	 */
	getValue: function () {
		var items = $( '#' + this.props.name ).val();
		if (items) {
			return items;
		}
		return [];
	},
	/**
	 * Invokes the onChange callback when a user is added or removed
	 */
	componentDidMount: function () {
		// constructs the suggestion engine
		var data = new Bloodhound( {
			datumTokenizer: Bloodhound.tokenizers.obj.whitespace( this.props.display ),
			queryTokenizer: Bloodhound.tokenizers.whitespace,
			prefetch: this.props.url
		} );
		data.initialize();

		var onChange = this.props.onChange;

		$( '#' + this.props.name ).on( 'itemAdded itemRemoved', function ( event ) {
			onChange();
		} ).tagsinput( {
			freeInput: false,
			itemValue: this.props.value,
			itemText: this.props.display,
			typeaheadjs: [
				{
					hint: false,
					highlight: true,
					minLength: 1
				},
				{
					name: this.props.name,
					display: this.props.display,
					source: data
				}
			]
		} );
	},
	/**
	 * @return {object}
	 */
	render: function () {
		return (
			<div className="typeahead">
				<label>Filter by users</label>
				<select type="text" id={this.props.name} multiple />
			</div>
		);
	}
} );

module.exports = DoneFilterTypeahead;
