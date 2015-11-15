import React, {Component} from 'react'
import cx from 'bem-classnames'
import logicTypes from './logicTypes'

export default class FilterInput extends Component {

	timeFromStr = (value) => {
		const [hours, minutes] = value.split(':').map(n => parseInt(n))
		return {hours, minutes}
	}

	timeToStr = ({hours, minutes}) => `${hours}:${minutes}`

	handleChange = ({value}) => {
		const {name} = this.props

		console.log('val', value)
	}

	getField = (type) => {
		const {name, args} = this.props
		// console.log(this.props)

		if (name === 'greaterThan' || name === 'lessThan') {
			return <input type="number" value={args.amount}  onChange={this.handleChange}/>

		} else if (name === 'after' || name === 'before') {
			let val = this.timeToStr(args)
			return <input type="text" value={val}  onChange={this.handleChange}/>

		} else if (name === 'stringIsNot' || name === 'stringIs') {
			let val = 'GBP'
			const currencies = ['GBP', 'USD', 'EUR', 'HKD']
			return (
				<select value={val} className="inlineblock" onChange={this.handleChange}>
					{currencies.map((currency, i) => <option value={currency} key={i}>{currency}</option>)}
				</select>
			)
		} else {
			return <span>??</span>
		}
	}

	render() {
		const {args, name} = this.props
		return (
			<span>
				{this.getField(name)}
			</span>
			// <input type="number" value={args.amount} />
		)
	}
}
