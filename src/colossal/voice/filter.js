var Note = require('octavian').Note;


import Envelope from './envelope.js';

class Filter {
    constructor(ctx, src, dst) {
        this.context = ctx;
        this.freqOffset = 0;

        this.createNodes(src, dst);
    }

    trigger(signature){
        this.env.trigger();
        //Key tracking with base 440Hz
        this.freqOffset = (new Note(signature)).frequency - 440;
        this.setPreset(this.preset);
    }

    end(hard){
        this.env.end(hard);
    }

    updatePreset(p){
        this.setPreset(p);
    }

    createNodes(src, dst){
        let ctx = this.context;

        this.bqf = ctx.createBiquadFilter();
        src.connect(this.bqf);
        this.bqf.connect(dst);

        this.envGain = ctx.createGain();

        this.envGain.connect(this.bqf.frequency);

        this.env = new Envelope(ctx, this.envGain);
    }

    setPreset(p){
        this.preset = p;

        this.env.setPreset(p.env);
        this.envGain.gain.value = p.envgain;

        this.bqf.type = p.type;
        this.bqf.frequency.value = p.freq + (this.freqOffset * p.key);
        this.bqf.Q.value = p.q;
        this.bqf.gain.value = p.gain;
    }

}


export default Filter;
