var React = require( 'react' );

var Header = React.createClass( {
	render: function () {
		return (
			<nav className="navbar navbar-default navbar-fixed-top">
				<div className="container">
					<a className="navbar-brand" href="#">doner</a>
					<a className="navbar-brand" href="#">
						<img alt="doner" style={{height: 20 + "px"}} src="assets/images/doner.png"/>
					</a>

					<p className="navbar-text">because you have no idea what you did yesterday</p>
				</div>
			</nav>
		);
	}
} );

module.exports = Header;
