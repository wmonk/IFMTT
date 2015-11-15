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
		return (<div className="container">
			<img className="login-logo m-b" src={'img/mondo.svg'} />
			<form onSubmit={this.formSubmit}>
				<input 
					placeholder="username" 
					className="m-b p-all w-12"
					name="username" 
					type="email" 
					ref={(c) => this._username = c}/>
				<input 
					placeholder="password" 
					className="m-b p-all w-12" 
					name="password" 
					type="password" 
					ref={c => this._password = c}/>
				<button className="btn-primary m-b p-all w-12" type="submit">submit</button>
			</form>
		</div>);
	}
});

export default LoginForm;
