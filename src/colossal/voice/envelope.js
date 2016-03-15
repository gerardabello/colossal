import globals from '../globals.js'

class Envelope {
    //As the envelopes cannot change during a voice execution, we set it at constructor time
    constructor(ctx, target) {
        this.context = ctx;
        this.target = target;


        //Create a costant source of value 1.0
        {
            var channels = 2;
            // Create an empty two second stereo buffer at the
            // sample rate of the AudioContext
            var frameCount = ctx.sampleRate*2;

            var myArrayBuffer = ctx.createBuffer(channels, frameCount, ctx.sampleRate);

            for (var channel = 0; channel < channels; channel++) {
                // This gives us the actual ArrayBuffer that contains the data
                var nowBuffering = myArrayBuffer.getChannelData(channel);
                for (var i = 0; i < frameCount; i++) {
                    // audio needs to be in [-1.0; 1.0]
                    nowBuffering[i] = 1.0;
                }
            }

            this.source = ctx.createBufferSource();
            // set the buffer in the AudioBufferSourceNode
            this.source.buffer = myArrayBuffer;

            this.source.loop = true;
            this.source.start();
        }


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
        target.setValueAtTime(0, now);
        target.linearRampToValueAtTime(1, now + p.a);
        target.exponentialRampToValueAtTime(p.s + globals.EXPZERO, now + p.a + p.d);
    }

    end(){
        let p = this.preset;
        let now = this.context.currentTime;
        let target = this.gain.gain;
        target.cancelScheduledValues(now);
        target.setValueAtTime(target.value, now);
        target.exponentialRampToValueAtTime(globals.EXPZERO, now + p.r);
        target.linearRampToValueAtTime(0, now + p.r + globals.TIMEZERO); //this is to set the value to 0
    }
}


export default Envelope;
