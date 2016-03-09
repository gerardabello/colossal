
class Envelope {
    //As the envelopes cannot change during a voice execution, we set it at constructor time
    constructor(ctx, target) {
        this.context = ctx;
        this.target = target;
    }


    setPreset(preset){
        this.preset = preset
    }

    trigger(){
        let p = this.preset;
        let now = this.context.currentTime;
        //env1
        this.target.cancelScheduledValues(now);
        this.target.setValueAtTime(1e-10, now);
        this.target.linearRampToValueAtTime(1, now + p.a);
        this.target.exponentialRampToValueAtTime(p.s, now + p.a + p.d);
    }

    end(){
        let p = this.preset;
        let now = this.context.currentTime;
        let v = this.target.value;
        this.target.cancelScheduledValues(now);
        this.target.setValueAtTime(v, now);
        this.target.exponentialRampToValueAtTime(1e-4, now + p.r);
    }
}


export default Envelope;
