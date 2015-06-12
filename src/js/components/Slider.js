'use strict';

import React from 'react';
import events from '../mixins/events';
import Cursor from './Cursor';

let sliderMargin = 20;

export default class Slider extends React.Component {
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
	_pauseEvent(e) {
  		if (e.stopPropagation) e.stopPropagation();
  		if (e.preventDefault) e.preventDefault();
  		e.cancelBubble = true;
  		e.returnValue = false;
  		return false;
	}
	_onResize() {
		var slider = this.refs.slider.getDOMNode();
		this.setState({boundWidth: slider.clientWidth, elmOffset: slider.getBoundingClientRect().left, offset: this.getOffset(this.state.value)});
	}
	_onDragStart(e) {
		var position = e.pageX;
		this.setState({startPosition: position});

		events.addEvent(window, events.dragEventFor['move'], this._onDrag);
    	events.addEvent(window, events.dragEventFor['end'], this._onDragEnd);
    	this._pauseEvent(e);
	}
	_onDrag(e) {
		var position = e.pageX;
		var diff = position - this.state.startPosition;
		var newValue = Math.round((position - this.state.elmOffset) / (this.state.boundWidth / 20) + 1);
		newValue = this.normValue(newValue);
		if(newValue != this.state.value){
			this.setState({value: newValue});
		}
	}
	_onDragEnd(e){
		this.props.onChange(this.state.value);
		events.removeEvent(window, events.dragEventFor['move'], this._onDrag);
    	events.removeEvent(window, events.dragEventFor['end'], this._onDragEnd);
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
			elmsList.push(<li className={clsName} style={{left: this.getOffset(i) + 'px'}}>{i}</li>)
		}
		return elmsList;
	}
	renderCursor() {
		return <Cursor onDragStart={this._onDragStart} onDragEnd={this._onDragEnd} offset={this.getOffset(this.state.value)} />
	}
	render() {
		return (
			<div className="patient">
				<div ref="slider" className="slider-container">
					<ol className="slider__labels">
						{this.renderLabels()}
					</ol>
					<div className="slider">
						<i className="slider__bar"></i>
						{this.renderCursor()}
					</div>
				</div>
				<label className="patient__label">Количество пациентов</label>
			</div>
		);
	}
}
Slider.defaultProps = {min: 0, max: 100, value: 0, onChange: function(){}};
Slider.propTypes = {
	min: React.PropTypes.number,
	max: React.PropTypes.number,
	value: React.PropTypes.number
}