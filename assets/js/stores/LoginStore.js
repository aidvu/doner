var AppDispatcher = require( '../dispatcher/AppDispatcher' );
var EventEmitter = require( 'events' ).EventEmitter;
var LoginConstants = require( '../constants/LoginConstants' );
var assign = require( 'object-assign' );

var CHANGE_EVENT = 'change';

var url = 'api/v1/me';

var user = {};

/**
 * Default error callback
 */
var error = function ( xhr, status, err ) {
	console.error( url, status, err.toString() );
};

/**
 * Default complete callback
 */
var complete = function () {
	LoginStore.emitChange();
};

/**
 * Load logged user from server
 */
function loadUser() {
	$.ajax( {
		url: url,
		dataType: 'json',
		type: 'GET',
		success: function ( data ) {
			user = data;
		},
		error,
		complete
	} );
}

var LoginStore = assign( {}, EventEmitter.prototype, {

	/**
	 * Get the logged user
	 *
	 * @return {object}
	 */
	getUser: function () {
		return user;
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
		case LoginConstants.USER_LOAD:
			loadUser();
			break;

		default:
		// no op
	}
} );

module.exports = LoginStore;
