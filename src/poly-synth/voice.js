var Note = require('octavian').Note;

class Voice {
    constructor(ctx, dst, signature, preset) {
        this.context = ctx;
        this.note = new Note(signature);
        this.preset = preset;

        this.createNodes(dst);
        this.setPreset(this.preset);
        this.startOsc(this.note);


    }

    createNodes(dst){
        let ctx = this.context;

        this.osc1 = ctx.createOscillator();
        this.osc2 = ctx.createOscillator();
        this.osc3 = ctx.createOscillator();

        this.osc1Gain = ctx.createGain();
        this.osc2Gain = ctx.createGain();
        this.osc3Gain = ctx.createGain();

        this.envGain = ctx.createGain();
        this.mainGain = ctx.createGain();

        this.osc1.connect(this.osc1Gain);
        this.osc2.connect(this.osc2Gain);
        this.osc3.connect(this.osc3Gain);

        this.osc1Gain.connect(this.envGain);
        this.osc2Gain.connect(this.envGain);
        this.osc3Gain.connect(this.envGain);

        this.envGain.connect(this.mainGain);

        this.mainGain.connect(dst);
    }

    setPreset(p){
        let ctx = this.context;

        let now = ctx.currentTime;

        //osc
        this.osc1.type = p.osc.osc1.shape;
        this.osc1Gain.gain.setValueAtTime(p.osc.osc1.gain, now);

        this.osc2.type = p.osc.osc2.shape;
        this.osc2Gain.gain.setValueAtTime(p.osc.osc2.gain, now);

        this.osc3.type = p.osc.osc3.shape;
        this.osc3Gain.gain.setValueAtTime(p.osc.osc3.gain, now);

        //env1
        this.envGain.gain.cancelScheduledValues(now);
        this.envGain.gain.setValueAtTime(1e-10, now);
        this.envGain.gain.linearRampToValueAtTime(1, now + p.envelopes.env1.a);
        this.envGain.gain.exponentialRampToValueAtTime(p.envelopes.env1.s, now + p.envelopes.env1.a + p.envelopes.env1.d);
    }

    startOsc(note){
        let ctx = this.context;

        let now = ctx.currentTime;
        this.osc1.frequency.setValueAtTime(note.frequency, now);
        this.osc2.frequency.setValueAtTime(note.frequency, now);
        this.osc3.frequency.setValueAtTime(note.frequency, now);

        this.osc1.start(0);
        this.osc2.start(0);
        this.osc3.start(0);
    }

    finish(){
        let now = this.context.currentTime;
        this.mainGain.gain.cancelScheduledValues(now);
        this.mainGain.gain.setValueAtTime(this.mainGain.gain.value, now);
        this.mainGain.gain.exponentialRampToValueAtTime(1e-4, now + this.preset.envelopes.env1.r);

        setTimeout(
            function() {
                //avoid memory leak
                this.mainGain.disconnect();
            }.bind(this), 10*1000); //Todo check all envelopes for min time
        }
    }


    export default Voice;
