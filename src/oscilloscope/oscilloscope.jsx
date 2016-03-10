'use strict';
import React from 'react';
import ReactDOM from 'react-dom';

import Binder from 'react-binding';


import './oscilloscope.scss';


var Oscilloscope = React.createClass({
    getInitialState: function() {
        return {};
    },
    componentDidMount: function() {
        var analyser = this.props.ctx.createAnalyser();
        this.props.node.connect(analyser);

        let canvas = ReactDOM.findDOMNode(this).getElementsByClassName('canvas')[0];
        let canvasCtx = canvas.getContext("2d");

        let WIDTH = canvas.width;
        let HEIGHT = canvas.height;

        analyser.fftSize = 2048;
        var bufferLength = analyser.fftSize;
        var dataArray = new Uint8Array(bufferLength);

        canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

        function draw() {

            var drawVisual = requestAnimationFrame(draw);

            analyser.getByteTimeDomainData(dataArray);

            canvasCtx.fillStyle = 'rgb(200, 200, 200)';
            canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

            canvasCtx.lineWidth = 2;
            canvasCtx.strokeStyle = 'rgb(0, 0, 0)';

            canvasCtx.beginPath();

            var sliceWidth = WIDTH * 1.0 / bufferLength;
            var x = 0;

            for(var i = 0; i < bufferLength; i++) {

                var v = dataArray[i] / 128.0;
                var y = v * HEIGHT/2;

                if(i === 0) {
                    canvasCtx.moveTo(x, y);
                } else {
                    canvasCtx.lineTo(x, y);
                }

                x += sliceWidth;
            }

            canvasCtx.lineTo(canvas.width, canvas.height/2);
            canvasCtx.stroke();
        };

        draw();




    },
    //RENDER
    render: function() {
        return (
            <div className="oscilloscope">
                <canvas className="canvas" width="700" height="180">
                </canvas>
            </div>
        );
    }
});

export default Oscilloscope;
