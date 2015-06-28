var React = require( 'react' );

var Done = require( './Done.react' );

var DoneListContainer = React.createClass( {
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

var DoneList = React.createClass( {
	loadDones: function () {
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
				//console.error( this.props.url, status, err.toString() );
			}.bind( this )
		} );
	},
	componentDidMount: function () {
		this.loadDones();
		setInterval( this.loadDones, this.props.pollInterval );
	},
	getInitialState: function () {
		return {data: []};
	},
	render: function () {
		var doneList = this.state.data.map( function ( dones ) {
			var date = Object.keys( dones )[0];
			return (
				<DoneListContainer key={date} date={date} data={dones[date]} />
			);
		} );

		return (
			<div>
				{doneList}
			</div>
		);
	}
} );

module.exports = DoneList;
