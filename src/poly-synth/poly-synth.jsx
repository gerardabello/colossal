'use strict';

import React from 'react';
import Maps from '../maps.js';
import Voice from './voice.js';

var Octavian = require('octavian');

let styles = {
    root:{
        background: "rgb(60, 37, 32)",
    }
}

let initialPreset = {
    osc: {
        osc1: {
            shape: "sawtooth",
            gain: 0
        },
        osc2: {
            shape: "square",
            gain: 0
        },
        osc3: {
            shape: "sine",
            gain: 1
        }
    },
    envelopes: {
        env1: {
            a: 0.012,
            al: 1.0,
            d: 0.4,
            dl: 0.9,
            r: 1.0
        }
    }
}

var PolySynth = React.createClass({
    getInitialState: function() {
        return {notes:{}, preset: initialPreset};
    },
    componentWillReceiveProps: function(nextProps) {
    },
    //HANDLERS
    startVoice(signature){
        let v = new Voice(this.props.ctx, this.props.dstNode,signature, this.state.preset);
        let n = this.state.notes;
        n[signature] = v;
        this.setState({ notes: n});
    },
    stopVoice(signature){
        this.state.notes[signature].finish();
        delete this.state.notes[signature];
    },
    //RENDER
    render: function() {
        return (
            <div style={ styles.root }>
                <button type="button" onMouseDown={this.startVoice.bind(this,"A0")} onMouseUp={this.stopVoice.bind(this,"A0")}>Click Me!</button>
                <button type="button" onMouseDown={this.startVoice.bind(this,"A1")} onMouseUp={this.stopVoice.bind(this,"A1")}>Click Me!</button>
                <button type="button" onMouseDown={this.startVoice.bind(this,"A2")} onMouseUp={this.stopVoice.bind(this,"A2")}>Click Me!</button>
                <button type="button" onMouseDown={this.startVoice.bind(this,"A3")} onMouseUp={this.stopVoice.bind(this,"A3")}>Click Me!</button>
                <button type="button" onMouseDown={this.startVoice.bind(this,"A4")} onMouseUp={this.stopVoice.bind(this,"A4")}>Click Me!</button>
                <button type="button" onMouseDown={this.startVoice.bind(this,"A5")} onMouseUp={this.stopVoice.bind(this,"A5")}>Click Me!</button>
                <button type="button" onMouseDown={this.startVoice.bind(this,"A6")} onMouseUp={this.stopVoice.bind(this,"A6")}>Click Me!</button>
                <button type="button" onMouseDown={this.startVoice.bind(this,"A7")} onMouseUp={this.stopVoice.bind(this,"A7")}>Click Me!</button>
            </div>
        )
    }
});

export default PolySynth;
