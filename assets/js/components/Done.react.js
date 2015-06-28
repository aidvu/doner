var React = require( 'react' );

var Done = React.createClass( {
	handleDelete: function () {
		$.ajax( {
			url: "api/v1/dones/" + this.props.data.id,
			type: 'DELETE',
			success: function ( data ) {
			}.bind( this ),
			error: function ( xhr, status, err ) {
				console.error( this.props.url, status, err.toString() );
			}.bind( this )
		} );
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
				<td>
					{this.props.data.text}
				</td>
				<td className="col-xs-1">
					<span className="glyphicon glyphicon-edit" aria-hidden="true"></span>
					<span onClick={this.handleDelete} className="glyphicon glyphicon-trash" aria-hidden="true"></span>
				</td>
			</tr>
		);
	}
} );

module.exports = Done;
