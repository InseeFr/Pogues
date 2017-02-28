import React, { PropTypes, Component } from 'react';
import { COMPONENT_TYPE, GENERAL } from '../constants/pogues-constants'
import Logger from '../logger/logger';

const { QUESTION, SEQUENCE } = COMPONENT_TYPE
import { 
	update, toggleType, increaseDepth, decreaseDepth
}	from '../actions/generic-input'

import { createComponent } from '../actions/component'

import { connect } from 'react-redux'
var logger = new Logger('GenericInput', 'Components');

// TODO for now, we only append at the end of the main sequence,
// or at the end of a subsequence of the main sequence. We use depth
// to differentiate both cases :
// - depth = 1 -> main sequence
// - depth = 2 -> last subsequnece of the main sequence
// If depth = 2 and there is no subsequence in main, we append
// directly at the end of the main sequence.
// The goal is to make the generic input smart enough to add
// components everywhere in the questionnaire, and to show only
// accessible depths (ie: desactivate INCREASE_DEPTH if there is 
// no subsequence to add a component to). 
class GenericInput extends Component {
	//TODO autofocus might be enough, so this could become a stateless component
	
	constructor(props) {
		super(props)
	}
	componentDidMount() {
		//this.input.focus()
	}

	render() {
		const { qrId, type, label, depth, hndlClickLeft, hndlClickRight,
			hndlChange, hndlClickType, hndlEnterKeyDown, leftAllowed,
			rightAllowed, locale } = this.props
		const sequence = type === SEQUENCE
		const inputClass = (sequence ? 'gi-sequence' : 'gi-question');
		const activeIndex = (sequence ? 1 : 0);
		const iconClass = (sequence ? 'fa fa-list' : 'fa fa-question-circle');
		const leftSymbol = leftAllowed ?  'fa fa-chevron-left' : 'fa fa-square';
		const rightSymbol = rightAllowed ?  'fa fa-chevron-right' : 'fa fa-square';
		return (
			<div className={inputClass}>
				<ul className="nav nav-tabs">
					{[locale.question, locale.sequence].map((label, index) => {
						if (index === activeIndex) {
							return(
								<li key={index} role="presentation" className="active">
									<a>{label}</a>
								</li>
							)
						} else {
							return(
								<li key={index} role="presentation">
									<a href="#" onClick={e => {
										e.preventDefault()
										hndlClickType(qrId)
									}}>{label}</a>
								</li>
							)
						}
					})}
				</ul>
				<div className="input-group">
					<span className="input-group-addon">
						<span className={leftSymbol} onClick={() => hndlClickLeft(qrId)}></span>
						<span>{depth}</span>
						<span className={rightSymbol} onClick={() => hndlClickRight(qrId)}></span>
					</span>
					<input className="form-control" type="text" autoFocus ref={ref => this.input = ref}
						value={label} placeholder={locale.enterLabel}
						onChange={e => hndlChange(qrId, e.target.value)}
						onKeyDown={
							e => {
						 		e.keyCode === GENERAL.ENTER_KEY_CODE
						 		&& hndlEnterKeyDown(qrId, label, type, depth)
						 	}
						} />
					<span className="input-group-addon" onClick={() => hndlClickType(qrId)}>
					<span className={iconClass}></span></span>
				</div>
			</div>
			)
	}
}

GenericInput.propTypes = {
	qrId: PropTypes.string.isRequired,
	depth: PropTypes.number.isRequired,
	parent: PropTypes.string.isRequired,
	before: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	leftAllowed: PropTypes.bool.isRequired,
	rightAllowed: PropTypes.bool.isRequired,
	hndlClickType: PropTypes.func.isRequired,
	hndlChange: PropTypes.func.isRequired,
	hndlClickLeft: PropTypes.func.isRequired,
	hndlClickRight: PropTypes.func.isRequired,
	hndlEnterKeyDown: PropTypes.func.isRequired,
	locale: PropTypes.object.isRequired
}


// label, type, parent, before
//TODO choose best option to retrieve questionnaire id : from `ownProps` or from
//app state. 
const mapStateToProps = (state) => {
	const { appState } = state
	const id = appState.questionnaire
	const { giById: { [id] : { parent, before, label, type, depth }} } = appState
	return {
		qrId: id,
		parent,
		before,
		label,
		type,
		depth,
		leftAllowed: true,
		rightAllowed: true,
		locale: state.locale
	}
}

const mapDispatchToProps = {
	hndlChange: (qrId, text) => {
		switch(text[0]) {
			case '/':
				return toggleType(qrId)
			case '+':
				return increaseDepth(qrId)
			case '-':
				return decreaseDepth(qrId)
			default:
				return update(qrId, text)
		}
	},
	hndlClickType: qrId => toggleType(qrId),
	hndlClickLeft: qrId => decreaseDepth(qrId),
	hndlClickRight: qrId => increaseDepth(qrId),
	hndlEnterKeyDown: (qrId, label, type, depth) =>
		createComponent(qrId, label, type, depth)
}

export default connect(mapStateToProps, mapDispatchToProps)(GenericInput)
