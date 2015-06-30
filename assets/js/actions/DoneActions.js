var AppDispatcher = require( '../dispatcher/AppDispatcher' );
var DonerConstants = require( '../constants/DonerConstants' );

var DoneActions = {

	/**
	 *
	 */
	load: function () {
		AppDispatcher.dispatch( {
			actionType: DonerConstants.DONE_LOAD
		} );
	},

	/**
	 * @param  {int} status
	 * @param  {string} text
	 */
	create: function ( status, text ) {
		AppDispatcher.dispatch( {
			actionType: DonerConstants.DONE_CREATE,
			status: status,
			text: text
		} );
	},

	/**
	 * @param  {object} done
	 */
	update: function ( done ) {
		AppDispatcher.dispatch( {
			actionType: DonerConstants.DONE_UPDATE,
			done: done
		} );
	},

	/**
	 * @param  {string} id
	 */
	destroy: function ( id ) {
		AppDispatcher.dispatch( {
			actionType: DonerConstants.DONE_DESTROY,
			id: id
		} );
	}
};

module.exports = DoneActions;
