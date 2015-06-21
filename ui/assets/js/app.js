'use strict';

var Done = React.createClass( {
	render: function () {
		return (
			<tr>
				<td className="col-xs-1">
					<span className="glyphicon glyphicon-unchecked" aria-hidden="true"></span>
					<span className="glyphicon glyphicon-ok" aria-hidden="true"></span>
				</td>
				<td>
					{this.props.data.text}
				</td>
				<td className="col-xs-1">
					<span className="glyphicon glyphicon-edit" aria-hidden="true"></span>
					<span className="glyphicon glyphicon-trash" aria-hidden="true"></span>
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
	componentDidMount: function () {
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
		return (
			<div className="container">
				<DoneListContainer url="http://doner/v1/dones"/>
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
