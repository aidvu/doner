'use strict';

var Done = React.createClass( {displayName: "Done",
	handleDelete: function () {
		$.ajax( {
			url: "api/v1/dones/" + this.props.data.id,
			type: 'DELETE',
			success: function ( data ) {
			}.bind( this ),
			error: function ( xhr, status, err ) {
				console.error( this.props.url, status, err.toString() );
			}.bind( this )
		} );
	},
	render: function () {
		var status;
		if (this.props.data.status == 1) {
			status = (React.createElement("span", {className: "glyphicon glyphicon-ok", "aria-hidden": "true"}));
		} else {
			status = (React.createElement("span", {className: "glyphicon glyphicon-unchecked", "aria-hidden": "true"}));
		}
		return (
			React.createElement("tr", null, 
				React.createElement("td", {className: "col-xs-1"}, 
					status
				), 
				React.createElement("td", null, 
					this.props.data.text
				), 
				React.createElement("td", {className: "col-xs-1"}, 
					React.createElement("span", {className: "glyphicon glyphicon-edit", "aria-hidden": "true"}), 
					React.createElement("span", {onClick: this.handleDelete, className: "glyphicon glyphicon-trash", "aria-hidden": "true"})
				)
			)
		);
	}
} );

var DoneList = React.createClass( {displayName: "DoneList",
	render: function () {
		var doneList = this.props.data.map( function ( done ) {
			return (
				React.createElement(Done, {key: done.id, data: done})
			);
		} );

		return (
			React.createElement("table", {className: "table table-hover"}, 
				React.createElement("thead", null, 
					React.createElement("th", {colSpan: "3"}, 
						this.props.date
					)
				), 
				React.createElement("tbody", null, 
					doneList
				)
			)
		);
	}
} );

var DoneListContainer = React.createClass( {displayName: "DoneListContainer",
	loadDones: function() {
		$.ajax( {
			url: this.props.url,
			dataType: 'json',
			type: 'GET',
			success: function ( data ) {
				var data_objects = {};
				for ( var key in data ) {
					var date_key = data[key]['created_at'].substr( 0, 10 );
					if ( ! data_objects[date_key] ) {
						data_objects[date_key] = [];
					}
					data_objects[date_key].push( data[key] );
				}

				var organized_data = [];
				for ( key in data_objects ) {
					var separate_object = {};
					separate_object[key] = data_objects[key];
					organized_data.push( separate_object );
				}

				this.setState( {data: organized_data} );
			}.bind( this ),
			error: function ( xhr, status, err ) {
				console.error( this.props.url, status, err.toString() );
			}.bind( this )
		} );
	},
	componentDidMount: function () {
		this.loadDones();
		setInterval(this.loadDones, this.props.pollInterval);
	},
	getInitialState: function () {
		return {data: []};
	},
	render: function () {
		var doneList = this.state.data.map( function ( dones ) {
			var date = Object.keys( dones )[0];
			return (
				React.createElement(DoneList, {key: date, date: date, data: dones[date]})
			);
		} );

		return (
			React.createElement("div", null, 
				doneList
			)
		);
	}
} );

var DoneListForm = React.createClass({displayName: "DoneListForm",
	handleSubmit: function(e) {
		e.preventDefault();
		var status = React.findDOMNode(this.refs.status).checked;
		var text = React.findDOMNode(this.refs.text).value.trim();

		if (!text) {
			return;
		}

		React.findDOMNode(this.refs.text).value = '';

		var data = {
			"status": status,
			"text": text
		};

		$.ajax({
			url: this.props.url,
			dataType: 'json',
			contentType: "application/json",
			type: 'POST',
			data: JSON.stringify(data),
			success: function(data) {
			}.bind(this),
			error: function(xhr, status, err) {
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
		return;
	},
	render: function() {
		return (
			React.createElement("div", {className: "container"}, 
				React.createElement("form", {className: "doneListForm"}, 
					React.createElement("div", {className: "row"}, 
						React.createElement("div", {className: "col-xs-10"}, 
							React.createElement("div", {className: "input-group"}, 
								React.createElement("span", {className: "input-group-addon"}, 
									React.createElement("input", {ref: "status", type: "checkbox"})
								), 
								React.createElement("input", {ref: "text", type: "text", className: "form-control"})
							)
						), 
						React.createElement("div", {className: "col-xs-1"}, 
							React.createElement("button", {type: "button", className: "btn btn-primary", onClick: this.handleSubmit}, "Save")
						)
					)
				)
			)
		);
	}
});

var DonerHeader = React.createClass( {displayName: "DonerHeader",
	render: function () {
		return (
			React.createElement("nav", {className: "navbar navbar-default navbar-fixed-top"}, 
				React.createElement("div", {className: "container"}, 
					React.createElement("a", {className: "navbar-brand", href: "#"}, "doner"), 
					React.createElement("a", {className: "navbar-brand", href: "#"}, 
						React.createElement("img", {alt: "doner", style: {height: 20 + "px"}, src: "assets/images/doner.png"})
					), 

					React.createElement("p", {className: "navbar-text"}, "because you have no idea what you did yesterday")
				)
			)
		);
	}
} );

var DonerContent = React.createClass( {displayName: "DonerContent",
	render: function () {
		var url = "api/v1/dones";
		return (
			React.createElement("div", {className: "container"}, 
				React.createElement(DoneListForm, {url: url}), 
				React.createElement(DoneListContainer, {url: url, pollInterval: 1200})
			)
		);
	}
} );

var Doner = React.createClass( {displayName: "Doner",
	render: function () {
		return (
			React.createElement("div", null, 
				React.createElement(DonerHeader, null), 
				React.createElement(DonerContent, null)
			)
		);
	}
} );

React.render( React.createElement(Doner, null), document.getElementById( 'content' ) );
