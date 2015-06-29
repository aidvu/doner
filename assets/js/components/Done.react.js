var React = require( 'react' );
var DoneActions = require( '../actions/DoneActions' );

var Done = React.createClass( {
	_onDestroyClick: function () {
		DoneActions.destroy( this.props.data.id );
	},
	render: function () {
		var status;
		if ( this.props.data.status == 1 ) {
			status = (
				<span className="glyphicon glyphicon-ok" aria-hidden="true"></span>
			);
		} else {
			status = (
				<span className="glyphicon glyphicon-unchecked" aria-hidden="true"></span>
			);
		}
		return (
			<tr>
				<td className="col-xs-1">
					{status}
				</td>
				<td className="col-xs-10">
					{this.props.data.text}
				</td>
				<td className="col-xs-1">
					<span className="glyphicon glyphicon-edit" aria-hidden="true"></span>
					<span onClick={this._onDestroyClick} className="glyphicon glyphicon-trash" aria-hidden="true"></span>
				</td>
			</tr>
		);
	}
} );

module.exports = Done;
