
import Oscilator from './oscilator.js';
import Envelope from './envelope.js';
import Filter from './filter.js';

class Voice {
    constructor(ctx, dst, signature, preset) {
        this.context = ctx;
        this.preset = preset;

        this.createNodes(dst);
        this.setPreset(preset);
        this.startEnv();
        this.startOsc(signature);
    }

    isFinished(){
        if(this.env1.finished == true){
            this.mainGain.disconnect();
            return true;
        }
        return false;
    }

    updatePreset(p){
        this.setPreset(p);
    }

    createNodes(dst){
        let ctx = this.context;

        this.envGain = ctx.createGain();

        this.osc1 = new Oscilator(ctx,this.envGain);
        this.osc2 = new Oscilator(ctx,this.envGain);
        this.osc3 = new Oscilator(ctx,this.envGain);

        this.mainGain = ctx.createGain();

        //this.envGain.connect(this.mainGain);
        this.filt1 = new Filter(ctx, this.envGain, this.mainGain);

        this.env1 = new Envelope(ctx, this.envGain.gain, this.preset.envelopes.env1);

        this.mainGain.connect(dst);
    }

    setPreset(p){
        this.preset = p;

        //osc
        this.osc1.setPreset(p.osc.osc1);
        this.osc2.setPreset(p.osc.osc2);
        this.osc3.setPreset(p.osc.osc3);

        this.filt1.setPreset(p.filters.filt1);
    }

    startEnv(){
        this.env1.start();
    }

    startOsc(signature){
        this.osc1.start(signature);
        this.osc2.start(signature);
        this.osc3.start(signature);
    }

    finish(){
        this.env1.finish();
    }
}


export default Voice;
