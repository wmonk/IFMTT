import request from 'superagent';
import React from 'react';

let LoginForm = React.createClass({
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
				var message = JSON.parse(body.text).message;
				if (message === 'User Created!' || message === 'User already created!') {
					location.reload();
				}
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
});

export default LoginForm;
