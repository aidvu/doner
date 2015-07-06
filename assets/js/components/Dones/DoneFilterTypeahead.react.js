var React = require( 'react' );

var DoneFilterTypeahead = React.createClass( {
	getValue: function () {
		return $( '#' + this.props.name ).val();
	},
	componentDidMount: function () {
		// constructs the suggestion engine
		var data = new Bloodhound( {
			datumTokenizer: Bloodhound.tokenizers.obj.whitespace( this.props.text ),
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
			itemText: this.props.text,
			typeaheadjs: [
				{
					hint: false,
					highlight: true,
					minLength: 1
				},
				{
					name: this.props.name,
					display: this.props.text,
					source: data
				}
			]
		} );
	},
	/**
	 * @return {object}
	 */
	render: function () {
		var id = this.props.name;

		return (
			<div className="typeahead">
				<label>Filter by users</label>
				<select type="text" id={id} multiple />
			</div>
		);
	}
} );

module.exports = DoneFilterTypeahead;
