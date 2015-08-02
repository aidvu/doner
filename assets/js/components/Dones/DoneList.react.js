var React = require( 'react' );

var DoneEdit = require( './DoneEdit.react' );
var DoneStore = require( '../../stores/DoneStore' );
var LoginStore = require( '../../stores/LoginStore' );

function getState() {
	return {
		dones: DoneStore.getAll(),
		user: LoginStore.getUser()
	};
}

/**
 * Displays the given dones in a table. Dones owned by given user are editable.
 *
 * @param {string} title under which the dones are grouped, optional
 * @param {Object} user currently logged in
 * @param {Array} dones of Done objects to be shown
 */
var DoneListItem = React.createClass( {
	render: function () {
		var doneList = [];
		for ( var key in this.props.dones ) {
			var done = this.props.dones[key];
			doneList.push(
				<DoneEdit key={done.id} data={done} isOwner={done.user_id == this.props.user.id}/>
			);
		}

		var head;
		if ( this.props.title ) {
			head = (
				<thead>
					<th colSpan="4">
						{this.props.title}
					</th>
				</thead>
			);
		}
		return (
			<table className="table table-hover">
				{head}
				<tbody>
					{doneList}
				</tbody>
			</table>
		);
	}
} );

/**
 * Pulls the currently loaded Dones from the store, and displays them grouped by date, using DoneListItem
 *
 * @param {string} title in case we want to show multiple lists, or use it for displaying dones under a tag
 */
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
