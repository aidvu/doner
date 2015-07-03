var AppDispatcher = require( '../dispatcher/AppDispatcher' );
var LoginConstants = require( '../constants/LoginConstants' );

var LoginActions = {

	/**
	 *
	 */
	loadUser: function () {
		AppDispatcher.dispatch( {
			actionType: LoginConstants.USER_LOAD
		} );
	}
};

module.exports = LoginActions;
