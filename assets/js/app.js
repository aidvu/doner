'use strict';

document.cookie = "doner_cookie=auto-mata-2015";

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
		if (this.props.data.status == 1) {
			status = (<span className="glyphicon glyphicon-ok" aria-hidden="true"></span>);
		} else {
			status = (<span className="glyphicon glyphicon-unchecked" aria-hidden="true"></span>);
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

var DoneList = React.createClass( {
	render: function () {
		var doneList = this.props.data.map( function ( done ) {
			return (
				<Done key={done.id} data={done}/>
			);
		} );

		return (
			<table className="table table-hover">
				<thead>
					<th colSpan="3">
						{this.props.date}
					</th>
				</thead>
				<tbody>
					{doneList}
				</tbody>
			</table>
		);
	}
} );

var DoneListContainer = React.createClass( {
	loadDones: function() {
		$.ajax( {
			url: this.props.url,
			dataType: 'json',
			type: 'GET',
			success: function ( data ) {
				var data_objects = {};
				for ( var key in data ) {
					var date_key = data[key]['created_at'].substr( 0, 10 );
					if ( ! data_objects[date_key] ) {
						data_objects[date_key] = [];
					}
					data_objects[date_key].push( data[key] );
				}

				var organized_data = [];
				for ( key in data_objects ) {
					var separate_object = {};
					separate_object[key] = data_objects[key];
					organized_data.push( separate_object );
				}

				this.setState( {data: organized_data} );
			}.bind( this ),
			error: function ( xhr, status, err ) {
				console.error( this.props.url, status, err.toString() );
			}.bind( this )
		} );
	},
	componentDidMount: function () {
		this.loadDones();
		setInterval(this.loadDones, this.props.pollInterval);
	},
	getInitialState: function () {
		return {data: []};
	},
	render: function () {
		var doneList = this.state.data.map( function ( dones ) {
			var date = Object.keys( dones )[0];
			return (
				<DoneList key={date} date={date} data={dones[date]} />
			);
		} );

		return (
			<div>
				{doneList}
			</div>
		);
	}
} );

var DoneListForm = React.createClass({
	handleSubmit: function(e) {
		e.preventDefault();
		var status = React.findDOMNode(this.refs.status).checked;
		var text = React.findDOMNode(this.refs.text).value.trim();

		if (!text) {
			return;
		}

		React.findDOMNode(this.refs.text).value = '';

		var data = {
			"status": status,
			"text": text
		};

		$.ajax({
			url: this.props.url,
			dataType: 'json',
			contentType: "application/json",
			type: 'POST',
			data: JSON.stringify(data),
			success: function(data) {
				React.findDOMNode(this.refs.text).focus();
			}.bind(this),
			error: function(xhr, status, err) {
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
		return;
	},
	render: function() {
		return (
			<div className="container">
				<form className="doneListForm" onSubmit={this.handleSubmit}>
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
});

var DonerHeader = React.createClass( {
	render: function () {
		return (
			<nav className="navbar navbar-default navbar-fixed-top">
				<div className="container">
					<a className="navbar-brand" href="#">doner</a>
					<a className="navbar-brand" href="#">
						<img alt="doner" style={{height: 20 + "px"}} src="assets/images/doner.png"/>
					</a>

					<p className="navbar-text">because you have no idea what you did yesterday</p>
				</div>
			</nav>
		);
	}
} );

var DonerContent = React.createClass( {
	render: function () {
		var url = "api/v1/dones";
		return (
			<div className="container">
				<DoneListForm url={url} />
				<DoneListContainer url={url} pollInterval={1200} />
			</div>
		);
	}
} );

var Doner = React.createClass( {
	render: function () {
		return (
			<div>
				<DonerHeader />
				<DonerContent />
			</div>
		);
	}
} );

React.render( <Doner />, document.getElementById( 'content' ) );
