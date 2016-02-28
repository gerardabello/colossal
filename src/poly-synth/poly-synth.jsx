'use strict';

import Maps from '../maps.js';
import Voice from './voice.js';

import React from 'react';
var Octavian = require('octavian');
import Knob from './knob/knob.jsx';


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
            gain: 0.3
        },
        osc3: {
            shape: "sine",
            gain: 0
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
    handleEnv1R(e){
        let p = this.state.preset;
        p.envelopes.env1.r = e.target.valueAsNumber;
        this.setState({preset: p});
    },
    handleChangeKnob(e){
    },
    //RENDER
    render: function() {
        return (
            <div style={ styles.root }>
                <input type="range" min="1e-2" max="10" step="0.001" value={this.state.preset.envelopes.env1.r} onChange={this.handleEnv1R}/>
                <Knob value={5} onChangeValue={this.handleChangeKnob} />
            </div>
        )
    }
});

export default PolySynth;
