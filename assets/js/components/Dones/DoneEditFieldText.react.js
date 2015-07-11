var React = require( 'react' );

var ENTER_KEY_CODE = 13;

/**
 * Editable in-row Done text input component
 *
 * @param {string} value current done text value
 * @param {callback} onSave
 */
var DoneEditFieldText = React.createClass( {
	getInitialState: function () {
		return {
			value: this.props.value || ''
		};
	},

	/**
	 * @return {object}
	 */
	render: function () {
		return (
			<input
				className="form-control done-edit"
				onBlur={this._save}
				onChange={this._onChange}
				onKeyDown={this._onKeyDown}
				value={this.state.value}
				autoFocus={true}
			/>
		);
	},

	/**
	 * Invokes the callback passed in as onSave
	 */
	_save: function () {
		this.props.onSave( this.state.value );
		this.setState( {
			value: ''
		} );
	},

	/**
	 * @param {object} event
	 */
	_onChange: function ( event ) {
		this.setState( {
			value: event.target.value
		} );
	},

	/**
	 * @param {object} event
	 */
	_onKeyDown: function ( event ) {
		if ( event.keyCode === ENTER_KEY_CODE ) {
			this._save();
		}
	}
} );

module.exports = DoneEditFieldText;
