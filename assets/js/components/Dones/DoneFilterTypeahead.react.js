var React = require( 'react' );

var DoneFilterTypeahead = React.createClass( {
	componentDidMount: function() {
		// constructs the suggestion engine
		var data = new Bloodhound({
			datumTokenizer: Bloodhound.tokenizers.obj.whitespace(this.props.text),
			queryTokenizer: Bloodhound.tokenizers.whitespace,
			prefetch: this.props.url
		});
		data.initialize();

		$('#' + this.props.name + '-input').on('itemAdded itemRemoved', function(event) {
			console.log($(event.target).tagsinput('items'));
			console.log($(event.target).val());
		}).tagsinput({
			freeInput: false,
			itemValue: this.props.value,
			itemText: this.props.text,
			typeaheadjs:
				[
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
		});
	},
	/**
	 * @return {object}
	 */
	render: function () {
		var id = this.props.name + '-input';

		return (
			<div className="typeahead">
				<label>Filter by users</label>
				<select type="text" id={id} multiple data-role="tagsinput" />
			</div>
		);
	}
} );

module.exports = DoneFilterTypeahead;
