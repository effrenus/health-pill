'use strict';

import React from 'react';
import cx from 'bem-classnames';

const periodChoices = {
	day: {value: 1, label: 'день'},
	week: {value: 2, label: 'неделя'},
	month: {value: 3, label: 'месяц'}
};
const bem_cx = {
	btn: {
		name: 'btn',
		states: ['selected']
	}
}

export default class TimeSelector extends React.Component {
	constructor() {
		super();
		this.state = {value: 0};
		this._onClick = this._onClick.bind(this);
	}
	_onClick(e) {
		var elm = e.target;
		var key = elm.getAttribute('data-period');
		this.setState({value: periodChoices[key].value});
		this.props.onChange(periodChoices[key].value);
	}
	render() {
		return (
			<div className="form__field form__field-time">
				<ul className="period__list">
					{Object.keys(periodChoices).map(function(key){
						return (
							<li key={key}>
								<button
									onClick={this._onClick} data-period={key}
									className={cx(bem_cx.btn, {selected: (this.state.value === periodChoices[key].value)})}>
									{periodChoices[key].label}
								</button>
							</li>
						);
					}.bind(this))}
				</ul>
				<label className="form__field__label">за период</label>
			</div>
		);
	}
}

TimeSelector.defaultProps = {onChange: function(){}};
