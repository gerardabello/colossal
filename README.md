# Colossal
Substractive synth using Webaudio API and React

## Demo
[DEMO](https://colossal.surge.sh)

## Screenshot
![screenshot](screenshot.png)

## How it works
Colossal can work in polysynth or monosynth modes.

Each voice has this structure:

```
OSC --
      |--> Mixer --> Filter --> Gain --> Output
OSC --                 ^          ^
                       |          |
                    Envelope   Envelope 
```
