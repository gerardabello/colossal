import React from 'react';

import './knob.scss';

import Maps from '../../maps.js';


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

    componentWillReceiveProps(nextProps){
        this.setState({value: this.reverseLaw(this.getValueLink(nextProps).value)});
    },

    shouldComponentUpdate: function(nextProps, nextState){
        return this.state.value != nextState.value;
    },

    handleChange(value) {
        if(value > 1) { value = 1; }
        if(value < 0) { value = 0; }
        this.setState({
            value: value
        }, () => {
            this.getValueLink(this.props).requestChange(this.applyLaw(value));
        });
    },

    applyLaw(v){
        return Maps.applyLaw(v,this.props.min,this.props.max,this.props.law);
    },
    reverseLaw(v){
        return Maps.reverseLaw(v,this.props.min,this.props.max,this.props.law);
    },

    valueToDeg(value) {
        return Math.round(value * 270);
    },

    onMouseDown(e){
        if(e.button==2){
            let def = 0;
            if(def < this.props.min || def > this.props.max){
                def = this.props.min;
            }
            if(this.props.defaultValue != null){
                def = this.props.defaultValue;
            }
            this.handleChange(this.reverseLaw(def));
            return;
        }
        this.setState({dragPoint: [e.screenX, e.screenY], dragging: true, dragStartValue: this.state.value});
    },

    handleMoveAll: function(e) {
        if(this.state.dragging){
            let value = this.state.dragPoint[1] - e.screenY;
            value *= 0.003; //scale
            this.handleChange(this.state.dragStartValue + value);
        }
    },

    handleMouseUp: function(){
        this.setState({dragging: false});
    },

    componentDidMount: function() {
        window.addEventListener('mousemove', this.handleMoveAll);
        window.addEventListener('mouseup', this.handleMouseUp);
    },

    render() {
        let rdeg = 45 + this.valueToDeg(this.state.value);


        return (

            <div className={'knob-surround ' + this.props.size} onMouseDown={this.onMouseDown} >
            <div
            className="knob"
            style={{
                transform: `rotate(${rdeg}deg)`
            }}
            >
            </div>

            <span>{this.props.label}</span>

            </div>
        )
    }
});

export default Knob;
