
class Voice {
  constructor(ctx, dst, freq, attackTime, maxGain, sustainTime, sustainGain, decayTime) {
      this.ctx = ctx;
      let now = ctx.currentTime;
      let osc = ctx.createOscillator();
      osc.frequency.setValueAtTime(freq, now);

      let gain = ctx.createGain();
      this.gain = gain;

      osc.connect(gain);
      gain.connect(dst);

//Set envelope
      now = ctx.currentTime;
      gain.gain.cancelScheduledValues(now);
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(maxGain, now + attackTime);
      gain.gain.exponentialRampToValueAtTime(sustainGain, now + attackTime + sustainTime);

      this.decayTime = decayTime

      osc.start(0);
  }

  finish(){
      let now = this.ctx.currentTime;
      this.gain.gain.cancelScheduledValues(now);
      this.gain.gain.exponentialRampToValueAtTime(0.001, now + this.decayTime);

      setTimeout(
        function() {
            this.gain.disconnect();
      }, this.decayTime*1000);
  }
}


export default Voice;
