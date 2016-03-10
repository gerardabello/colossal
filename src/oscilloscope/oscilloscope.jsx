'use strict';
import React from 'react';
import ReactDOM from 'react-dom';

import Binder from 'react-binding';


import './oscilloscope.scss';

let backcolor = 'rgb(34, 56, 50)';
let lightcolor = 'rgb(132, 223, 196)';


var Oscilloscope = React.createClass({
    getInitialState: function() {
        return {};
    },
    drawTime: function(){
        var drawVisual = requestAnimationFrame(this.drawTime);

        let canvasCtx = this.canvasCtx;
        let HEIGHT = this.HEIGHT;
        let WIDTH = this.WIDTH;
        let dataArray = this.dataArray;
        let bufferLength = this.bufferLength;

        this.analyser.getByteTimeDomainData(dataArray);


        canvasCtx.fillStyle = backcolor;
        canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
        canvasCtx.shadowBlur = 10;
        canvasCtx.shadowColor = lightcolor;

        canvasCtx.lineWidth = 2;
        canvasCtx.strokeStyle = lightcolor;

        canvasCtx.beginPath();

        var sliceWidth = WIDTH * 2.0 / bufferLength;
        var x = 0;

        let startdraw = false;

        let margin = 1;
        let middle = 128;

        for(var i = margin; i < bufferLength-margin; i++) {
            if(!startdraw){
            //If we find a sample that has a positive derivative and crosses zero, we set it as a 'trigger' point and start drawing. If we find that we have already searched half the buffer just start drawing already cause we lost all hopes.
                if((dataArray[i-1] < middle && dataArray[i]>= middle) || i > bufferLength/2){
                    startdraw = true;
                }
            }

            if(startdraw){
                var v = dataArray[i] / 128.0;
                var y = v * HEIGHT/2;

                if(i === 0) {
                    canvasCtx.moveTo(x, y);
                } else {
                    canvasCtx.lineTo(x, y);
                }

                x += sliceWidth;
            }
        }

        canvasCtx.stroke();
    },
    drawFreq: function(){
        let drawVisual = requestAnimationFrame(this.drawFreq);

        let canvasCtx = this.canvasCtx;
        let HEIGHT = this.HEIGTH;
        let WIDTH = this.WIDTH;

        this.analyser.getByteFrequencyData(this.dataArray);

        canvasCtx.fillStyle = backcolor;
        canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

        canvasCtx.shadowBlur = 10;
        canvasCtx.shadowColor = lightcolor;

        var barWidth = 1;
        var barHeight;
        var x = 0;

        for(var i = 0; i < this.bufferLength; i++) {
            barHeight = this.dataArray[i];

            canvasCtx.fillStyle = lightcolor;
            canvasCtx.fillRect(x,HEIGHT-barHeight/2,barWidth,barHeight/2);

            x += barWidth;
        }
    },
    componentDidMount: function() {
        this.analyser = this.props.ctx.createAnalyser();
        this.props.node.connect(this.analyser);

        this.canvas = ReactDOM.findDOMNode(this).getElementsByClassName('canvas')[0];
        this.canvasCtx = this.canvas.getContext('2d');

        this.WIDTH = this.canvas.width;
        this.HEIGHT = this.canvas.height;

        this.analyser.fftSize = 2048;
        this.bufferLength = this.analyser.fftSize;
        this.dataArray = new Uint8Array(this.bufferLength);


        this.drawTime();


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
