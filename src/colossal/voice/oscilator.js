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
            if(Math.abs(this.lastwavepreset.shape-wp.shape) < 0.05){
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

        for(let x = 1; x < n; x+=2) {
            imag[x] += (1.0*io) / (Math.PI*x);
        }

        for(let x = 2; x < n; x+=2) {
            imag[x] += (1.0*ie) / (Math.PI*x);
        }


        let wave = this.context.createPeriodicWave(real, imag);
        this.osc.setPeriodicWave(wave);
    }

    trigger(signature, glide){
        this.note = new Note(signature);
        let ctx = this.context;
        let now = ctx.currentTime;
        if(glide == null){
            glide = now;
        }
        this.osc.frequency.setValueAtTime(this.osc.frequency.value, now);
        this.osc.frequency.linearRampToValueAtTime(this.getFreq(this.note, this.preset.detune), now+glide);
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