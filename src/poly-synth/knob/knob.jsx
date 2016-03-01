import React from 'react'

import './knob.scss';


var Knob = React.createClass({
    getInitialState: function() {
        return {
            value: this.reverseLaw(this.getValueLink(this.props).value),
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
        return this.reverseLaw(nextState.value) !== this.state.value
    },

    handleChange(value) {
        if(value > 1) { value = 1; }
        if(value < 0) { value = 0; }
        this.setState({
            value: value
        }, () => {
            this.getValueLink(this.props).requestChange(this.applyLaw(value));
        })
    },

    applyLaw(v){
        let law = this.props.law || "linear";
        let min = this.props.min;
        let max = this.props.max;

        let result = 0;
        switch (law) {
            case "linear":
                result = v*(max-min) + min;
                break;
            case "log":
                result = min * Math.pow(max/min, v);
                break;
            case "pow":
                result = min + (v*v)*(max-min);
                break;
            default:
                result = v*(max-min) + min;
                break;
        }

        return result;
    },
    reverseLaw(v){
        let law = this.props.law || "linear";
        let min = this.props.min;
        let max = this.props.max;

        let result = 0;
        switch (law) {
            case "linear":
                result = (v - min) / (max-min);
                break;
            case "log":
                result = (Math.log(v/min))/(Math.log(max/min));
                break;
            case "pow":
                result = Math.sqrt((v-min)/(max-min));
                break;
            default:
                result = (v - min) / (max-min);
                break;
        }
        return result;
    },

    valueToDeg(value) {
        return Math.round(value * 270);
    },

    onMouseDown(e){
        this.setState({dragPoint: [e.screenX, e.screenY], dragging: true, dragStartValue: this.state.value});
    },

    handleMoveAll: function(e) {
        if(this.state.dragging){
            let value = this.state.dragPoint[1] - e.screenY;
            value *= 0.003; //scale
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

            <div className="knob-surround" onMouseDown={this.onMouseDown} >
            <div
            className="knob"
            style={{
                transform: `rotate(${45 + this.valueToDeg(this.state.value)}deg)`
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
