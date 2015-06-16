'use strict';

import React from 'react';
import events from '../utils/events';

export default class Drag extends React.Component {
	_pauseEvent(e) {
  		if (e.stopPropagation) e.stopPropagation();
  		if (e.preventDefault) e.preventDefault();
  		e.cancelBubble = true;
  		e.returnValue = false;
  		return false;
	}
	_onDragStart(e) {
		events.addEvent(window, events.dragEventFor['move'], this._onDrag);
    	events.addEvent(window, events.dragEventFor['end'], this._onDragEnd);
    	this._pauseEvent(e);
	}
	_onDragEnd(e){
		events.removeEvent(window, events.dragEventFor['move'], this._onDrag);
    	events.removeEvent(window, events.dragEventFor['end'], this._onDragEnd);
	}
	render() {}
}

Drag.defaultProps = {_onDrag: function(){}, _onDragEnd: function(){}};
