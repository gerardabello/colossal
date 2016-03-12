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
            wave : {
                shape: 0,
            },
            detune: 0,
            octave: 0,
        },
        osc2: {
            wave : {
                shape: -1,
            },
            detune: 0,
            octave: 0,
        }
    },
    filters: {
        filt1: {
            type: 'lowpass',
            freq: 1000,
            q: 1,
            gain: 1,
            key: 0,
            env: {
                a: 0,
                d: 0,
                s: 1,
                r: 0,
            },
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
                <div className="oscillators">
                    <div className="subsection vertical">
                        <div className="osc section">
                            <h2>OSC1</h2>
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
                        <Knob label="ENV" small={true} min={-5} max={5} law="liner" valueLink={Binder.bindToState(this,'preset', 'filters.filt1.env.env')}/>
                        <Knob label="A" small={true} min={0} max={10} law="pow" valueLink={Binder.bindToState(this,'preset', 'filters.filt1.env.a')}/>
                        <Knob label="D" small={true} min={0} max={5} law="pow" valueLink={Binder.bindToState(this,'preset', 'filters.filt1.env.d')}/>
                        <Knob label="S" small={true} min={0} max={1} law="pow" valueLink={Binder.bindToState(this,'preset', 'filters.filt1.env.s')}/>
                        <Knob label="R" small={true} min={0} max={10} law="pow" valueLink={Binder.bindToState(this,'preset', 'filters.filt1.env.r')}/>
                    </div>
                </div>

                <div className="env section">
                    <h2>AMP ENVELOPE</h2>
                    <div className="subsection horitzontal">
                        <Knob label="ATTACK" min={0} max={10} law="pow" valueLink={Binder.bindToState(this,'preset', 'envelopes.env1.a')}/>
                        <Knob label="DECAY" min={0} max={5} law="pow" valueLink={Binder.bindToState(this,'preset', 'envelopes.env1.d')}/>
                        <Knob label="SUSTAIN" min={0} max={1} law="pow" valueLink={Binder.bindToState(this,'preset', 'envelopes.env1.s')}/>
                        <Knob label="RELEASE" min={0} max={10} law="pow" valueLink={Binder.bindToState(this,'preset', 'envelopes.env1.r')}/>
                    </div>
                </div>
            </div>
        );
    }
});

export default PolySynth;
