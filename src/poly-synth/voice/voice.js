
import Oscilator from './oscilator.js';
import Envelope from './envelope.js';
import Filter from './filter.js';

class Voice {
    constructor(ctx, dst) {
        this.context = ctx;

        this.createNodes(dst);
        this.startOsc();

        this.gate = false;
    }

    trigger(signature){
        if(this.gate){return;}
        this.env1.trigger();
        
        this.osc1.trigger(signature);
        this.osc2.trigger(signature);

        this.filt1.trigger(signature);
        this.gate = true;
    }

    end(){
        this.env1.end();
        this.gate=false;
    }

    updatePreset(p){
        this.setPreset(p);
    }

    createNodes(dst){
        let ctx = this.context;

        this.envGain = ctx.createGain();
        this.envGain.gain.value = 0;

        this.osc1Mix = ctx.createGain();
        this.osc1Mix.connect(this.envGain);
        this.osc2Mix = ctx.createGain();
        this.osc2Mix.connect(this.envGain);

        this.osc1 = new Oscilator(ctx,this.osc1Mix);
        this.osc2 = new Oscilator(ctx,this.osc2Mix);

        this.mainGain = ctx.createGain();

        //this.envGain.connect(this.mainGain);
        this.filt1 = new Filter(ctx, this.envGain, this.mainGain);

        this.env1 = new Envelope(ctx, this.envGain.gain);

        this.mainGain.connect(dst);
    }

    setPreset(p){
        this.preset = p;

        //osc
        this.osc1.setPreset(p.osc.osc1);
        this.osc2.setPreset(p.osc.osc2);

        this.osc1Mix.gain.value = p.osc.mix;
        this.osc2Mix.gain.value = 1-p.osc.mix;

        this.filt1.setPreset(p.filters.filt1);
        this.env1.setPreset(p.envelopes.env1);

        this.mainGain.gain.value = p.gain;
    }

    startOsc(){
        this.osc1.start();
        this.osc2.start();
    }

}


export default Voice;
