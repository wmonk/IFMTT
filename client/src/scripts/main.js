import React from 'react';
import { render } from 'react-dom';
import LoginForm from './components/loginForm';

let App = React.createClass({
	displayName: 'App',

	render() {
		if (!(document.cookie.includes('account_id') && document.cookie.includes('access_token'))) {
			return (<LoginForm />)
		}

		return (<div>Do some cool shit!</div>);
	}
})

render(<App />, document.getElementById('root')
);
