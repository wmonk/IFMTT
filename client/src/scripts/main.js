import React from 'react';
import { render } from 'react-dom';
import LoginForm from './components/loginForm';
import Header from './components/header';
import RecipeList from './components/RecipeList.jsx'

let App = React.createClass({
	displayName: 'App',

	render() {
		var loggedIn = (document.cookie.includes('account_id') && document.cookie.includes('access_token'));

		return (
			<div>
				{loggedIn ?
					[<Header />, <RecipeList />]
					:
					<LoginForm />
				}
			</div>);
	}
})

render(<App />, document.getElementById('root')
);
