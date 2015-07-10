var AppDispatcher = require( '../dispatcher/AppDispatcher' );
var EventEmitter = require( 'events' ).EventEmitter;
var DonerConstants = require( '../constants/DonerConstants' );
var assign = require( 'object-assign' );

/**
 * Change Event constant
 *
 * @type {string}
 */
var CHANGE_EVENT = 'change';

/**
 * Object containing loaded dones, done.id is used as a key
 *
 * @type {Object}
 * @private
 */
var _dones = {};

/**
 * Dones API endpoint
 *
 * @type {string}
 * @private
 */
var _url = 'api/v1/dones';

/**
 * Default error callback
 */
var error = function ( xhr, status, err ) {
	console.error( _url, status, err.toString() );
};

/**
 * Default complete callback
 */
var complete = function () {
	DoneStore.emitChange();
};


/**
 * Load dones from server filtered by parameters
 *
 * @param {Object} parameters
 * @param {array} parameters.user_id array of done owners
 * @param {array} parameters.created_at array of date strings
 */
function load_dones( parameters ) {
	$.ajax( {
		url: _url,
		dataType: 'json',
		data: parameters,
		type: 'GET',
		success: function ( data ) {
			_dones = {};
			for ( var done in data ) {
				_dones[data[done].id] = data[done];
			}
		},
		error: error,
		complete: complete
	} );
}

/**
 * Create a Done item.
 *
 * @param {int} status 1 done, 0 to do
 * @param {string} text the content
 */
function create( status, text ) {
	var data = {
		status: status,
		text: text
	};

	$.ajax( {
		url: _url,
		dataType: 'json',
		contentType: "application/json",
		type: 'POST',
		data: JSON.stringify( data ),
		success: function ( data ) {
			_dones[data.id] = data;
		},
		error: error,
		complete: complete
	} );
}

/**
 * Update a Done item.
 *
 * @param {Object} done An object literal containing the done to be updated
 * @param {int} done.id id of the done to be updated
 * @param {int} done.status status 1 done, 0 to do
 * @param {string} done.text the content
 */
function update( done ) {
	$.ajax( {
		url: _url + '/' + done.id,
		dataType: 'json',
		contentType: "application/json",
		type: 'PUT',
		data: JSON.stringify( done ),
		success: function ( data ) {
			_dones[data.id] = assign( {}, _dones[data.id], data );
		},
		error: error,
		complete: complete
	} );
}

/**
 * Delete a Done item.
 *
 * @param {string} id
 */
function destroy( id ) {
	$.ajax( {
		url: _url + '/' + id,
		type: 'DELETE',
		success: function () {
			delete _dones[id];
		},
		error: error,
		complete: complete
	} );
}

var DoneStore = assign( {}, EventEmitter.prototype, {

	/**
	 * Get the currently loaded dones, returned as an array of objects
	 * Each objects contains date (YYYY-MM-DD formatted), and data containing all the dones for given date
	 *
	 * @return {Array}
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

	/**
	 * Emit the change event
	 */
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
			load_dones( action.parameters );
			break;

		default:
		// no op
	}
} );

module.exports = DoneStore;
