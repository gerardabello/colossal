'use strict';

var Note = require('octavian').Note;

import React from 'react';

import Binder from 'react-binding';

import Knob from './knob/knob.jsx';
import Selector from './selector/selector.jsx';
import Slider from './slider/slider.jsx';
import './poly-synth.scss';

import Voice from './voice/voice.js';


let initialPreset = {
    gain: 0.4,
    osc: {
        mix: 0.5,
        osc1: {
            shape: 'parametric',
            parameters: {
                shape: 0,
            },
            detune: 0,
            octave: 0,
        },
        osc2: {
            shape: 'square',
            detune: 0,
            octave: 0,
        },
        lfo: {
            shape: 'sine',
            gain: 0,
        },
    },
    filters: {
        filt1: {
            type: 'lowpass',
            freq: 1000,
            q: 1,
            gain: 1,
        },
    },
    envelopes: {
        env1: {
            a: 0.012,
            d: 0.4,
            s: 0.9,
            r: 1.0,
        },
    },
};

var PolySynth = React.createClass({
    getInitialState: function() {
        return {preset: initialPreset};
    },
    componentDidMount: function() {
        this.voices = {};

        let octaves = 4;
        var note = new Note('C2');

        for (var i=0; i < octaves*12; i++) {
            let v = new Voice(this.props.ctx, this.props.dstNode, this.state.preset);
            v.updatePreset(this.state.preset);
            this.voices[note.signature] = v;
            note = note.minorSecond();
        }

    },
    //HANDLERS
    startVoice(signature){
        if(this.voices[signature]){
            this.voices[signature].trigger(signature);
        }
    },
    stopVoice(signature){
        if(this.voices[signature]){
            this.voices[signature].end();
        }
    },
    componentWillUpdate(nextProps, nextState){
        for(var key in this.voices) {
            this.voices[key].updatePreset(nextState.preset);
        }
    },
    //RENDER
    render: function() {
        return (
            <div className="poly-synth">
                <div className="osc">
                    <div className="subsection vertical">
                        <div className="osc1 section">
                            <Selector values={['parametric','sine', 'square', 'sawtooth', 'triangle']} valueLink={Binder.bindToState(this,'preset', 'osc.osc1.shape')}/>
                            <div className="knob-label-container">
                                <Knob min={-1} max={1} law="linear" valueLink={Binder.bindToState(this,'preset', 'osc.osc1.detune')}/>
                                <span>DETUNE</span>
                            </div>
                            <div className="subsection horitzontal">
                                <Knob small={true} min={-1} max={1} law="linear" valueLink={Binder.bindToState(this,'preset', 'osc.osc1.parameters.shape')}/>
                                <Knob small={true} min={0} max={1} law="linear" valueLink={Binder.bindToState(this,'preset', 'osc.osc1.parameters.io')}/>
                                <Knob small={true} min={0} max={1} law="linear" valueLink={Binder.bindToState(this,'preset', 'osc.osc1.parameters.ie')}/>
                            </div>
                        </div>
                        <div className="osc2 section">
                            <Selector values={['sine', 'square', 'sawtooth', 'triangle']} valueLink={Binder.bindToState(this,'preset', 'osc.osc2.shape')}/>
                            <div className="knob-label-container">
                                <Knob min={-1} max={1} law="linear" valueLink={Binder.bindToState(this,'preset', 'osc.osc2.detune')}/>
                                <span>DETUNE</span>
                            </div>
                        </div>
                    </div>
                    <Slider min={0} max={1} law="linear" valueLink={Binder.bindToState(this,'preset', 'osc.mix')}/>
                </div>
                <div className=" filt1 section">

                    <Selector values={['lowpass','highpass','bandpass','lowshelf','highshelf','peaking','notch','allpass']} valueLink={Binder.bindToState(this,'preset', 'filters.filt1.type')}/>

                    <div className="subsection horitzontal">
                        <div className="knob-label-container">
                        <Knob min={20} max={22050} law="log" valueLink={Binder.bindToState(this,'preset', 'filters.filt1.freq')}/>
                            <span>FREQ</span>
                        </div>

                        <div className="knob-label-container">
                            <Knob min={1} max={20} law="pow" valueLink={Binder.bindToState(this,'preset', 'filters.filt1.q')}/>
                            <span>Q</span>
                        </div>

                        <div className="knob-label-container">
                            <Knob min={-20} max={20} law="pow" valueLink={Binder.bindToState(this,'preset', 'filters.filt1.gain')}/>
                            <span>GAIN</span>
                        </div>
                    </div>
                </div>

                <div className="env section">

                    <div className="knob-label-container">
                    <Knob min={1e-4} max={10} law="pow" valueLink={Binder.bindToState(this,'preset', 'envelopes.env1.a')}/>
                        <span>ATTACK</span>
                    </div>

                    <div className="knob-label-container">
                        <Knob min={1e-4} max={5} law="pow" valueLink={Binder.bindToState(this,'preset', 'envelopes.env1.d')}/>
                        <span>DECAY</span>
                    </div>

                    <div className="knob-label-container">
                        <Knob min={1e-4} max={1} law="pow" valueLink={Binder.bindToState(this,'preset', 'envelopes.env1.s')}/>
                        <span>SUSTAIN</span>
                    </div>

                    <div className="knob-label-container">
                        <Knob min={1e-4} max={5} law="pow" valueLink={Binder.bindToState(this,'preset', 'envelopes.env1.r')}/>
                        <span>RELEASE</span>
                    </div>

                </div>
            </div>
        );
    }
});

export default PolySynth;
