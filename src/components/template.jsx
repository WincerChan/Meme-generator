import React, { Component } from 'react';
import SEO from './seo';
import Navbar from './Navbar'
import GIF from 'gif.js';
import omggif from 'omggif';
import Footer from './footer'

const Vendors = 'https://cdn.jsdelivr.net/gh/wincerchan/Meme-generator@0.3/public',
    messages = [
        <p>服务器在国外，加载图片在晚上高峰期可能会很慢；</p>,
        <p>由于下载采用了<a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Blob" rel="noopener noreferrer" target="_blank">Blob</a> 协议，故仅新版 Chrome、Firefox、Opera、Edge 支持下载，其它浏览器请点击预览后右击保存。</p>
    ];

class Progress extends Component {
    render() {
        if (this.props.show)
            return (<progress className="progress is-success" id="progress" value={this.props.value} max="100" />)
        else
            return (<progress className="progress is-success" id="progress" style={{ opacity: 0 }} />)
    }
}

class Notification extends Component {
    render() {
        if (this.props.show)
            return (
                <div id="success-notification" className="notification is-success">
                    生成完毕。
            </div>
            )
        else
            return (
                null
            )
    }
}

class Template extends Component {
    constructor(props) {
        super(props)
        this.finished = true;
        this.gifInfo = this.props.element;
        this.state = {
            showProgressBar: false,
            showNotification: false,
            progressNum: 0,
        }
    }
    displayBar = () => {
        this.setState({ showProgressBar: true })
    }
    createWorkers = async (info) => {
        const tmpWorker = await fetch(Vendors + '/gif.worker.js'),
            workerSrcBlob = new Blob([await tmpWorker.text()], { type: 'text/javascript' }),
            workerBlobURL = window.URL.createObjectURL(workerSrcBlob);

        this.gif = new GIF({
            workerScript: workerBlobURL,
            workers: 3,
            quality: 16,
            width: info.width,
            height: info.height,
        })

    }

    renderGif = () => {
        this.gif.render();
        this.gif.on('progress', progress => {
            this.setState({ progressNum: 100 * progress });
            this.finished = false;
        })
        this.gif.on('finished', blob => {
            this.finished = true;
            const img = this.refs.gifMeme;
            window.gifUrl = window.URL.createObjectURL(blob);
            img.src = window.gifUrl;
            this.hideBar()
            if (this.download) {
                this.downGif()
            }
        })
    }

    hideBar = () => {
        this.setState({ showProgressBar: false, showNotification: true })
        setTimeout(() => {
            this.setState({ showNotification: false })
        }, 1666);
    }

    downGif = () => {
        let a = document.createElement('a');
        a.href = window.gifUrl;
        a.download = 'meme.gif';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    createGif = async () => {
        this.finished = false;
        const tmp = await fetch(Vendors + this.gifInfo.gif),
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

    createCanvasContext = (width, height) => {
        const canvas = document.createElement('canvas');
        [canvas.width, canvas.height] = [width, height]
        const ctx = canvas.getContext('2d');
        ctx.font = "16px 'Microsoft YaHei', sans-serif";
        [ctx.textAlign, ctx.textBaseline] = ['center', 'bottom'];
        [ctx.fillStyle, ctx.strokeStyle] = ['white', 'black'];
        [ctx.lineWidth, ctx.lineJoin] = [3, 'round'];
        return [canvas, ctx];
    }

    drawCaptions = (info, frameInfo) => {
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

    drawFrame = (info) => {
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


    generating = async (download) => {
        this.setState({ progressNum: 0 })
        if (!this.finished) {
            return
        }
        this.download = download;
        this.displayBar();
        const info = await this.createGif();
        await this.createWorkers(info);
        this.drawFrame(info);
        this.renderGif()
    }

    render() {
        return (
            <>
                <Navbar />
                <section className="section container">
                    <SEO title={this.props.element.name} />
                    <h1 className="title">Meme</h1>
                    <p className="subtitle">——{this.props.element.name}</p>
                    <hr />
                    <div id="contentWjz">
                        <img src={Vendors + this.props.element.gif} id="gifMeme" alt="meme" ref="gifMeme" />
                    </div>
                    <Notification show={this.state.showNotification}
                        onClick={() => { this.setState({ showNotification: false }) }} />
                    {
                        this.props.element.config.map((sentence, index) =>
                            <div className="field" key={index}>
                                <label className="label">第 {index + 1} 句：</label>
                                <div className="control">
                                    <input className="input is-info sentence" type="text" placeholder={sentence.default} />
                                </div>
                            </div>)
                    }
                    <div className="button-width">
                        <button id="preview"
                            className="button is-link is-outlined"
                            onClick={() => { this.generating(false) }}>戳我预览</button>
                        <button id="download"
                            className="button is-link is-outlined"
                            onClick={() => { this.generating(true) }}>戳我下载</button>
                    </div>
                    <Progress show={this.state.showProgressBar} value={this.state.progressNum} />
                    <article className="message is-warning content">
                        <div className="message-body">
                            <p>Tips:</p>
                            <ol className="message-text">
                                {messages.map((msg, i) => <li key={i}>{msg}</li>)}
                            </ol>
                        </div>
                    </article>
                </section>
                <Footer />
            </>
        )
    }
}
export { Vendors, Template }