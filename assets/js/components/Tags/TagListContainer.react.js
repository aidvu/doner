var React = require( 'react' );

var DoneList = require( '../Dones/DoneList.react' );

/**
 * Tag List View which displays all Dones for selected #Tag
 */
var TagListContainer = React.createClass( {
	render: function () {
		var title = '#' + this.props.params.name;
		return (
			<div className="row">
				<DoneList title={title}/>
			</div>
		);
	}
} );

module.exports = TagListContainer;
