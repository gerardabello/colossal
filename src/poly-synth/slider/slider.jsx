import React from 'react';
var ReactDOM = require('react-dom');

import './slider.scss';

import Maps from '../../maps.js';


var Slider = React.createClass({
    componentWillUpdate: function() {
    },
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
        return this.reverseLaw(nextState.value) !== this.state.value;
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


    onMouseDown(e){
        this.setState({dragPoint: [e.screenX, e.screenY], dragging: true, dragStartValue: this.state.value});
    },

    handleMoveAll: function(e) {
        if(this.state.dragging){
            let value = this.state.dragPoint[1] - e.screenY;
            value /= (this.height-this.knobheight); //scale
            this.handleChange(this.state.dragStartValue + value);
        }
    },

    handleMouseUp: function(){
        this.setState({dragging: false});
    },
    componentWillMount(){

    },
    componentDidMount: function() {
        window.addEventListener('mousemove', this.handleMoveAll);
        window.addEventListener('mouseup', this.handleMouseUp);

        var dom = ReactDOM.findDOMNode(this);

        this.height = dom.clientHeight;
        this.knobheight = dom.children[0].clientHeight;

        this.forceUpdate();
    },

    render() {
        return (

            <div className="slider" >
            <div
            className="knob"
            onMouseDown={this.onMouseDown}
            style={{
                transform: 'translateY(' + (1-this.state.value)*(this.height-this.knobheight) + 'px)'
            }}
            >
            </div>



            </div>
        )
    }
});

export default Slider;
