
var Presets = [
    {
        name: 'Default',
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
    },
    {
        name: 'Analogy',
        gain: 0.4,
        mode: 'POLY',
        triggerMode: 'multiple',
        glide: 0.5,
        glideMode: 'legato',
        osc: {
            mix: 0.5205479452054795,
            osc1: {
                wave : {
                    shape: 0.19799999999999995,
                },
                detune: 0,
                octave: 0,
            },
            osc2: {
                wave : {
                    shape: -1,
                },
                detune: 0.006,
                octave: 0,
            },
        },
        filters: {
            filt1: {
                type: 'lowpass',
                freq: 629.8005165823422,
                q: 9.733996000000001,
                gain: 1,
                key: 1,
                envgain: 10000,
                env: {
                    a: 0,
                    d: 1.1956050000000003,
                    s: 0.00001,
                    r: 0,
                },
            },
        },
        envelopes: {
            env1: {
                a: 0.012,
                d: 2.1,
                s: 0.000001,
                r: 2.1,
            },
        },
    },
];


export default Presets;
