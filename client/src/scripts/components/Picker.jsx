import React, {Component} from 'react'
import cx from 'bem-classnames'

export default class Picker extends Component {

	constructor(props) {
		super(props)
		this.state = {
			dropdownActive: false,
		}
	}

	toggleDropdown = () => {
		// @TODO: hide others when one is opened
		const {dropdownActive} = this.state
		this.setState({
			dropdownActive: !dropdownActive,
		})
	}

	handleTypeChange = (type) => {
		this.toggleDropdown()
		this.props.changeType(type)
	}

	dropdownClass = (base) => {
		const {dropdownActive} = this.state

		return cx({
			name: `Picker__dropdown`,
			modifiers: ['active'],
		}, {
			active: dropdownActive,
		})
	}

	renderDropdown = (arr, func) => {
		const dropdownClass = this.dropdownClass()
		return (
			<ul className={dropdownClass}>
				{arr.sort().map((item, i) => {
					//@TODO: gray out, unclick if curr
					const handleClick = func.bind(null, item.name || item)
					return <li onClick={handleClick} key={i}>{item.displayName || item}</li>
				})}
			</ul>
		)
	}
}
