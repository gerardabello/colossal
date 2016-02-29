import React from 'react'

import './knob.scss';


var Knob = React.createClass({
    getInitialState: function() {
        return {
            value: this.getValueLink(this.props).value,
            dragging: false,
            dragPoint: [0.0,0.0],
            dragStartValue: 0,
        };
    },

    getValueLink: function(props) {
      // Create an object that works just like the one
      // returned from `this.linkState` if we weren't passed
      // one; that way, we can always behave as if we're using
      // `valueLink`, even if we're using plain `value` and `onChange`.
      return props.valueLink || {
        value: props.value,
        requestChange: props.onChange
      };
    },

    shouldComponentUpdate(nextProps, nextState) {
        return nextState.value !== this.state.value
    },

    handleChange(value) {
        if(value > this.props.max) { value = this.props.max; }
        if(value < this.props.min) { value = this.props.min; }
        this.setState({
            value: value
        }, () => {
            this.getValueLink(this.props).requestChange(value);
        })
    },

    valueToDeg(value) {
        return Math.round(((value-this.props.min) / (this.props.max - this.props.min)) * 270)
    },

    onMouseDown(e){
        this.setState({dragPoint: [e.screenX, e.screenY], dragging: true, dragStartValue: this.state.value});
    },

    handleMoveAll: function(e) {
        if(this.state.dragging){
            let value = this.state.dragPoint[1] - e.screenY;
            value *= (this.props.max - this.props.min)*0.003; //scale
            this.handleChange(this.state.dragStartValue + value);
        }
    },

    handleMouseUp: function(e) {
        this.setState({dragging: false});
    },

    componentDidMount: function() {
        window.addEventListener('mousemove', this.handleMoveAll);
        window.addEventListener('mouseup', this.handleMouseUp);
    },

    render() {
        return (
            <div className="knob" onMouseDown={this.onMouseDown} >
            <div
            className="spinner"
            style={{
                transform: `rotate(${-45 + this.valueToDeg(this.state.value)}deg)`
            }}
            >
            </div>

            <div className="indicator" style={{transform: `rotate(-45deg)`}}></div>
            <div className="indicator" style={{transform: `rotate(0deg)`}}></div>
            <div className="indicator" style={{transform: `rotate(45deg)`}}></div>
            <div className="indicator" style={{transform: `rotate(90deg)`}}></div>
            <div className="indicator" style={{transform: `rotate(135deg)`}}></div>
            <div className="indicator" style={{transform: `rotate(180deg)`}}></div>
            <div className="indicator" style={{transform: `rotate(225deg)`}}></div>

            </div>
        )
    }
});

export default Knob;
