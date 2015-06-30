var React = require( 'react' );

var Done = require( './Done.react' );
var DoneActions = require( '../../actions/DoneActions' );
var DoneStore = require( '../../stores/DoneStore' );

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
	componentDidMount: function () {
		DoneActions.load();
		DoneStore.addChangeListener( this._onChange );
	},
	componentWillUnmount: function () {
		DoneStore.removeChangeListener( this._onChange );
	},
	_onChange: function () {
		var state = {
			data: DoneStore.getAll()
		};
		this.setState( state );
	},
	getInitialState: function () {
		return {data: []};
	},
	render: function () {
		var doneList = [];
		for ( var date_dones in this.state.data ) {
			var date = this.state.data[date_dones].date;
			var dones = this.state.data[date_dones].data;
			doneList.push(
				<DoneListContainer key={date} date={date} data={dones} />
			);
		}

		return (
			<div>
				{doneList}
			</div>
		);
	}
} );

module.exports = DoneList;
