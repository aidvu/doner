var React = require( 'react' );
var DoneActions = require( '../../actions/DoneActions' );
var DoneEditText = require( './DoneEditText.react' );
var DoneEditToggle = require( './DoneEditToggle.react' );
var assign = require( 'object-assign' );

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
	 * Event handler called within DoneEdit.
	 * Defining this here allows DoneEdit to be used in multiple places
	 * in different ways.
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
		var text = this.props.data.text;
		if ( this.state.isEditing ) {
			text = (
				<DoneEditText onSave={this._onSave} value={this.props.data.text} />
			);
		}

		return (
			<tr>
				<td className="col-xs-1">
					<DoneEditToggle status={this.props.data.status} onClick={this._onStateClick} />
				</td>
				<td className="col-xs-10" onDoubleClick={this._onDoubleClick}>
					{text}
				</td>
				<td className="col-xs-1">
					<span onClick={this._onDestroyClick} className="glyphicon glyphicon-trash pointer" aria-hidden="true"></span>
				</td>
			</tr>
		);
	}
} );

module.exports = DoneEdit;
