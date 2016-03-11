var Note = require('octavian').Note;

class Filter {
    constructor(ctx, src, dst) {
        this.context = ctx;
        this.freqOffset = 0;

        this.createNodes(src, dst);
    }

    trigger(signature){
        //Key tracking with base 440Hz
        this.freqOffset = (new Note(signature)).frequency - 440;
        this.setPreset(this.preset);
    }

    updatePreset(p){
        this.setPreset(p);
    }

    createNodes(src, dst){
        let ctx = this.context;

        this.bqf = ctx.createBiquadFilter();
        src.connect(this.bqf);
        this.bqf.connect(dst);
    }

    setPreset(p){
        this.preset = p;

        this.bqf.type = p.type;
        this.bqf.frequency.value = p.freq + (p.tracking ? this.freqOffset : 0);
        this.bqf.Q.value = p.q;
        this.bqf.gain.value = p.gain;
    }

}


export default Filter;
