var React = require( 'react' );
var DoneActions = require( '../../actions/DoneActions' );
var DoneEdit = require( './DoneEdit.react' );
var assign = require( 'object-assign' );

var Done = React.createClass( {

	_onDestroyClick: function () {
		DoneActions.destroy( this.props.data.id );
	},

	_onStateClick: function () {
		var done = this.props.data;
		done.status = done.status == 1 ? 0 : 1;
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
		var status;

		if ( this.props.data.status == 1 ) {
			status = 'glyphicon-ok';
		} else {
			status = 'glyphicon-unchecked';
		}
		var classes = 'glyphicon ' + status;

		var text;
		if ( this.state.isEditing ) {
			text = (
				<DoneEdit onSave={this._onSave} value={this.props.data.text} />
			);
		} else {
			text = this.props.data.text;
		}

		return (
			<tr>
				<td className="col-xs-1">
					<span onClick={this._onStateClick} className={classes} aria-hidden="true"></span>
				</td>
				<td className="col-xs-9" onDoubleClick={this._onDoubleClick}>
					{text}
				</td>
				<td className="col-xs-1">
					<span className="badge pull-right">
						{this.props.data.user}
					</span>
				</td>
				<td className="col-xs-1">
					<span onClick={this._onDestroyClick} className="glyphicon glyphicon-trash" aria-hidden="true"></span>
				</td>
			</tr>
		);
	}
} );

module.exports = Done;
