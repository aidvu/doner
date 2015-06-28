var React = require( 'react' );

var DoneForm = React.createClass( {
	handleSubmit: function ( e ) {
		e.preventDefault();
		var status = React.findDOMNode( this.refs.status ).checked;
		var text = React.findDOMNode( this.refs.text ).value.trim();

		if ( ! text ) {
			return;
		}

		React.findDOMNode( this.refs.text ).value = '';

		var data = {
			"status": status ? 1 : 0,
			"text": text
		};

		$.ajax( {
			url: this.props.url,
			dataType: 'json',
			contentType: "application/json",
			type: 'POST',
			data: JSON.stringify( data ),
			success: function ( data ) {
				React.findDOMNode( this.refs.text ).focus();
			}.bind( this ),
			error: function ( xhr, status, err ) {
				console.error( this.props.url, status, err.toString() );
			}.bind( this )
		} );
		return;
	},
	render: function () {
		return (
			<div className="container">
				<form className="doneForm" onSubmit={this.handleSubmit}>
					<div className="row">
						<div className="col-xs-10">
							<div className="input-group">
								<span className="input-group-addon">
									<input ref="status" type="checkbox" />
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
