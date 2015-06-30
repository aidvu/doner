var React = require( 'react' );
var DoneActions = require( '../../actions/DoneActions' );
var DoneStore = require( '../../stores/DoneStore' );

var DoneForm = React.createClass( {
	_handleSubmit: function ( e ) {
		e.preventDefault();
		var status = React.findDOMNode( this.refs.status ).checked ? 1 : 0;
		var text = React.findDOMNode( this.refs.text ).value;

		DoneActions.create( status, text );
	},
	componentDidMount: function () {
		DoneStore.addChangeListener( this._onChange );
	},
	componentWillUnmount: function () {
		DoneStore.removeChangeListener( this._onChange );
	},
	_onChange: function () {
		React.findDOMNode( this.refs.text ).value = '';
		React.findDOMNode( this.refs.text ).focus();
	},
	handleChange: function () {
		this.setState( {checked: event.target.checked} );
	},
	getInitialState: function () {
		return {checked: true};
	},
	render: function () {
		return (
			<div className="container">
				<form className="done-form" onSubmit={this._handleSubmit}>
					<div className="row">
						<div className="col-xs-10">
							<div className="input-group">
								<span className="input-group-addon">
									<input ref="status" type="checkbox" onChange={this.handleChange} checked={this.state.checked} />
								</span>
								<input ref="text" type="text" className="form-control" />
							</div>
						</div>
						<div className="col-xs-1">
							<button type="submit" className="btn btn-primary">Save</button>
						</div>
					</div>
				</form>
			</div>
		);
	}
} );

module.exports = DoneForm;
