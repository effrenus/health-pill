'use strict';

import React from 'react';
import Draggable from 'react-draggable';
import events from '../utils/events';
import cx from 'bem-classnames';

let pageWidth;
const activeMargin = 170;
const bem_cx = {
	container: {
		name: 'recover',
		states: ['swallowed', 'candrop']
	},
	pillow: {
		name: 'recover__pill',
	},
	pillow_inner: {
		name: 'recover__pill__inner',
		modifiers: ['pulse']
	}
}

export default class Recover extends React.Component {
	constructor() {
		super();
		this.state = {swallowed: false, candrop: false};
		this._onClick = this._onClick.bind(this);
		this._onDrag = this._onDrag.bind(this);
		this._onDragEnd = this._onDragEnd.bind(this);
		this._onResize = this._onResize.bind(this);
	}
	componentWillMount() {
		this._onResize();
		events.addEvent(window, 'resize', this._onResize);
	}
	_onResize() {
		pageWidth = document.body.offsetWidth;
	}
	_onDrag(e){
		var e = events.isTouchDevice() ? e.changedTouches[e.changedTouches.length - 1] : e;

		if(Math.abs(pageWidth/2 - e.clientX) <= activeMargin){
			this.setState({candrop: true});
		}else{
			this.setState({candrop: false});
		}
	}
	_onDragEnd(e){
		if(this.state.candrop){
			this.setState({candrop: false, swallowed: true});
		}
	}
	_onClick(e) {
		this.setState({swallowed: true});
	}
	render() {
		return (
			<div ref="container" className={cx(bem_cx.container, {candrop: this.state.candrop, swallowed: this.state.swallowed})}>
				<Draggable bounds="parent" onDrag={this._onDrag} onStop={this._onDragEnd}>
					<i className={cx(bem_cx.pillow)}>
						<i className={cx(bem_cx.pillow_inner, {pulse: true})}></i>
					</i>
				</Draggable>
			</div>
		);
	}
}
