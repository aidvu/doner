var React = require( 'react' );
var DoneEditFieldToggle = require( './DoneEditFieldToggle.react' );

var DoneEditDisabled = React.createClass( {
	render: function () {
		return (
			<tr>
				<td className="col-xs-1">
					<DoneEditFieldToggle status={this.props.data.status}/>
				</td>
				<td className="col-xs-9">
					{this.props.data.text}
				</td>
				<td className="col-xs-1">
					<span className="badge pull-right">
						{this.props.data.user}
					</span>
				</td>
				<td className="col-xs-1">
				</td>
			</tr>
		);
	}
} );

module.exports = DoneEditDisabled;
