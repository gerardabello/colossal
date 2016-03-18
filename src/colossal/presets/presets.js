var Presets = {
    default: {
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
    analogy: {
        name: 'Analogy',
        gain: 0.3,
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
                r: 1.5,
            },
        },
    },
    scape: {
        name: 'Scape',
        gain: 0.3,
        mode: 'MONO',
        triggerMode: 'multiple',
        glide: 0.136,
        glideMode: 'legato',
        osc: {
            mix: 0.69863,
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
                detune: -0.4,
                octave: 0,
            },
        },
        filters: {
            filt1: {
                type: 'lowpass',
                freq: 3018,
                q: 1.88,
                gain: 1,
                key: 1,
                envgain: -2100,
                env: {
                    a: 0.262,
                    d: 7.46,
                    s: 0,
                    r: 0,
                },
            },
        },
        envelopes: {
            env1: {
                a: 0.027,
                d: 3.394,
                s: 0.06,
                r: 0.59,
            },
        },
    },
    spacepad: {
        gain: 0.1,
        mode: 'POLY',
        triggerMode: 'single',
        glide: 1,
        glideMode: 'legato',
        osc: {
            mix: 0.5,
            osc1: {
                wave : {
                    shape: 0.5,
                },
                detune: -1,
                octave: 0,
            },
            osc2: {
                wave : {
                    shape: 0.4,
                },
                detune: 0.993,
                octave: 0,
            },
        },
        filters: {
            filt1: {
                type: 'lowpass',
                freq: 20000,
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
                a: 4,
                d: 0.012,
                s: 1,
                r: 4,
            },
        },
    },
};


export default Presets;
