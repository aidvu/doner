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
				<div className="col-xs-12 pull-left">
					<DoneList title={title}/>
				</div>
			</div>
		);
	}
} );

module.exports = TagListContainer;
