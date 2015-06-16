'use strict';

import React from 'react';
import Slider from './components/Slider';
import TimeSelector from './components/TimeSelector';
import RecoverScene from './components/RecoverScene';

class Form extends React.Component {
	constructor() {
		super();
		this._handleTime = this._handleTime.bind(this);
		this._handleCount = this._handleCount.bind(this);
		this.state = {count: 1};
	}
	_onSubmit(e) {
		e.preventDefault();
	}
	_handleTime(value) {
		this.setState({time: value});
	}
	_handleCount(value) {
		this.setState({count: value});
	}
	render() {
		return (
			<div className="form">
				<form onSubmit={this._onSubmit} action=".">
					<Slider onChange={this._handleCount} min={1} max={21} />
					<TimeSelector onChange={this._handleTime} />
				</form>
			</div>
		);
	}
}

class Scene extends React.Component {
	render() {
		return (
			<div>
				<RecoverScene />
				<Form />
			</div>
		);
	}
}

React.render(
	<Scene />,
	document.getElementById('page-scene')
	);
