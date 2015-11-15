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

const blankRecipe = {
	name: 'New Recipe name',
	logic: [
		{name: 'greaterThan', args: {amount: 50}},
	],
	action: [{
		name: 'sms',
		args: {text: 'You just spent {{amount}}!'},
	}],
}

class Recipe extends Component {

	constructor(props) {
		super(props)
		this.state = this.props
	}

	update = (state) => {
		const {index, updateShit, action, name, logic} = this.props
		console.log('update', state)

		console.log(',,,', this.props, state)
		const statex = {
			action, logic, name,
			...state
		}
		updateShit(statex, index)
	}

	saveRecipe = () => {
		const json = JSON.stringify(this.props)
		console.log('save', json)
	}

	render() {
		const {name, logic} = this.props
		const {update, saveRecipe} = this

		return (
			<div className="m-b recipe-item">
				<h2>{name}</h2>
				{/*<input value={name} type="text" />*/}

				{/*
					Logic component picks the transaction key
					to test against and shows appropriate filter
					inputs (type and field)
				*/}
				If <Logic {...{logic, update}} />

				send me a <u>text</u> to {' '}
				<input type="tel" value="+447805284648" className="inputx" />, saying:
				<textarea className="textareax" value="Hey! You just spent {{amount}} at {{description}}" />
				{/*
					Notification component picks SMS, console log etc
					Displays appropriate input field
					<Notification />
				*/}

				<br />
				<button onClick={saveRecipe}>Save</button>
			</div>
		)
	}
}

export default class RecipeList extends Component {

	constructor(props) {
		super(props)
		this.state = {
			recipes,
			activeRecipe: null,
		}
	}

	newRecipe = () => {
		const {recipes} = this.state
		let recipesCopy = recipes.slice()
		recipesCopy.push(blankRecipe)
		this.setState({recipes: recipesCopy})
	}

	updateShit = (recipe, index) => {
		const {recipes} = this.state
		let recipesCopy = recipes.slice()
		recipesCopy[index] = recipe
		this.setState({recipes: recipesCopy})

		console.log('===', recipe)
	}

	getActiveRecipe = () => {
		const {activeRecipe: index, recipes} = this.state
		return {
			...recipes[index],
			index,
		}
	}

	setActiveRecipe = (index, evt) => {
		evt.preventDefault()
		this.setState({
			activeRecipe: index,
		})
	}

	closeModal = () => {
		this.setState({activeRecipe: null})
	}

	render() {
		const {activeRecipe, recipes} = this.state
		// console.log('?', this.getActiveRecipe())
		let xx;
		if (activeRecipe !== null) xx = this.getActiveRecipe()

		console.log('rec', recipes)

		return (
			<div className="container">
				{recipes.map((recipe, i) => {
					const onClick = this.setActiveRecipe.bind(null, i)
					return (
						<div key={i}>
							<h2 {...{onClick}}>{recipe.name}</h2>
						</div>
					)
				})}

				{activeRecipe !== null ?
					<div className="modal">
						<div className="modal__inner">

							<a className="modal__close" onClick={this.closeModal}>close</a>

							<Recipe {...xx} updateShit={this.updateShit} />
						</div>
					</div>
				: null}

				<button onClick={this.newRecipe}>New</button>
			</div>
		)
	}
}


