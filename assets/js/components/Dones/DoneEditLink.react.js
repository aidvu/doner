var React = require( 'react' );

/**
 * Done Edit Link display component
 */
var DoneEditLink = React.createClass( {
	render: function () {
		return (
			<a href={this.props.link}>
				{this.props.text}
			</a>
		);
	}
} );

module.exports = DoneEditLink;
