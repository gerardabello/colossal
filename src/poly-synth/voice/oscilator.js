var Note = require('octavian').Note;

class Oscilator {
    constructor(ctx, dst) {
        this.context = ctx;

        this.createNodes(dst);
    }

    start(){
        this.osc.start(0);
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

        this.calculatePeriodicWave(p.wave);

        let ctx = this.context;
        let now = ctx.currentTime;

        if(this.note){
            this.osc.frequency.setValueAtTime(this.getFreq(this.note, this.preset.detune), now);
        }
    }

    calculatePeriodicWave(wp){

        if(this.lastwavepreset != null){
            //This is to prevent updating the wave every frame
            if(Math.abs(this.lastwavepreset.shape-wp.shape) < 0.1){
                return;
            }
        }

        this.lastwavepreset = {};
        this.lastwavepreset.shape = wp.shape;


        let ie = 0;
        let io = 0;

        let shape = wp.shape;
        if(shape<0){
            io = 1;
            ie = 1+shape;
        }else{
            io = 1-shape;
            ie = 1;
        }

        let n = 128;
        let real = new Float32Array(n);
        let imag = new Float32Array(n);

        //real[0] = 0.5;
        for(let x = 1; x < n; x+=2) {
            imag[x] = (4.0*io) / (Math.PI*x);
        }
        for(let x = 2; x < n; x+=2) {
            imag[x] = (4.0*ie) / (Math.PI*x);
        }
        /*

        for (var i = 1; i < n; i++) {
            imag[i] = 1 / (i * Math.PI);
            imag[i] = 1 / (i * Math.PI);
        }
        */

        let wave = this.context.createPeriodicWave(real, imag);
        this.osc.setPeriodicWave(wave);
    }

    trigger(signature){
        this.note = new Note(signature);
        let ctx = this.context;

        let now = ctx.currentTime;
        this.osc.frequency.setValueAtTime(this.getFreq(this.note, this.preset.detune), now);
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
