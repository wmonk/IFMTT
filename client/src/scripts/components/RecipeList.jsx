import React, {Component} from 'react'
import Logic from './Logic.jsx'

// TODO

// hook up inputs
// assign new inputs based on schema
// save it all back to root state
// send POSTs

const recipes = [
	{
		name: 'Greater than console log',
		logic: [
			{name: 'greaterThan', args: {amount: 80}},
			{name: 'lessThan', args: {amount: 150}},
		],
		action: [{
			name: 'console',
			args: {text: 'You just spent {{amount}}!'},
		}],
	},
	{
		name: 'Text message',
		logic: [
			{name: 'after', args: {hours: 20, minutes: 30}},
		],
		action: [{
			name: 'sms',
			args: {text: 'You just spent {{amount}}!'},
		}],
	},
]


class Recipe extends Component {

	constructor(props) {
		super(props)
		this.state = this.props
	}

	render() {
		const {name, logic} = this.state

		return (
			<div className="m-b recipe-item">
				<h2>{name}</h2>
				{/*<input value={name} type="text" />*/}

				{/*
					Logic component picks the transaction key
					to test against and shows appropriate filter
					inputs (type and field)
				*/}
				If <Logic {...{logic}} />

				--send me a text_ to [], saying:
				{/*
					Notification component picks SMS, console log etc
					Displays appropriate input field
					<Notification />
				*/}
			</div>
		)
	}
}

export default class RecipeList extends Component {
	render() {
		return (
			<div className="container">
				{recipes.map((recipe, i) => <Recipe {...recipe} key={i} />)}
			</div>
		)
	}
}


