'use strict';

import Maps from '../maps.js';
import Voice from './voice.js';

import React from 'react';
var Octavian = require('octavian');
import Knob from './knob/knob.jsx';

import Binder from 'react-binding';

import './poly-synth.scss';

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
            d: 0.4,
            s: 0.9,
            r: 1.0
        }
    }
}

var PolySynth = React.createClass({
    getInitialState: function() {
        return {notes:{}, preset: initialPreset};
    },
    componentDidMount: function() {
        this.voices = [];
    },
    //HANDLERS
    startVoice(signature){
        let n = this.state.notes;
        //if we are already actively playing a note, ignore this
        if(n[signature]){return;}
        let v = new Voice(this.props.ctx, this.props.dstNode,signature, this.state.preset);
        n[signature] = v;
        this.voices.push(v);
        this.setState({ notes: n});
    },
    stopVoice(signature){
        if(this.state.notes[signature]){
            //This makes the voice enter in the release state. We delete it from the notes state, meaning that this note is not actively playing. We keep a reference of it in the this.voices, where we will delete it when the voice itself tells us it has finished.
            this.state.notes[signature].finish();
            delete this.state.notes[signature];
        }
    },
    componentWillUpdate(nextProps, nextState){
        //remove finished voices
        for(let i = 0; i < this.voices.length; i++){
            if(this.voices[i].finished == true){
                this.voices.splice(i, 1);
            }
        }
        for(let i = 0; i < this.voices.length; i++){
            this.voices[i].updatePreset(nextState.preset);
        }
    },
    //RENDER
    render: function() {
        return (
            <div id="poly-synth">
                <div id="osc">
                    <div id="osc1" className="section">
                        <h2>OSC1</h2>
                        <div className="knob-label-container">
                            <Knob min={0} max={1} law="pow" valueLink={Binder.bindToState(this,"preset", "osc.osc1.gain")}/>
                            <span>GAIN</span>
                        </div>
                    </div>
                    <div id="osc2" className="section">
                        <h2>OSC2</h2>
                        <div className="knob-label-container">
                            <Knob min={0} max={1} law="pow" valueLink={Binder.bindToState(this,"preset", "osc.osc2.gain")}/>
                            <span>GAIN</span>
                        </div>
                    </div>
                    <div id="osc3" className="section">
                        <h2>OSC3</h2>
                        <div className="knob-label-container">
                            <Knob min={0} max={1} law="pow" valueLink={Binder.bindToState(this,"preset", "osc.osc3.gain")}/>
                            <span>GAIN</span>
                        </div>
                    </div>
                </div>
                <div id="env" className="section">

                    <div className="knob-label-container">
                    <Knob min={1e-4} max={10} law="pow" valueLink={Binder.bindToState(this,"preset", "envelopes.env1.a")}/>
                        <span>ATTACK</span>
                    </div>

                    <div className="knob-label-container">
                        <Knob min={1e-4} max={5} law="pow" valueLink={Binder.bindToState(this,"preset", "envelopes.env1.d")}/>
                        <span>DECAY</span>
                    </div>

                    <div className="knob-label-container">
                        <Knob min={1e-4} max={1} law="pow" valueLink={Binder.bindToState(this,"preset", "envelopes.env1.s")}/>
                        <span>SUSTAIN</span>
                    </div>

                    <div className="knob-label-container">
                        <Knob min={1e-4} max={5} law="pow" valueLink={Binder.bindToState(this,"preset", "envelopes.env1.r")}/>
                        <span>RELEASE</span>
                    </div>

                </div>
            </div>
        )
    }
});

export default PolySynth;
