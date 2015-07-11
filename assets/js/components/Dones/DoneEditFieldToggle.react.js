var React = require( 'react' );

/**
 * Toggle Done edit component
 *
 * @param {int} status toggle state
 * @param {callback} onClick invoked on toggle click
 */
var DoneEditFieldToggle = React.createClass( {
	render: function () {
		var status = 'glyphicon-ok';
		if ( this.props.status == 0 ) {
			status = 'glyphicon-unchecked'
		}
		if ( this.props.onClick ) {
			status += ' pointer '
		}

		var classes = 'glyphicon ' + status;

		return (
			<span onClick={this.props.onClick} className={classes} aria-hidden="true"></span>
		);
	}
} );

module.exports = DoneEditFieldToggle;
