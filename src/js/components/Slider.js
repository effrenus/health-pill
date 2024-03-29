'use strict';

import React, { PropTypes } from 'react';
import events from '../utils/events';
import Cursor from './Cursor';
import Drag from './Drag';

let sliderMargin = 20;

export default class Slider extends Drag {
	constructor() {
		super();
		this.state = { boundWidth: 0, value: 1, offset: 0 };
		this._onDragStart = this._onDragStart.bind(this);
		this._onDrag = this._onDrag.bind(this);
		this._onDragEnd = this._onDragEnd.bind(this);
		this._onResize = this._onResize.bind(this);
	}
	componentWillMount() {
		events.addEvent(window, 'resize', this._onResize);
	}
	componentDidMount() {
		this._onResize();
	}
	_onResize() {
		var slider = this.refs.slider.getDOMNode();
		this.setState({boundWidth: slider.clientWidth, elmOffset: slider.getBoundingClientRect().left, offset: this.getOffset(this.state.value)});
	}
	_onDragStart(e) {
		var e = events.isTouchDevice() ? e.changedTouches[e.changedTouches.length - 1] : e;
		var position = e.pageX;
		this.setState({startPosition: position});

		super._onDragStart(e);
	}
	_onDrag(e) {
		var e = events.isTouchDevice() ? e.changedTouches[e.changedTouches.length - 1] : e;
		var position = e.pageX;
		var newValue = Math.round((position - this.state.elmOffset) / (this.state.boundWidth / 20) + 1);
		newValue = this.normValue(newValue);
		if(newValue != this.state.value){
			this.setState({value: newValue});
		}
	}
	_onDragEnd(e){
		this.props.onChange(this.state.value);
		super._onDragEnd(e);
	}
	normValue(value) {
		return Math.min(this.props.max, Math.max(this.props.min, value));
	}
	getOffset(value) {
		var numCount = this.props.max - this.props.min;
		return (this.state.boundWidth - sliderMargin*2) / numCount * (value - this.props.min) + sliderMargin;
	}
	renderLabels() {
		var elmsList = [];
		for(var i = this.props.min; i <= this.props.max; i++){
			var clsName = (this.state.value === i) ? 'is-selected' : '';
			elmsList.push(<li key={i} className={clsName} style={{left: this.getOffset(i) + 'px'}}>{i}</li>)
		}

		return elmsList;
	}
	renderCursor() {
		return <Cursor onDragStart={this._onDragStart} onDragEnd={this._onDragEnd} offset={this.getOffset(this.state.value)} />
	}
	render() {
		return (
			<div className="form__field ">
				<div ref="slider" className="slider-container">
					<ol className="slider__labels">
						{this.renderLabels()}
					</ol>
					<div className="slider">
						<i className="slider__bar"></i>
						{this.renderCursor()}
					</div>
				</div>
				<label className="form__field__label">Количество пациентов</label>
			</div>
		);
	}
}
Slider.defaultProps = {min: 0, max: 100, value: 0, onChange: function(){}};
Slider.propTypes = {
	min: PropTypes.number,
	max: PropTypes.number,
	value: PropTypes.number
}
