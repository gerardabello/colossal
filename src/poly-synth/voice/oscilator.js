var Note = require('octavian').Note;

class Oscilator {
    constructor(ctx, dst) {
        this.context = ctx;

        this.createNodes(dst);
    }

    updatePreset(p){
        this.setPreset(p);
    }

    createNodes(dst){
        let ctx = this.context;

        this.osc = ctx.createOscillator();

        this.oscGain = ctx.createGain();

        this.osc.connect(this.oscGain);

        this.oscGain.connect(dst);
    }

    setPreset(p){
        this.preset = p;
        let ctx = this.context;

        let now = ctx.currentTime;

        //osc
        this.osc.type = p.shape;
        this.oscGain.gain.setValueAtTime(p.gain, now);
    }

    start(signature){
        this.note = new Note(signature);
        let ctx = this.context;

        let now = ctx.currentTime;
        this.osc.frequency.setValueAtTime(this.note.frequency, now);

        this.osc.start(0);
    }

}


export default Oscilator;
