
class Envelope {
    //As the envelopes cannot change during a voice execution, we set it at constructor time
    constructor(ctx, target) {
        this.context = ctx;
        this.target = target;

        var channels = 2;
        // Create an empty two second stereo buffer at the
        // sample rate of the AudioContext
        var frameCount = ctx.sampleRate*2;

        var myArrayBuffer = ctx.createBuffer(channels, frameCount, ctx.sampleRate);

        for (var channel = 0; channel < channels; channel++) {
            // This gives us the actual ArrayBuffer that contains the data
            var nowBuffering = myArrayBuffer.getChannelData(channel);
            for (var i = 0; i < frameCount; i++) {
                // Math.random() is in [0; 1.0]
                // audio needs to be in [-1.0; 1.0]
                nowBuffering[i] = 1.0;
            }
        }

        this.source = ctx.createBufferSource();
        // set the buffer in the AudioBufferSourceNode
        this.source.buffer = myArrayBuffer;

        this.source.loop = true;
        this.source.start();


        this.gain = ctx.createGain();
        this.gain.gain.value=0;

        this.source.connect(this.gain);

        this.gain.connect(target);


    }


    setPreset(preset){
        this.preset = preset;
    }

    trigger(){
        let p = this.preset;
        let now = this.context.currentTime;
        let target = this.gain.gain;
        //env1
        target.cancelScheduledValues(now);
        target.setValueAtTime(1e-10, now);
        target.linearRampToValueAtTime(1, now + p.a);
        target.exponentialRampToValueAtTime(p.s, now + p.a + p.d);
    }

    end(){
        let p = this.preset;
        let now = this.context.currentTime;
        let target = this.gain.gain;
        target.cancelScheduledValues(now);
        target.setValueAtTime(target.value, now);
        target.exponentialRampToValueAtTime(1e-4, now + p.r);
        target.linearRampToValueAtTime(0, now + p.r + 0.0012); //this is to set the value to 0
    }
}


export default Envelope;
