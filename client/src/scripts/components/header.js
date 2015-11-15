import request from 'superagent';
import React from 'react';

let Header = React.createClass({
    logout() {
		function deleteAllCookies() {
    		var cookies = document.cookie.split(";");

	    	for (var i = 0; i < cookies.length; i++) {
		    	var cookie = cookies[i];
		    	var eqPos = cookie.indexOf("=");
		    	var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
		    	document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
	    	}	
		}	

		deleteAllCookies();
		location.reload();
	},

	render() {
		return (<div className="header">
			<img className="c-7" src={'img/mondo-inverse.svg'} />
			<div className="c-5 c-last m-t ta-right">
				<span className="color-white fw-bold" onClick={this.logout}>logout</span>
			</div>
		</div>);
	}
});

export default Header;
