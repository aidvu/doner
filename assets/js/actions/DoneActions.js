var AppDispatcher = require( '../dispatcher/AppDispatcher' );
var DonerConstants = require( '../constants/DonerConstants' );

var DoneActions = {

	/**
	 * Load dones filtered by parameters
	 *
	 * @param {Object} parameters
	 * @param {Array} parameters.user_id array of done owners
	 * @param {Array} parameters.created_at array of date strings
	 */
	load: function ( parameters ) {
		AppDispatcher.dispatch( {
			actionType: DonerConstants.DONE_LOAD,
			parameters: parameters
		} );
	},

	/**
	 * Load dones for given tag
	 *
	 * @param {string} tag to get dones for
	 */
	load_by_tag: function ( tag ) {
		AppDispatcher.dispatch( {
			actionType: DonerConstants.DONE_LOAD_BY_TAG,
			tag: tag
		} );
	},

	/**
	 * Create a new done
	 *
	 * @param  {int} status 1 done, 0 to do
	 * @param  {string} text the content
	 */
	create: function ( status, text ) {
		AppDispatcher.dispatch( {
			actionType: DonerConstants.DONE_CREATE,
			status: status,
			text: text
		} );
	},

	/**
	 * Update an existing done
	 *
	 * @param  {object} done
	 * @param  {int} done.id id of the done to be updated
	 * @param  {int} done.status status 1 done, 0 to do
	 * @param  {string} done.text the content
	 */
	update: function ( done ) {
		AppDispatcher.dispatch( {
			actionType: DonerConstants.DONE_UPDATE,
			done: done
		} );
	},

	/**
	 * Delete a done
	 *
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
