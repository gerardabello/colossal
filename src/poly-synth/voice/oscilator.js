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

        if(this.note){
            this.osc.frequency.setValueAtTime(this.getFreq(this.note, this.preset.detune), now);
        }
    }

    start(signature){
        this.note = new Note(signature);
        let ctx = this.context;

        let now = ctx.currentTime;
        this.osc.frequency.setValueAtTime(this.getFreq(this.note, this.preset.detune), now);

        this.osc.start(0);
    }


    getFreq(note, detune){
        let mod = note.modifier ? note.modifier : '';
        let notedw = new Note(note.letter + mod + (note.octave-1));
        let noteup = new Note(note.letter + mod + (note.octave+1));

        let f = note.frequency;
        if(detune > 0){
            f += (noteup.frequency - f)*detune;
        }else{
            f += (f - notedw.frequency)*detune;
        }

        return f;
    }

}


export default Oscilator;
