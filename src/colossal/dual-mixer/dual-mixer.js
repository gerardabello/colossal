import globals from '../globals.js'

class DualMixer {
    constructor(ctx, src1, src2, dst) {
        this.context = ctx;
        this.src1 = src1;
        this.src2 = src2;
        this.dst = dst;

        this.createNodes();
    }


    createNodes(){
        let ctx = this.context;

        var gain1 = ctx.createGain();
        var gain2 = ctx.createGain();
        gain1.gain.value = 0;
        gain2.gain.value = 1;


        this.src1.connect(gain1);
        this.src2.connect(gain2);

        gain1.connect(this.dst);
        gain2.connect(this.dst);

        // src is a constant source whose value is 1.
        var gainExp = ctx.createGain();
        this.gain = gainExp;
        var gainNeg = ctx.createGain();
        gainNeg.gain.value = -1;


        let src = this.createConstSrc(1.0);
        src.connect(gainExp);
        gainExp.connect(gainNeg);
        gainExp.connect(gain1.gain);
        gainNeg.connect(gain2.gain);


    }

    exponentialRampToValueAtTime(value, time){
        this.gain.gain.exponentialRampToValueAtTime(value + globals.EXPZERO, time);
    }


    createConstSrc(value){
        var channels = 2;
        // Create an empty two second stereo buffer at the
        // sample rate of the AudioContext
        var frameCount = this.context.sampleRate*2;

        var myArrayBuffer = this.context.createBuffer(channels, frameCount, this.context.sampleRate);

        for (var channel = 0; channel < channels; channel++) {
            // This gives us the actual ArrayBuffer that contains the data
            var nowBuffering = myArrayBuffer.getChannelData(channel);
            for (var i = 0; i < frameCount; i++) {
                // Math.random() is in [0; 1.0]
                // audio needs to be in [-1.0; 1.0]
                nowBuffering[i] = value;
            }
        }

        let source = this.context.createBufferSource();
        // set the buffer in the AudioBufferSourceNode
        source.buffer = myArrayBuffer;

        source.loop = true;
        source.start();

        return source;

    }

}


export default DualMixer;
