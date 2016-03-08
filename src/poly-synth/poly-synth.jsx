'use strict';

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
            shape: 'sawtooth',
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
            if(this.voices[i].isFinished() == true){
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
                    <div className="subsection horitzontal">
                        <div className="subsection vertical">
                            <div id="osc1" className="section">
                                <Selector values={['sine', 'square', 'sawtooth', 'triangle']} valueLink={Binder.bindToState(this,'preset', 'osc.osc1.shape')}/>
                                <div className="knob-label-container">
                                    <Knob min={-1} max={1} law="linear" valueLink={Binder.bindToState(this,'preset', 'osc.osc1.detune')}/>
                                    <span>DETUNE</span>
                                </div>
                            </div>
                            <div id="osc2" className="section">
                                <Selector values={['sine', 'square', 'sawtooth', 'triangle']} valueLink={Binder.bindToState(this,'preset', 'osc.osc2.shape')}/>
                                <div className="knob-label-container">
                                    <Knob min={-1} max={1} law="linear" valueLink={Binder.bindToState(this,'preset', 'osc.osc2.detune')}/>
                                    <span>DETUNE</span>
                                </div>
                            </div>
                        </div>
                        <Slider min={0} max={1} law="linear" valueLink={Binder.bindToState(this,'preset', 'osc.mix')}/>
                    </div>
                    <div id="lfo" className="section">
                        LFO
                    </div>
                </div>
                <div id="filt1" className="section">

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

                <div id="env" className="section">

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
