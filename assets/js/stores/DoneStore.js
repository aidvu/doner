var AppDispatcher = require( '../dispatcher/AppDispatcher' );
var EventEmitter = require( 'events' ).EventEmitter;
var DonerConstants = require( '../constants/DonerConstants' );
var assign = require( 'object-assign' );

var CHANGE_EVENT = 'change';

var _dones = {};

var url = 'api/v1/dones';

function load_dones() {
	$.ajax( {
		url: url,
		dataType: 'json',
		type: 'GET',
		success: function ( data ) {
			for ( var done in data ) {
				_dones[data[done].id] = data[done];
			}
		}.bind( this ),
		error: function ( xhr, status, err ) {
			console.error( url, status, err.toString() );
		}.bind( this ),
		complete: function () {
			DoneStore.emitChange();
		}.bind( this )
	} );
}

/**
 * Create a Done item.
 * @param  {string} text The content of the Done
 */
function create( status, text ) {
	var data = {
		status: status,
		text: text
	};

	$.ajax( {
		url: url,
		dataType: 'json',
		contentType: "application/json",
		type: 'POST',
		data: JSON.stringify( data ),
		success: function ( data ) {
			_dones[data.id] = data;
		}.bind( this ),
		error: function ( xhr, status, err ) {
			console.error( url, status, err.toString() );
		}.bind( this ),
		complete: function () {
			DoneStore.emitChange();
		}.bind( this )
	} );
}

/**
 * Update a Done item.
 * @param  {string} id
 * @param {object} updates An object literal containing only the data to be
 *     updated.
 */
function update( done ) {
	$.ajax( {
		url: url + '/' + done.id,
		dataType: 'json',
		contentType: "application/json",
		type: 'PUT',
		data: JSON.stringify( done ),
		success: function ( data ) {
			_dones[data.id] = assign( {}, _dones[data.id], data );
		}.bind( this ),
		error: function ( xhr, status, err ) {
			console.error( url, status, err.toString() );
		}.bind( this ),
		complete: function () {
			DoneStore.emitChange();
		}.bind( this )
	} );
}

/**
 * Delete a Done item.
 * @param  {string} id
 */
function destroy( id ) {
	$.ajax( {
		url: url + '/' + id,
		type: 'DELETE',
		success: function () {
			delete _dones[id];
		}.bind( this ),
		error: function ( xhr, status, err ) {
			console.error( url, status, err.toString() );
		}.bind( this ),
		complete: function () {
			DoneStore.emitChange();
		}.bind( this )
	} );
}

var DoneStore = assign( {}, EventEmitter.prototype, {
	/**
	 * Load the Dones from the server
	 */
	loadInitial: function () {
		loadDones();
	},

	/**
	 * Get the entire collection of Dones.
	 * @return {object}
	 */
	getAll: function () {
		var data_objects = {};
		for ( var key in _dones ) {
			var date_key = _dones[key]['created_at'].substr( 0, 10 );
			if ( ! data_objects[date_key] ) {
				data_objects[date_key] = [];
			}
			data_objects[date_key].push( _dones[key] );
		}

		var organized_data = [];
		for ( key in data_objects ) {
			var separate_object = {date: key};
			separate_object['data'] = data_objects[key];
			organized_data.push( separate_object );
		}

		organized_data.sort(
			function ( a, b ) {
				return a.date < b.date ? 1 : - 1;
			}
		);

		return organized_data;
	},

	emitChange: function () {
		this.emit( CHANGE_EVENT );
	},

	/**
	 * @param {function} callback
	 */
	addChangeListener: function ( callback ) {
		this.on( CHANGE_EVENT, callback );
	},

	/**
	 * @param {function} callback
	 */
	removeChangeListener: function ( callback ) {
		this.removeListener( CHANGE_EVENT, callback );
	}
} );

// Register callback to handle all updates
AppDispatcher.register( function ( action ) {
	switch ( action.actionType ) {
		case DonerConstants.DONE_CREATE:
			var text = action.text.trim();
			if ( text !== '' ) {
				create( action.status, text );
			}
			break;

		case DonerConstants.DONE_UPDATE:
			update( action.done );
			break;

		case DonerConstants.DONE_DESTROY:
			destroy( action.id );
			break;

		case DonerConstants.DONE_LOAD:
			load_dones();
			break;

		default:
		// no op
	}
} );

module.exports = DoneStore;
