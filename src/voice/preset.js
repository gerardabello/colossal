let DefaultPreset = {
    gain: 0.2,
    mode: 'POLY',
    triggerMode: 'multiple',
    glide: 0,
    glideMode: 'legato',
    osc: {
        mix: 0.5,
        osc1: {
            wave : {
                shape: 0,
            },
            detune: 0,
            octave: 0,
        },
        osc2: {
            wave : {
                shape: -1,
            },
            detune: 0,
            octave: 0,
        },
    },
    filters: {
        filt1: {
            type: 'lowpass',
            freq: 10000,
            q: 1,
            gain: 0,
            key: 1,
            envgain: 0,
            env: {
                a: 0,
                d: 0,
                s: 0,
                r: 0,
            },
        },
    },
    envelopes: {
        env1: {
            a: 0.012,
            d: 0.012,
            s: 1,
            r: 0.5,
        },
    },
};

export default DefaultPreset;
