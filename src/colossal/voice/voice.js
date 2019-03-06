import Oscilator from './oscilator.js'
import Envelope from './envelope.js'
import Filter from './filter.js'
import DualMixer from './dual-mixer.js'
import DefaultPreset from './preset.js'

class Voice {
  constructor(ctx, dst) {
    this.context = ctx

    this.createNodes(dst)
    this.startOsc()

    this.gate = false

    this.setPreset(DefaultPreset)
  }

  destroy() {
    this.end('', true)
    this.osc1.stop()
    this.osc2.stop()
    this.osc1.destroy()
    this.osc2.destroy()

    this.env1.destroy()
    this.filt1.destroy()
    this.mixer.destroy()

    this.mainGain.disconnect()
    this.osc1Mix.disconnect()
    this.osc2Mix.disconnect()
    this.envGain.disconnect()
  }

  trigger(signature) {
    if (!this.gate) {
      this.baseSignature = signature // We store the signature that opened the gate. In polyphony it's always the same but not in mono.
    }
    if (!this.gate || this.preset.triggerMode === 'multiple') {
      this.filt1.trigger(signature)
      this.env1.trigger()
      this.gate = true
    }

    {
      // GLIDE MODE
      let glide = 0
      if (this.preset.mode === 'MONO') {
        glide = this.preset.glide
      }
      if (this.preset.glideMode === 'legato') {
        if (this.baseSignature === signature) {
          glide = 0
        }
      }
      this.osc1.trigger(signature, glide)
      this.osc2.trigger(signature, glide)
    }
  }

  end(signature, hard) {
    // We only stop the gate if the signature that tries to stop is the one that started the gate. Only used for MONO
    if ((this.gate && signature === this.baseSignature) || hard === true) {
      this.gate = false
      this.env1.end(hard)
      this.filt1.end(hard)
    }
  }

  createNodes(dst) {
    let ctx = this.context

    this.envGain = ctx.createGain()
    this.envGain.gain.value = 0

    this.osc1Mix = ctx.createGain()
    this.osc2Mix = ctx.createGain()

    this.mixer = new DualMixer(ctx, this.osc1Mix, this.osc2Mix, this.envGain)

    this.osc1 = new Oscilator(ctx, this.osc1Mix)
    this.osc2 = new Oscilator(ctx, this.osc2Mix)

    this.mainGain = ctx.createGain()

    // this.envGain.connect(this.mainGain);
    this.filt1 = new Filter(ctx, this.envGain, this.mainGain)

    this.env1 = new Envelope(ctx, this.envGain.gain)

    this.mainGain.connect(dst)
  }

  setPreset(p) {
    this.preset = p

    // osc
    this.osc1.setPreset(p.osc.osc1)
    this.osc2.setPreset(p.osc.osc2)

    this.mixer.gain.gain.value = p.osc.mix

    this.filt1.setPreset(p.filters.filt1)
    this.env1.setPreset(p.envelopes.env1)

    this.mainGain.gain.value = p.gain
  }

  startOsc() {
    this.osc1.start()
    this.osc2.start()
  }
}

export default Voice
