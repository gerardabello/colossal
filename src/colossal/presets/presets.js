const Presets = {
  default: {
    gain: 0.2,
    mode: 'POLY',
    triggerMode: 'multiple',
    glide: 0,
    glideMode: 'legato',
    osc: {
      mix: 0.5,
      osc1: {
        wave: {
          shape: 0
        },
        detune: 0,
        octave: 0
      },
      osc2: {
        wave: {
          shape: -1
        },
        detune: 0,
        octave: 0
      }
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
          r: 0
        }
      }
    },
    envelopes: {
      env1: {
        a: 0.012,
        d: 0.012,
        s: 1,
        r: 0.5
      }
    }
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
        wave: {
          shape: 0.19799999999999995
        },
        detune: 0,
        octave: 0
      },
      osc2: {
        wave: {
          shape: -1
        },
        detune: 0.006,
        octave: 0
      }
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
          d: 1.2,
          s: 0.00001,
          r: 0.7
        }
      }
    },
    envelopes: {
      env1: {
        a: 0.012,
        d: 2.1,
        s: 0.000001,
        r: 0.8
      }
    }
  },
  analogBass: {
    name: 'Analog bass',
    gain: 0.3,
    mode: 'MONO',
    triggerMode: 'multiple',
    glide: 0.01,
    glideMode: 'legato',
    osc: {
      mix: 0.75,
      osc1: {
        wave: {
          shape: 0
        },
        detune: -1,
        octave: 0
      },
      osc2: {
        wave: {
          shape: -0.039999999999999925
        },
        detune: -0.995,
        octave: 0
      }
    },
    filters: {
      filt1: {
        type: 'lowpass',
        freq: 727.5,
        q: 1,
        gain: 1,
        key: 1,
        envgain: 8740,
        env: {
          a: 0.00081,
          d: 0.13689,
          s: 0,
          r: 0.02601
        }
      }
    },
    envelopes: {
      env1: {
        a: 0,
        d: 1.27,
        s: 0.0366,
        r: 0.14222
      }
    }
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
        wave: {
          shape: 0.19799999999999995
        },
        detune: 0,
        octave: 0
      },
      osc2: {
        wave: {
          shape: -1
        },
        detune: -0.4,
        octave: 0
      }
    },
    filters: {
      filt1: {
        type: 'lowpass',
        freq: 722,
        q: 1.88,
        gain: 1,
        key: 1,
        envgain: 3200,
        env: {
          a: 0.03,
          d: 0.26,
          s: 0,
          r: 0.22
        }
      }
    },
    envelopes: {
      env1: {
        a: 0.027,
        d: 3.394,
        s: 0.06,
        r: 0.59
      }
    }
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
        wave: {
          shape: 0.5
        },
        detune: -1,
        octave: 0
      },
      osc2: {
        wave: {
          shape: 0.4
        },
        detune: 0.993,
        octave: 0
      }
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
          r: 0
        }
      }
    },
    envelopes: {
      env1: {
        a: 4,
        d: 0.012,
        s: 1,
        r: 4
      }
    }
  },
  'square hills': {
    gain: 0.2,
    mode: 'POLY',
    triggerMode: 'multiple',
    glide: 0,
    glideMode: 'legato',
    osc: {
      mix: 0.5,
      osc1: { wave: { shape: 0 }, detune: 0.030000000000000027, octave: 0 },
      osc2: { wave: { shape: -1 }, detune: 0.02400000000000002, octave: 0 }
    },
    filters: {
      filt1: {
        type: 'highpass',
        freq: 169.564782003794,
        q: 1,
        gain: 0,
        key: 1,
        envgain: 10000,
        env: { a: 0, d: 0.06561000000000003, s: 0, r: 0.7952400000000002 }
      }
    },
    envelopes: {
      env1: { a: 0.012, d: 2.2952287855431095, s: 0, r: 0.21516113955624527 }
    }
  },
  'eastern string': {
    gain: 0.2,
    mode: 'POLY',
    triggerMode: 'multiple',
    glide: 0,
    glideMode: 'legato',
    osc: {
      mix: 0.5,
      osc1: { wave: { shape: 0.02400000000000002 }, detune: 1, octave: 0 },
      osc2: { wave: { shape: -1 }, detune: 1, octave: 0 }
    },
    filters: {
      filt1: {
        type: 'lowpass',
        freq: 3883.9970309807695,
        q: 1,
        gain: 0,
        key: 1,
        envgain: 10000,
        env: { a: 0, d: 0.06561000000000003, s: 0, r: 0.7952400000000002 }
      }
    },
    envelopes: {
      env1: {
        a: 0.006574621959237348,
        d: 0.6143618964131782,
        s: 0,
        r: 0.3919044692669402
      }
    }
  },
  'alien tongue': {
    gain: 0.2,
    mode: 'MONO',
    triggerMode: 'multiple',
    glide: 0,
    glideMode: 'legato',
    osc: {
      mix: 0.7040816326530612,
      osc1: { wave: { shape: 1 }, detune: 1, octave: 0 },
      osc2: { wave: { shape: -1 }, detune: -1, octave: 0 }
    },
    filters: {
      filt1: {
        type: 'lowpass',
        freq: 1055.3498919105455,
        q: 20,
        gain: 20,
        key: 1,
        envgain: 10000,
        env: {
          a: 0.42024999999999973,
          d: 0.45368999999999987,
          s: 0,
          r: 0.056249999999999994
        }
      }
    },
    envelopes: {
      env1: {
        a: 0.006574621959237348,
        d: 3.0864197530864192,
        s: 0,
        r: 1.9121555751606225
      }
    }
  }
}

export default Presets
