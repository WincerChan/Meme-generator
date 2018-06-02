import omggif from 'omggif';
import React, { Component } from 'react';
import GIF from 'gif.js';
import { fadeIn, fadeOut } from './anime';
import { Vendors } from '../Section';

class GifRender extends Component {
    constructor(props) {
        super(props);
        this.finished = true;
        this.gifInfo = this.props.gifInfo;
        this.download = this.props.download;
        this.text = this.props.text;

        this.generating = this.generating.bind(this);
        this.createCanvasContext = this.createCanvasContext.bind(this);
        this.displayBar = this.displayBar.bind(this);
        this.createWorkers = this.createWorkers.bind(this);
        this.createGif = this.createGif.bind(this);
        this.drawCaptions = this.drawCaptions.bind(this);
        this.downGif = this.downGif.bind(this);
        this.renderGif = this.renderGif.bind(this);
    }
    componentDidMount() {
        this.progressBar = document.querySelector('#progress');
        this.notificationMessage = document.querySelector('#success-notification');
    }

    displayBar() {
        this.progressBar.style.opacity = 1;
        this.notificationMessage.style.display = 'none';
    }

    hideBar() {
        this.progressBar.style.opacity = 0;
        this.progressBar.value = 0;
        this.notificationMessage.style.display = 'block';
        fadeIn(this.notificationMessage);
        setTimeout(() => {
            fadeOut(this.notificationMessage);
        }, 1666);
    }

    async createWorkers(info) {
        var tmpWorker = await fetch(Vendors + '/gif.worker.js');
        var workerSrcBlob = new Blob([await tmpWorker.text()], { type: 'text/javascript' }),
            workerBlobURL = window.URL.createObjectURL(workerSrcBlob);
        this.gif = new GIF({
            workerScript: workerBlobURL,
            workers: 3,
            quality: 16,
            width: info.width,
            height: info.height,
        });
    }

    createCanvasContext(width, height) {
        let canvas = document.createElement('canvas');
        [canvas.width, canvas.height] = [width, height]
        let ctx = canvas.getContext('2d');
        ctx.font = "16px 'Microsoft YaHei', sans-serif";
        [ctx.textAlign, ctx.textBaseline] = ['center', 'bottom'];
        [ctx.fillStyle, ctx.strokeStyle] = ['white', 'black'];
        [ctx.lineWidth, ctx.lineJoin] = [3, 'round'];
        return [canvas, ctx];
    }

    async createGif() {
        this.finished = false
        var tmp = await fetch(Vendors + this.gifInfo.gif),
            response = await tmp.arrayBuffer(),
            arrayBufferView = new Uint8Array(response),
            gifReader = new omggif.GifReader(arrayBufferView),
            frameZeroInfo = gifReader.frameInfo(0),
            [, ctx] = this.createCanvasContext(frameZeroInfo.width, frameZeroInfo.height);

        return {
            index: 0,
            time: 0,
            ctx: ctx,
            gifReader: gifReader,
            width: frameZeroInfo.width,
            height: frameZeroInfo.height,
            captions: document.querySelectorAll('.input.is-info.sentence'),
            pixelBuffer: new Uint8ClampedArray(frameZeroInfo.width * frameZeroInfo.height * 4),
        }
    }
    
    drawCaptions(info, frameInfo) {
        var textInfo = this.gifInfo.config[info.index];
        if (textInfo.startTime <= info.time && info.time <= textInfo.endTime) {
            var text = undefined;
            if (info.captions[info.index])
                text = info.captions[info.index].value || textInfo.default;
            else
                text = textInfo.default;
            info.ctx.strokeText(text, info.width / 2, info.height - 5, info.width);
            info.ctx.fillText(text, info.width / 2, info.height - 5, info.width);
        }
        info.time += frameInfo.delay / 100;
        if (info.time > textInfo.endTime) {
            info.index++;
        }
    }
    renderGif() {
        this.gif.render();
        this.gif.on('progress', progress => {
            this.progressBar.value = 100 * progress;
            this.finished = false;
        })
        this.gif.on('finished', blob => {
            this.finished = true;
            var img = document.querySelector('#gifMeme');
            window.gifUrl = window.URL.createObjectURL(blob);
            img.src = window.gifUrl;
            this.hideBar()
            if (this.download)
                this.downGif()
        })
    }
    downGif() {
        let a = document.createElement('a');
        a.href = window.gifUrl;
        a.download = 'meme.gif';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
    drawFrame(info) {
        for (let i = 0; i < info.gifReader.numFrames(); i++) {
            info.gifReader.decodeAndBlitFrameRGBA(i, info.pixelBuffer);
            let imageData = new window.ImageData(info.pixelBuffer, info.width, info.height);
            info.ctx.putImageData(imageData, 0, 0);

            let frameInfo = info.gifReader.frameInfo(i);
            if (info.index < this.gifInfo.config.length) {
                this.drawCaptions(info, frameInfo)
            }
            this.gif.addFrame(info.ctx, {
                copy: true,
                delay: frameInfo.delay * 10,
                dispose: -1
            })
        }
    }
    async generating() {
        console.log(this.finished)
        if (!this.finished) {
            return null;
        }
        this.displayBar();
        var info = await this.createGif();
        await this.createWorkers(info);
        this.drawFrame(info);
        this.renderGif()
    }

    render() {
        return (
            <button id={this.props.id} className="button is-link is-outlined" onClick={this.generating}>{this.text}</button>
        )
    }
}
export { GifRender };