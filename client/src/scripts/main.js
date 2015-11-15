import React from 'react';
import { render } from 'react-dom';
import LoginForm from './components/loginForm';
import Header from './components/header';

let App = React.createClass({
	displayName: 'App',

	render() {
		var loggedIn = (document.cookie.includes('account_id') && document.cookie.includes('access_token'));

		return (<div>{loggedIn ? 
			<Header />
		: <LoginForm />}</div>);
	}
})

render(<App />, document.getElementById('root')
);
