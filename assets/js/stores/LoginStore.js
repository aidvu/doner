var AppDispatcher = require( '../dispatcher/AppDispatcher' );
var EventEmitter = require( 'events' ).EventEmitter;
var LoginConstants = require( '../constants/LoginConstants' );
var assign = require( 'object-assign' );

var CHANGE_EVENT = 'change';

var _url = 'api/v1/me';

/**
 * Object containing currently logged in user
 *
 * @type {Object}
 * @private
 */
var _user = {};

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
	LoginStore.emitChange();
};

/**
 * Load logged user from server
 */
function loadUser() {
	$.ajax( {
		url: _url,
		dataType: 'json',
		type: 'GET',
		success: function ( data ) {
			_user = data;
		},
		error: error,
		complete: complete
	} );
}

var LoginStore = assign( {}, EventEmitter.prototype, {

	/**
	 * Get the logged user
	 *
	 * @return {Object}
	 */
	getUser: function () {
		return _user;
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
