'use strict';

import Maps from '../maps.js';
import Voice from './voice.js';

import React from 'react';
var Octavian = require('octavian');
import Knob from './knob/knob.jsx';

import Binder from 'react-binding';



let styles = {
    root:{
        background: "rgb(208, 208, 208)",
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
        if(this.state.notes[signature]){
            this.state.notes[signature].finish();
            delete this.state.notes[signature];
        }
    },
    handleEnv1R(e){
        let p = this.state.preset;
        p.envelopes.env1.r = e.target.valueAsNumber;
        this.setState({preset: p});
    },
    //RENDER
    render: function() {
        return (
            <div style={ styles.root }>
                <Knob min={1e-4} max={10} valueLink={Binder.bindToState(this,"preset", "envelopes.env1.r")}/>
                <Knob min={1e-4} max={1} valueLink={Binder.bindToState(this,"preset", "osc.osc2.gain")}/>
                <p> {this.state.preset.osc.osc2.gain} </p>
            </div>
        )
    }
});

export default PolySynth;
