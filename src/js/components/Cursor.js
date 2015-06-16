'use strict';

import React from 'react';
import events from '../utils/events';

export default class Cursor extends React.Component {
	render() {
		var props = {};
		props['on' + events.dragCamelCaseEventFor['start']] = this.props.onDragStart;
		props['on' + events.dragCamelCaseEventFor['end']] = this.props.onDragEnd;
		props.style = {left: this.props.offset};
		return <i {...props} className="slider__cursor"></i>
	}
}
Cursor.defaultProps = {onDragStart: function(){}, onDragEnd: function(){}};
