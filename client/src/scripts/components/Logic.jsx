import React, {Component} from 'react'
import cx from 'bem-classnames'
import logicTypes from './logicTypes'
import Picker from './Picker.jsx'
import FilterInput from './FilterInput.jsx'

var stuff = {
	amount: {
		allowedLogic: ['greaterThan', 'lessThan'],
	},
	time: {
		allowedLogic: ['after', 'before'],
	},
	currency: {
		allowedLogic: ['stringIsNot', 'stringIs'],
	},
}

class TypePicker extends Picker {

	render() {
		const {type, changeType} = this.props
		const {dropdownActive} = this.state
		const onClick = this.toggleDropdown

		// To show all but currently selected add `.filter(field => field !== type)`
		const dropdownItems = Object.keys(stuff)

		return (
			<span className="Picker">
				<a href="#" {...{onClick}} className="Picker__link">{type}</a>

				{this.renderDropdown(dropdownItems, this.handleTypeChange)}
			</span>
		)
	}
}


class LogicItem extends Picker {

	handleShit = (type, evt) => {
		const {index, changeFilterType} = this.props
		changeFilterType(type, index)
	}

	getType = (logicName) => {
		const y = Object.keys(stuff).filter(item => {
			const x = stuff[item].allowedLogic
			return !!~x.indexOf(logicName)
		})[0]

		return y
	}

	render() {
		const {name} = this.props
		const type = this.getType(name)
		this.getType(name)
		const {displayName} = logicTypes[name]
		const onClick = this.toggleDropdown
		const allowedLogic = stuff[type].allowedLogic
		const allowedDropdownItems = Object.keys(logicTypes).filter(item => {
			return !!~allowedLogic.indexOf(item)
		})


		const dropdownItems = allowedDropdownItems.map(name => {
			const {displayName} = logicTypes[name]
			return {
				name,
				displayName,
			}
		})

		const changeType = (type) => {
			const newType = stuff[type].allowedLogic[0]
			this.props.changeType(newType, this.props.index)
		}

		return (
			<span>

				<TypePicker {...{type, changeType}} /> {' '}

				<span className="Picker">
					<u {...{onClick}} className="Picker__link">{displayName}</u> {' '}
					{this.renderDropdown(dropdownItems, this.handleShit)}

					{' '}
					{/*<input type="number" />*/}

					<FilterInput {...this.props} />

					{' '}

				</span>
			</span>
		)
	}
}

export default class Logic extends Component {

	constructor(props) {
		super(props)
		const {logic} = this.props
		this.state = {
			logic,
		}
	}

	changeType = (type, index) => {
		const {logic} = this.state
		let newItem = logic.slice()
		newItem[index] = {
			name: type,
			args: logicTypes[type].defaultArgs,
		}

		this.setState({
			logic: newItem
		})

		// if (!hasAllowedLogic) {
		// 	const newLogic = {
		// 		name: allowedLogic[0],
		// 		// @TODO get from defaultArgs
		// 		// args: {amount: 20},
		// 	}

		// 	this.setState({
		// 		logic: [newLogic],
		// 	})
		// }
	}

	newFilter = () => {
		const {logic} = this.state
		let updatedLogic = logic.slice()
		const firstLogicKey = Object.keys(logicTypes)[0]
		const newItem = logicTypes[firstLogicKey]
		updatedLogic.push({
			name: firstLogicKey,
			args: newItem.defaultArgs,
		})

		// Replace w/ props callback to LogicList
		this.setState({logic: updatedLogic})
	}

	changeFilterType = (type, index) => {
		const {logic} = this.state
		let updatedLogic = logic.slice()
		updatedLogic[index].name = type
		this.setState({logic: updatedLogic})
	}

	render() {
		const {type, logic} = this.state
		const {changeType, changeFilterType, newFilter} = this

		return (
			<span>
				{logic.map(({name, args}, index) => {
					const len = logic.length
					const last = index === len-1
					return (
						<span key={index}>
							<LogicItem {...{name, args, type, index, changeType, changeFilterType}} />

							{(len > 0 && !last) ? 'and ' : 'then '}

							{last ?
								<a href="#" className="newbtn" onClick={newFilter}>+</a>
							: null}
						</span>
					)
				})}
			</span>
		)
	}
}
