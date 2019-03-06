import globals from './globals.js'

class Envelope {
  // As the envelopes cannot change during a voice execution, we set it at constructor time
  constructor(ctx, target) {
    this.context = ctx
    this.target = target

    // Create a costant source of value 1.0
    {
      let channels = 2
      // Create an empty two second stereo buffer at the
      // sample rate of the AudioContext
      let frameCount = ctx.sampleRate * 2

      let myArrayBuffer = ctx.createBuffer(channels, frameCount, ctx.sampleRate)

      for (let channel = 0; channel < channels; channel++) {
        // This gives us the actual ArrayBuffer that contains the data
        let nowBuffering = myArrayBuffer.getChannelData(channel)
        for (let i = 0; i < frameCount; i++) {
          // audio needs to be in [-1.0; 1.0]
          nowBuffering[i] = 1.0
        }
      }

      this.source = ctx.createBufferSource()
      // set the buffer in the AudioBufferSourceNode
      this.source.buffer = myArrayBuffer

      this.source.loop = true
      this.source.start()
    }

    this.gain = ctx.createGain()
    this.gain.gain.value = 0

    this.source.connect(this.gain)

    this.gain.connect(target)

    this.createAnalizerToGetValue(this.gain)
  }

  destroy() {
    this.source.stop(0)
    this.source.disconnect()
    this.analyser.disconnect()
    this.gain.disconnect()
  }

  createAnalizerToGetValue(src) {
    let analyser = this.context.createAnalyser()
    analyser.fftSize = 32

    src.connect(analyser)
    this.analyser = analyser
  }

  getCurrentValue() {
    let bufferLength = this.analyser.frequencyBinCount
    let dataArray = new Float32Array(bufferLength)
    this.analyser.getFloatTimeDomainData(dataArray)
    let ret = dataArray[bufferLength - 1]
    if (ret == null || isNaN(ret)) {
      return 0
    } else {
      return ret
    }
  }

  setPreset(preset) {
    this.preset = preset
  }

  trigger() {
    let p = this.preset
    let now = this.context.currentTime
    let target = this.gain.gain
    // env1
    let v = this.getCurrentValue()
    target.cancelScheduledValues(now)
    target.setValueAtTime(v, now)
    target.linearRampToValueAtTime(1, now + p.a)
    target.exponentialRampToValueAtTime(p.s + globals.EXPZERO, now + p.a + p.d)
  }

  end(hard) {
    let p = this.preset
    let now = this.context.currentTime
    let target = this.gain.gain

    if (p == null || hard === true) {
      target.cancelScheduledValues(now)
      target.linearRampToValueAtTime(0, now + globals.TIMEZERO)
      return
    }

    let v = this.getCurrentValue()
    target.cancelScheduledValues(now)
    // Here we need the current value, as of now I have no way to obtain it, so we aprox:
    target.setValueAtTime(v, now)
    target.linearRampToValueAtTime(globals.EXPZERO, now + p.r)
    target.linearRampToValueAtTime(0, now + p.r + globals.TIMEZERO) // this is to set the value to 0
  }
}

export default Envelope
