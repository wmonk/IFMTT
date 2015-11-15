import React from 'react';
import { render } from 'react-dom';
import request from 'superagent'

let App = React.createClass({
	displayName: 'App',

	formSubmit(e) {
		e.preventDefault();				

		let username = this._username.value;
		let password = this._password.value;

		request
			.post('/login')
			.send({
				username,
				password
			})
			.end((err, body) => {
				console.log(body)
			});
	},

	render() {
		return (<div>
			<form onSubmit={this.formSubmit}>
				<input name="username" ref={(c) => this._username = c}/>
				<input name="password" type="password" ref={c => this._password = c}/>
				<button type="submit">submit</button>
			</form>			
		</div>);
	}
})

render(<App />, document.getElementById('root')
);


