var React = require( 'react' );
var DoneActions = require( '../../actions/DoneActions' );
var DoneEditLink = require( './DoneEditLink.react' );
var DoneEditFieldText = require( './DoneEditFieldText.react' );
var DoneEditFieldToggle = require( './DoneEditFieldToggle.react' );
var assign = require( 'object-assign' );

/**
 * Creates an array for display, where #tags in text are replaced by {DoneEditLink} and regular text is just strings
 *
 * @param {string} text to parse
 *
 * @returns {Array} of string and {DoneEditLink} components for #tags
 */
var parseTagsAndText = function ( text ) {
	var result = [];

	var tagClick = function(tag) {
		DoneActions.load( {tag: tag} );
	};

	var tagsMatcher = new RegExp( '#[^ ]+', 'gi' );
	var tagMatch;
	var lastIndex = 0;
	while ( tagMatch = tagsMatcher.exec( text ) ) {
		if ( tagsMatcher.lastIndex > 0 ) {
			result.push(
				text.substring( lastIndex, tagMatch.index )
			);
			lastIndex = tagsMatcher.lastIndex;
		}

		var link = '#/tag/' + tagMatch[0].substr(1);
		var key = tagMatch.index + text + tagMatch[0];
		result.push(
			<DoneEditLink key={key} link={link} text={tagMatch[0]} click={tagClick.bind(this, tagMatch[0].substr(1))} />
		);
	}

	if ( lastIndex < text.length ) {
		result.push(
			text.substring( lastIndex )
		);
	}

	return result;
};

/**
 * Editable Done display component
 */
var DoneEdit = React.createClass( {

	_onDestroyClick: function () {
		DoneActions.destroy( this.props.data.id );
	},

	_onStateClick: function () {
		var done = assign( {}, this.props.data, {status: this.props.data.status == 1 ? 0 : 1} );
		DoneActions.update( done );
	},

	getInitialState: function () {
		return {isEditing: false};
	},

	_onDoubleClick: function () {
		this.setState( {isEditing: true} );
	},

	/**
	 * Event handler for updating a dones text
	 *
	 * @param  {string} text
	 */
	_onSave: function ( text ) {
		var done = assign( {}, this.props.data, {text: text.trim()} );
		if ( done.text !== this.props.data.text ) {
			done.text = text;
			DoneActions.update( done );
		}
		this.setState( {isEditing: false} );
	},

	render: function () {
		var text = parseTagsAndText( this.props.data.text );

		if ( this.state.isEditing ) {
			text = (
				<DoneEditFieldText onSave={this._onSave} value={this.props.data.text}/>
			);
		}

		var trash;
		var toggleClick;
		var user = (
			<td className="col-xs-1">
				<span className="badge pull-right">
					{this.props.data.user}
				</span>
			</td>
		);
		var doubleClick;

		if (this.props.isOwner) {
			trash = (<span onClick={this._onDestroyClick} className="glyphicon glyphicon-trash pointer" aria-hidden="true"></span>);
			toggleClick = this._onStateClick;
			doubleClick = this._onDoubleClick;
			user = null;
		}

		return (
			<tr>
				<td className="col-xs-1">
					<DoneEditFieldToggle status={this.props.data.status} onClick={toggleClick}/>
				</td>
				<td className="col-xs-9" onDoubleClick={doubleClick}>
					{text}
				</td>
				{user}
				<td className="col-xs-1">
					{trash}
				</td>
			</tr>
		);
	}
} );

module.exports = DoneEdit;
