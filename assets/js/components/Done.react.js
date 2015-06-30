var React = require( 'react' );
var DoneActions = require( '../actions/DoneActions' );

var Done = React.createClass( {
	_onDestroyClick: function () {
		DoneActions.destroy( this.props.data.id );
	},
	_onUpdateClick: function () {
		var done = this.props.data;
		done.status = done.status == 1 ? 0 : 1;
		DoneActions.update( done );
	},
	render: function () {
		var status;

		if ( this.props.data.status == 1 ) {
			status = 'glyphicon-ok';
		} else {
			status = 'glyphicon-unchecked';
		}
		var classes = 'glyphicon ' + status;

		return (
			<tr>
				<td className="col-xs-1">
					<span onClick={this._onUpdateClick} className={classes} aria-hidden="true"></span>
				</td>
				<td className="col-xs-10">
					{this.props.data.text}
					<span className="badge pull-right">{this.props.data.user_id}</span>
				</td>
				<td className="col-xs-1">
					<span onClick={this._onDestroyClick} className="glyphicon glyphicon-trash" aria-hidden="true"></span>
				</td>
			</tr>
		);
	}
} );

module.exports = Done;
