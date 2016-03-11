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
            shape: 0,
            detune: 0,
            octave: 0,
        },
        osc2: {
            shape: 0,
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
            tracking: true,
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
                            <div className="subsection horitzontal">
                                <Knob label="SHAPE" small={true} min={-1} max={1} law="linear" valueLink={Binder.bindToState(this,'preset', 'osc.osc1.shape')}/>
                                <Knob label="DETUNE" small={true} min={-1} max={1} law="linear" valueLink={Binder.bindToState(this,'preset', 'osc.osc1.detune')}/>
                            </div>
                        </div>
                        <div className="osc2 section">
                            <div className="subsection horitzontal">
                                <Knob label="SHAPE" small={true} min={-1} max={1} law="linear" valueLink={Binder.bindToState(this,'preset', 'osc.osc2.shape')}/>
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
                    </div>
                </div>

                <div className="env section">
                    <Knob label="ATTACK" min={1e-4} max={10} law="pow" valueLink={Binder.bindToState(this,'preset', 'envelopes.env1.a')}/>
                    <Knob label="DECAY" min={1e-4} max={5} law="pow" valueLink={Binder.bindToState(this,'preset', 'envelopes.env1.d')}/>
                    <Knob label="SUSTAIN" min={1e-4} max={1} law="pow" valueLink={Binder.bindToState(this,'preset', 'envelopes.env1.s')}/>
                    <Knob label="RELEASE" min={1e-4} max={5} law="pow" valueLink={Binder.bindToState(this,'preset', 'envelopes.env1.r')}/>
                </div>
            </div>
        );
    }
});

export default PolySynth;
