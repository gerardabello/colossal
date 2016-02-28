import React from 'react'

import './knob.scss';


var Knob = React.createClass({
    getInitialState: function() {
        return {
            value: this.props.value,
            dragging: false,
            dragPoint: [0.0,0.0],
            dragStartValue: this.props.value,
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
            if (this.props.onChangeValue) {
                this.props.onChangeValue(this.state.value)
            }
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
