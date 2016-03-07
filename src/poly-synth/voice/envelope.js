
class Envelope {
    //As the envelopes cannot change during a voice execution, we set it at constructor time
    constructor(ctx, target, preset) {
        this.context = ctx;
        this.target = target;
        this.preset = preset;
    }

    start(){
        let p = this.preset;
        let now = this.context.currentTime;
        //env1
        this.target.cancelScheduledValues(now);
        this.target.setValueAtTime(1e-10, now);
        this.target.linearRampToValueAtTime(1, now + p.a);
        this.target.exponentialRampToValueAtTime(p.s, now + p.a + p.d);
    }

    finish(){
        let p = this.preset;
        let now = this.context.currentTime;
        let v = this.target.value;
        this.target.cancelScheduledValues(now);
        this.target.setValueAtTime(v, now);
        this.target.exponentialRampToValueAtTime(1e-4, now + p.r);

        setTimeout(
            function() {
                this.finished = true;
            }.bind(this), 10*1000  //Todo check all envelopes for min time
        );
    }
}


export default Envelope;
