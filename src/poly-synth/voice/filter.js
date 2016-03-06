var Note = require('octavian').Note;

class Filter {
    constructor(ctx, src, dst) {
        this.context = ctx;

        this.createNodes(src, dst);
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
        let ctx = this.context;
        let now = ctx.currentTime;

        this.bqf.type = p.type;
        this.bqf.frequency.value = p.freq;
        this.bqf.Q.value = p.q;
    }

}


export default Filter;
