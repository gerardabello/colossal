import React from 'react'
import styled from 'styled-components'

import * as R from 'ramda'

import Knob from './knob/knob.jsx'
import Selector from './selector/selector.jsx'
import Slider from './slider/slider.jsx'

import Voice from './voice/voice.js'

import Presets from './presets/presets.js'

let monoVoice = 'C2'

const backColor = '#272727'
const color = '#898989'

const Subsection = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-around;

  ${props => props.center && `align-items: center`};

  ${props => props.horitzontal && `flex-direction: row`};

  ${props => props.vertical && `flex-direction: column`};
`

const Section = styled.div`
  border: rgba(0, 0, 0, 0) 1px solid;
  display: flex;
  flex-direction: column;

  h2 {
    text-align: center;
    font-size: 26px;
    margin: 0;
    color: rgb(26, 26, 26);
    text-shadow: 0 1px 0 #3c3c3c;
  }

  ${props =>
    props.disabled &&
    `
    pointer-events:none;
    opacity: 0.3;
  `}
`

const Oscillators = styled.div`
  //self positioning
  position: absolute;
  width: 200px;
  height: 200px;

  display: flex;
  flex-direction: row;
`

const OscSection = styled(Section)`
  flex: 1;
`

const Filt1Section = styled(Section)`
  left: 200px;
  position: absolute;
  width: 300px;
  height: 200px;
`

const EnvSection = styled(Section)`
  //self positioning
  position: absolute;
  left: 500px;
  width: 250px;
  height: 200px;
`

const GlideSection = styled(Section)`
  //self positioning
  position: absolute;
  left: 751px;
  width: 100px;
  top: 42px;
  height: 160px;
`

const ModeSection = styled(Section)`
  //self positioning
  position: absolute;
  left: 751px;
  width: 100px;
  height: 40px;
`

const PresetSection = styled(Section)`
  position: absolute;
  left: 851px;
  width: 171px;
  height: 80px;
`

const OutSection = styled(Section)`
  position: absolute;
  left: 852px;
  top: 80px;
  width: 120px;
  height: 120px;
  justify-content: flex-start;
  align-items: center;
`

const Root = styled.div`
  background: ${backColor};
  color: ${color};
  height: 200px;
  width: 1024px;
  font-family: sans-serif;
  position: relative;
`

class Colossal extends React.Component {
  state = { presetname: 'default' }

  stopAllVoices = hard => {
    for (let key in this.voices) {
      // Telling the voice to end it's basic signature ensures the voice will fully end. You can end a voice with a different signature and the envelope gate does not close (used for mono).
      this.voices[key].end(this.voices[key].baseSignature, hard)
    }
  }

  startVoice = signature => {
    let voice = signature
    if (this.state.preset.mode === 'MONO') {
      voice = monoVoice
    }
    if (this.voices[voice] == null) {
      this.voices[voice] = new Voice(this.props.ctx, this.outGain)
      this.voices[voice].setPreset(this.state.preset)
    }

    this.voices[voice].trigger(signature)
  }

  stopVoice = signature => {
    let voice = signature
    if (this.state.preset.mode === 'MONO') {
      voice = monoVoice
    }
    if (this.voices[voice]) {
      this.voices[voice].end(signature)
    }
  }

  destroyVoices = () => {
    for (let key in this.voices) {
      this.voices[key].destroy()
      delete this.voices[key]
    }
  }

  componentWillMount() {
    this.outGain = this.props.ctx.createGain()
    this.outGain.connect(this.props.dstNode)

    this.setPreset(this.state.presetname)
  }

  componentDidMount() {
    this.voices = {}
    this.setPreset(this.state.presetname)
  }

  onChangePreset = name => {
    this.setPreset(name)
  }

  setPreset = name => {
    let p = JSON.parse(JSON.stringify(Presets[name]))
    this.setState({ presetname: name, preset: p })
    this.stopAllVoices(true)
    this.destroyVoices()
  }

  componentDidUpdate(prevProps, prevState) {
    for (let key in this.voices) {
      this.voices[key].setPreset(this.state.preset)
    }
  }

  setPresetPath = path => value => {
    const preset = this.state.preset
    const lens = R.lensPath(path)
    this.setState({ preset: R.set(lens, value, preset) })
    JSON.stringify(preset)
  }

  getPresetPath = path => {
    const preset = this.state.preset
    return R.path(path, preset)
  }

  render() {
    return (
      <Root>
        <Oscillators>
          <Subsection vertical>
            <OscSection>
              <h2>OSC1</h2>

              <Subsection horitzontal>
                <Knob
                  label="SHAPE"
                  min={-1}
                  max={1}
                  law="linear"
                  onChange={this.setPresetPath([
                    'osc',
                    'osc1',
                    'wave',
                    'shape'
                  ])}
                  value={this.getPresetPath(['osc', 'osc1', 'wave', 'shape'])}
                />
                <Knob
                  label="DETUNE"
                  min={-1}
                  max={1}
                  law="linear"
                  onChange={this.setPresetPath(['osc', 'osc1', 'detune'])}
                  value={this.getPresetPath(['osc', 'osc1', 'detune'])}
                />
              </Subsection>
            </OscSection>
            <OscSection>
              <h2>OSC2</h2>
              <Subsection horitzontal>
                <Knob
                  label="SHAPE"
                  min={-1}
                  max={1}
                  law="linear"
                  onChange={this.setPresetPath([
                    'osc',
                    'osc2',
                    'wave',
                    'shape'
                  ])}
                  value={this.getPresetPath(['osc', 'osc2', 'wave', 'shape'])}
                />
                <Knob
                  label="DETUNE"
                  min={-1}
                  max={1}
                  law="linear"
                  onChange={this.setPresetPath(['osc', 'osc2', 'detune'])}
                  value={this.getPresetPath(['osc', 'osc2', 'detune'])}
                />
              </Subsection>
            </OscSection>
          </Subsection>
          <Slider
            label="½"
            min={0}
            max={1}
            law="linear"
            onChange={this.setPresetPath(['osc', 'mix'])}
            value={this.getPresetPath(['osc', 'mix'])}
          />
        </Oscillators>
        <Filt1Section>
          <Selector
            values={[
              'lowpass',
              'highpass',
              'bandpass',
              'lowshelf',
              'highshelf',
              'peaking',
              'notch',
              'allpass'
            ]}
            onChange={this.setPresetPath(['filters', 'filt1', 'type'])}
            value={this.getPresetPath(['filters', 'filt1', 'type'])}
          />

          <Subsection horitzontal center>
            <Knob
              label="FREQ"
              min={20}
              max={22050}
              defaultValue={22050}
              law="log"
              onChange={this.setPresetPath(['filters', 'filt1', 'freq'])}
              value={this.getPresetPath(['filters', 'filt1', 'freq'])}
            />
            <Knob
              label="Q"
              min={1}
              max={20}
              law="pow"
              onChange={this.setPresetPath(['filters', 'filt1', 'q'])}
              value={this.getPresetPath(['filters', 'filt1', 'q'])}
            />
            <Knob
              label="GAIN"
              min={-20}
              max={20}
              law="pow"
              onChange={this.setPresetPath(['filters', 'filt1', 'gain'])}
              value={this.getPresetPath(['filters', 'filt1', 'gain'])}
            />
            <Knob
              label="KEY"
              min={0}
              max={1}
              law="linear"
              onChange={this.setPresetPath(['filters', 'filt1', 'key'])}
              value={this.getPresetPath(['filters', 'filt1', 'key'])}
            />
          </Subsection>

          <Subsection horitzontal center>
            <Knob
              label="ENV"
              size="small"
              min={-10000}
              max={10000}
              law="liner"
              onChange={this.setPresetPath(['filters', 'filt1', 'envgain'])}
              value={this.getPresetPath(['filters', 'filt1', 'envgain'])}
            />
            <Knob
              label="A"
              size="small"
              min={0}
              max={10}
              law="pow"
              onChange={this.setPresetPath(['filters', 'filt1', 'env', 'a'])}
              value={this.getPresetPath(['filters', 'filt1', 'env', 'a'])}
            />
            <Knob
              label="D"
              size="small"
              min={0}
              max={10}
              law="pow"
              onChange={this.setPresetPath(['filters', 'filt1', 'env', 'd'])}
              value={this.getPresetPath(['filters', 'filt1', 'env', 'd'])}
            />
            <Knob
              label="S"
              size="small"
              min={0}
              max={1}
              law="pow"
              onChange={this.setPresetPath(['filters', 'filt1', 'env', 's'])}
              value={this.getPresetPath(['filters', 'filt1', 'env', 's'])}
            />
            <Knob
              label="R"
              size="small"
              min={0}
              max={10}
              law="pow"
              onChange={this.setPresetPath(['filters', 'filt1', 'env', 'r'])}
              value={this.getPresetPath(['filters', 'filt1', 'env', 'r'])}
            />
          </Subsection>
        </Filt1Section>

        <EnvSection>
          <h2>AMP ENVELOPE</h2>
          <Subsection horitzontal>
            <Slider
              label="A"
              min={0}
              max={10}
              law="pow"
              onChange={this.setPresetPath(['envelopes', 'env1', 'a'])}
              value={this.getPresetPath(['envelopes', 'env1', 'a'])}
            />
            <Slider
              label="D"
              min={0}
              max={10}
              law="pow"
              onChange={this.setPresetPath(['envelopes', 'env1', 'd'])}
              value={this.getPresetPath(['envelopes', 'env1', 'd'])}
            />
            <Slider
              label="S"
              min={0}
              max={1}
              law="pow"
              defaultValue={1}
              onChange={this.setPresetPath(['envelopes', 'env1', 's'])}
              value={this.getPresetPath(['envelopes', 'env1', 's'])}
            />
            <Slider
              label="R"
              min={0}
              max={10}
              law="pow"
              onChange={this.setPresetPath(['envelopes', 'env1', 'r'])}
              value={this.getPresetPath(['envelopes', 'env1', 'r'])}
            />
          </Subsection>
        </EnvSection>

        <ModeSection>
          <Selector
            values={['MONO', 'POLY']}
            onChange={this.setPresetPath(['mode'])}
            value={this.getPresetPath(['mode'])}
          />
        </ModeSection>

        <GlideSection disabled={this.state.preset.mode !== 'MONO'}>
          <Selector
            values={['multiple', 'single']}
            onChange={this.setPresetPath(['triggerMode'])}
            value={this.getPresetPath(['triggerMode'])}
          />
          <Selector
            values={['always', 'legato']}
            onChange={this.setPresetPath(['glideMode'])}
            value={this.getPresetPath(['glideMode'])}
          />
          <Knob
            label="GLIDE"
            min={0}
            max={2}
            law="linear"
            onChange={this.setPresetPath(['glide'])}
            value={this.getPresetPath(['glide'])}
          />
        </GlideSection>

        <PresetSection>
          <h2>PRESETS</h2>
          <Selector
            values={Object.keys(Presets)}
            value={this.state.presetname}
            onChange={this.onChangePreset}
          />
        </PresetSection>

        <OutSection>
          <Knob
            label="GAIN"
            defaultValue={0.4}
            size="big"
            min={0}
            max={2}
            law="pow"
            onChange={this.setPresetPath(['gain'])}
            value={this.getPresetPath(['gain'])}
          />
        </OutSection>
      </Root>
    )
  }
}

export default Colossal
