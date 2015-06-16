'use strict';

import React from 'react';
import Draggable from 'react-draggable';
import events from '../utils/events';

let pageWidht;

export default class Pillow extends Drag {
	constructor() {
		super();
		this._onDrag = this._onDrag.bind(this);
	}
	componentWillMount() {
		pageWidht = document.body.offsetWidth;
	}
	_onDrag(e){
	}
	render() {
		return (
			<Draggable bounds="parent" onDrag={this._onDrag}>
				<i className="recover__pill recover__pill--pulse"></i>
			</Draggable>
			);
	}
}
