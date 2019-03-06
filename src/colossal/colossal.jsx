'use strict'

let Note = require('octavian').Note

import React from 'react'

import Binder from 'react-binding'

import Knob from './knob/knob.jsx'
import Selector from './selector/selector.jsx'
import Slider from './slider/slider.jsx'

import Voice from './voice/voice.js'

import Presets from './presets/presets.js'

let monoVoice = 'C2'

let Colossal = React.createClass({
    // SYNTH INTERFACE FUNCTIONS
  stopAllVoices (hard) {
    for (let key in this.voices) {
            // Telling the voice to end it's basic signature ensures the voice will fully end. You can end a voice with a different signature and the envelope gate does not close (used for mono).
      this.voices[key].end(this.voices[key].baseSignature, hard)
    }
  },
  startVoice (signature) {
    let voice = signature
    if (this.state.preset.mode == 'MONO') {
      voice = monoVoice
    }
    if (this.voices[voice] == null) {
      this.voices[voice] = new Voice(this.props.ctx, this.outGain)
      this.voices[voice].setPreset(this.state.preset)
    }

    this.voices[voice].trigger(signature)
  },
  stopVoice (signature) {
    let voice = signature
    if (this.state.preset.mode == 'MONO') {
      voice = monoVoice
    }
    if (this.voices[voice]) {
      this.voices[voice].end(signature)
    }
  },
  scheduleVoice (start, end, signature) {
    let voice = signature
    if (this.state.preset.mode == 'MONO') {
      voice = monoVoice
    }
    if (this.voices[signature]) {
      this.voices[voice].schedule(start, end, signature)
    }
  },
    // END SYNTH INTERFACE FUNCTIONS

  getInitialState: function () {
    return {presetname: 'default'}
  },

  destroyVoices: function () {
    for (let key in this.voices) {
      this.voices[key].destroy()
      delete this.voices[key]
    }
  },

  componentWillMount: function () {
    this.outGain = this.props.ctx.createGain()
    this.outGain.connect(this.props.dstNode)

        // this.createVoices();

    this.setPreset(this.state.presetname)
  },
  componentDidMount: function () {
    this.voices = {}
    this.setPreset(this.state.presetname)
  },
    // HANDLERS
  onChangePreset (name) {
    this.setPreset(name)
  },
  setPreset (name) {
    let p = JSON.parse(JSON.stringify(Presets[name]))
    this.setState({presetname: name, preset: p})
    this.stopAllVoices(true)
    this.destroyVoices()
  },
  componentDidUpdate (prevProps, prevState) {
    for (let key in this.voices) {
      this.voices[key].setPreset(this.state.preset)
    }
  },
    // RENDER
  render: function () {
    return (
      <div className='colossal'>
        <div className='oscillators'>
          <div className='subsection vertical'>
            <div className='osc section'>
              <h2>OSC1</h2>

              <div className='subsection horitzontal'>
                <Knob label='SHAPE' min={-1} max={1} law='linear' valueLink={Binder.bindToState(this, 'preset', 'osc.osc1.wave.shape')} />
                <Knob label='DETUNE' min={-1} max={1} law='linear' valueLink={Binder.bindToState(this, 'preset', 'osc.osc1.detune')} />
              </div>
            </div>
            <div className='osc section'>
              <h2>OSC2</h2>
              <div className='subsection horitzontal'>
                <Knob label='SHAPE' min={-1} max={1} law='linear' valueLink={Binder.bindToState(this, 'preset', 'osc.osc2.wave.shape')} />
                <Knob label='DETUNE' min={-1} max={1} law='linear' valueLink={Binder.bindToState(this, 'preset', 'osc.osc2.detune')} />
              </div>
            </div>
          </div>
          <Slider label='½' min={0} max={1} law='linear' valueLink={Binder.bindToState(this, 'preset', 'osc.mix')} />
        </div>
        <div className=' filt1 section'>

          <Selector values={['lowpass', 'highpass', 'bandpass', 'lowshelf', 'highshelf', 'peaking', 'notch', 'allpass']} valueLink={Binder.bindToState(this, 'preset', 'filters.filt1.type')} />

          <div className='subsection horitzontal center'>
            <Knob label='FREQ' min={20} max={22050} defaultValue={22050} law='log' valueLink={Binder.bindToState(this, 'preset', 'filters.filt1.freq')} />
            <Knob label='Q' min={1} max={20} law='pow' valueLink={Binder.bindToState(this, 'preset', 'filters.filt1.q')} />
            <Knob label='GAIN' min={-20} max={20} law='pow' valueLink={Binder.bindToState(this, 'preset', 'filters.filt1.gain')} />
            <Knob label='KEY' min={0} max={1} law='linear' valueLink={Binder.bindToState(this, 'preset', 'filters.filt1.key')} />
          </div>

          <div className='subsection horitzontal center'>
            <Knob label='ENV' size='small' min={-10000} max={10000} law='liner' valueLink={Binder.bindToState(this, 'preset', 'filters.filt1.envgain')} />
            <Knob label='A' size='small' min={0} max={10} law='pow' valueLink={Binder.bindToState(this, 'preset', 'filters.filt1.env.a')} />
            <Knob label='D' size='small' min={0} max={10} law='pow' valueLink={Binder.bindToState(this, 'preset', 'filters.filt1.env.d')} />
            <Knob label='S' size='small' min={0} max={1} law='pow' valueLink={Binder.bindToState(this, 'preset', 'filters.filt1.env.s')} />
            <Knob label='R' size='small' min={0} max={10} law='pow' valueLink={Binder.bindToState(this, 'preset', 'filters.filt1.env.r')} />
          </div>
        </div>

        <div className='env section'>
          <h2>AMP ENVELOPE</h2>
          <div className='subsection horitzontal'>
            <Slider label='A' min={0} max={10} law='pow' valueLink={Binder.bindToState(this, 'preset', 'envelopes.env1.a')} />
            <Slider label='D' min={0} max={10} law='pow' valueLink={Binder.bindToState(this, 'preset', 'envelopes.env1.d')} />
            <Slider label='S' min={0} max={1} law='pow' defaultValue={1} valueLink={Binder.bindToState(this, 'preset', 'envelopes.env1.s')} />
            <Slider label='R' min={0} max={10} law='pow' valueLink={Binder.bindToState(this, 'preset', 'envelopes.env1.r')} />
          </div>
        </div>

        <div className='mode section'>
          <Selector values={['MONO', 'POLY']} valueLink={Binder.bindToState(this, 'preset', 'mode')} />
        </div>
        <div className={'glide section ' + (this.state.preset.mode == 'MONO' ? '' : 'disabled')}>
          <Selector values={['multiple', 'single']} valueLink={Binder.bindToState(this, 'preset', 'triggerMode')} />
          <Selector values={['always', 'legato']} valueLink={Binder.bindToState(this, 'preset', 'glideMode')} />
          <Knob label='GLIDE' min={0} max={2} law='linear' valueLink={Binder.bindToState(this, 'preset', 'glide')} />
        </div>

        <div className='preset section'>
          <h2>PRESETS</h2>
          <Selector values={Object.keys(Presets)} value={this.state.presetname} onChange={this.onChangePreset} />
        </div>

        <div className='out section'>
          <Knob label='GAIN' defaultValue={0.4} size='big' min={0} max={2} law='pow' valueLink={Binder.bindToState(this, 'preset', 'gain')} />
        </div>

        <div className='level section' />

      </div>
    )
  }
})

export default Colossal
