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
        let canvasCtx = canvas.getContext('2d');

        let WIDTH = canvas.width;
        let HEIGHT = canvas.height;

        let domain = 'time';

        let backcolor = 'rgb(34, 56, 50)';
        let lightcolor = 'rgb(132, 223, 196)';

        if(domain=='time'){
            analyser.fftSize = 2048;
            let bufferLength = analyser.fftSize;
            let dataArray = new Uint8Array(bufferLength);

            canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);


            function draw() {

                var drawVisual = requestAnimationFrame(draw);

                analyser.getByteTimeDomainData(dataArray);

                canvasCtx.fillStyle = backcolor;
                canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
                canvasCtx.shadowBlur = 10;
                canvasCtx.shadowColor = lightcolor;

                canvasCtx.lineWidth = 2;
                canvasCtx.strokeStyle = lightcolor;

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
        }else if (domain=='freq'){
            analyser.fftSize = 2048;
            let bufferLength = analyser.frequencyBinCount;
            let dataArray = new Uint8Array(bufferLength);

            canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

            function draw() {
                let drawVisual = requestAnimationFrame(draw);

                analyser.getByteFrequencyData(dataArray);

                canvasCtx.fillStyle = backcolor;
                canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

                canvasCtx.shadowBlur = 10;
                canvasCtx.shadowColor = lightcolor;

                var barWidth = 1;
                var barHeight;
                var x = 0;

                for(var i = 0; i < bufferLength; i++) {
                    barHeight = dataArray[i];

                    canvasCtx.fillStyle = lightcolor;
                    canvasCtx.fillRect(x,HEIGHT-barHeight/2,barWidth,barHeight/2);

                    x += barWidth;
                }
            };

            draw();

        }


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
