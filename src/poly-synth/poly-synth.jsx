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
        mix: 0.5205479452054795,
        osc1: {
            mode: 'POLY',
            wave : {
                shape: 0.19799999999999995,
            },
            detune: 0,
            octave: 0,
        },
        osc2: {
            wave : {
                shape: -1,
            },
            detune: 0.006,
            octave: 0,
        },
    },
    filters: {
        filt1: {
            type: 'lowpass',
            freq: 629.8005165823422,
            q: 9.733996000000001,
            gain: 1,
            key: 1,
            envgain: 10000,
            env: {
                a: 0,
                d: 1.1956050000000003,
                s: 0.00001,
                r: 0,
            },
        },
    },
    envelopes: {
        env1: {
            a: 0.012,
            d: 2.1,
            s: 0.000001,
            r: 2.1,
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
                <div className="oscillators">
                    <div className="subsection vertical">
                        <div className="osc section">
                            <h2>OSC1</h2>
                            <Selector values={['MONO','POLY']} valueLink={Binder.bindToState(this,'preset', 'osc.osc1.mode')}/>
                            <div className="subsection horitzontal">
                                <Knob label="SHAPE" small={true} min={-1} max={1} law="linear" valueLink={Binder.bindToState(this,'preset', 'osc.osc1.wave.shape')}/>
                                <Knob label="DETUNE" small={true} min={-1} max={1} law="linear" valueLink={Binder.bindToState(this,'preset', 'osc.osc1.detune')}/>
                            </div>
                        </div>
                        <div className="osc section">
                            <h2>OSC2</h2>
                            <div className="subsection horitzontal">
                                <Knob label="SHAPE" small={true} min={-1} max={1} law="linear" valueLink={Binder.bindToState(this,'preset', 'osc.osc2.wave.shape')}/>
                                <Knob label="DETUNE" small={true} min={-1} max={1} law="linear" valueLink={Binder.bindToState(this,'preset', 'osc.osc2.detune')}/>
                            </div>
                        </div>
                    </div>
                    <Slider min={0} max={1} law="linear" valueLink={Binder.bindToState(this,'preset', 'osc.mix')}/>
                </div>
                <div className=" filt1 section">

                    <Selector values={['lowpass','highpass','bandpass','lowshelf','highshelf','peaking','notch','allpass']} valueLink={Binder.bindToState(this,'preset', 'filters.filt1.type')}/>

                    <div className="subsection horitzontal">
                        <Knob label="FREQ" min={20} max={22050} law="log" valueLink={Binder.bindToState(this,'preset', 'filters.filt1.freq')}/>
                        <Knob label="Q" min={1} max={20} law="pow" valueLink={Binder.bindToState(this,'preset', 'filters.filt1.q')}/>
                        <Knob label="GAIN" min={-20} max={20} law="pow" valueLink={Binder.bindToState(this,'preset', 'filters.filt1.gain')}/>
                        <Knob label="KEY" min={0} max={1} law="linear" valueLink={Binder.bindToState(this,'preset', 'filters.filt1.key')}/>
                    </div>

                    <div className="subsection horitzontal">
                        <Knob label="ENV" small={true} min={-10000} max={10000} law="liner" valueLink={Binder.bindToState(this,'preset', 'filters.filt1.envgain')}/>
                        <Knob label="A" small={true} min={0} max={10} law="pow" valueLink={Binder.bindToState(this,'preset', 'filters.filt1.env.a')}/>
                        <Knob label="D" small={true} min={0} max={10} law="pow" valueLink={Binder.bindToState(this,'preset', 'filters.filt1.env.d')}/>
                        <Knob label="S" small={true} min={0} max={1} law="pow" valueLink={Binder.bindToState(this,'preset', 'filters.filt1.env.s')}/>
                        <Knob label="R" small={true} min={0} max={10} law="pow" valueLink={Binder.bindToState(this,'preset', 'filters.filt1.env.r')}/>
                    </div>
                </div>

                <div className="env section">
                    <h2>AMP ENVELOPE</h2>
                    <div className="subsection horitzontal">
                        <Knob label="ATTACK" min={0} max={10} law="pow" valueLink={Binder.bindToState(this,'preset', 'envelopes.env1.a')}/>
                        <Knob label="DECAY" min={0} max={10} law="pow" valueLink={Binder.bindToState(this,'preset', 'envelopes.env1.d')}/>
                        <Knob label="SUSTAIN" min={0} max={1} law="pow" valueLink={Binder.bindToState(this,'preset', 'envelopes.env1.s')}/>
                        <Knob label="RELEASE" min={0} max={10} law="pow" valueLink={Binder.bindToState(this,'preset', 'envelopes.env1.r')}/>
                    </div>
                </div>
            </div>
        );
    }
});

export default PolySynth;
