var React = require( 'react' );

var DoneEdit = require( './DoneEdit.react' );
var DoneEditDisabled = require( './DoneEditDisabled.react' );
var DoneStore = require( '../../stores/DoneStore' );
var LoginStore = require( '../../stores/LoginStore' );

function getState() {
	return {
		dones: DoneStore.getAll(),
		user: LoginStore.getUser()
	};
}

var DoneListItem = React.createClass( {
	render: function () {
		var doneList = [];
		for ( var key in this.props.dones ) {
			var done = this.props.dones[key];

			if ( done.user_id == this.props.user.id ) {
				doneList.push(
					<DoneEdit key={done.id} data={done}/>
				);
			} else {
				doneList.push(
					<DoneEditDisabled key={done.id} data={done}/>
				);
			}
		}

		return (
			<table className="table table-hover">
				<thead>
					<th colSpan="3">
						{this.props.title}
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
		DoneStore.addChangeListener( this._onChange );
		LoginStore.addChangeListener( this._onChange );
	},
	componentWillUnmount: function () {
		DoneStore.removeChangeListener( this._onChange );
		LoginStore.removeChangeListener( this._onChange );
	},
	_onChange: function () {
		this.setState( getState() );
	},
	getInitialState: function () {
		return getState();
	},
	render: function () {
		var doneList = [];

		var title;
		if (this.props.title) {
			title = (
				<h3>
					{this.props.title}
				</h3>
			);
		}
		for ( var dateDones in this.state.dones ) {
			var date = this.state.dones[dateDones].date;
			var dones = this.state.dones[dateDones].data;
			doneList.push(
				<DoneListItem key={date} title={date} dones={dones} user={this.state.user}/>
			);
		}

		return (
			<div>
				{title}
				{doneList}
			</div>
		);
	}
} );

module.exports = DoneList;
