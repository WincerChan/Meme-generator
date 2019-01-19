
import domtoimage from 'dom-to-image';
import React, { Component } from 'react'
import FileSaver from 'file-saver';
import { Vendors } from "./template";
// const Vendors = 'https://cdn.jsdelivr.net/gh/wincerchan/Meme-generator@0.3/public';

const imgCaption = [
    <p>{(new Date()).getMonth() + 1 + '月' + (new Date()).getDate() + '日 天气 大火炉'}</p>,
    <p>和富婆走丢了。</p>
],
    messages = [
        <p>点击文字可直接编辑；</p>,
        <p>点击图片可自定义上传静态图片；</p>,
        <p>由于下载采用了<a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Blob" rel="noopener noreferrer" target="_blank">Blob</a> 协议，故仅新版 Chrome、Firefox、Opera、Edge 支持下载，其它浏览器请点击预览后右击保存。</p>
    ];

class Vengeful extends Component {

    constructor(props) {
        super(props)
        this.state = {
            selectedFile: null,
            canvasHeight: 250
        }
    }

    componentDidMount() {
        // this.sourceImg = new Image();
        fetch(Vendors + '/img/example.png')
            .then(resp => resp.arrayBuffer())
            .then(img => new Blob([new Uint8Array(img)]))
            .then(imgSrcBlob => window.URL.createObjectURL(imgSrcBlob))
            .then(url => this.loadImg(url))
    }

    loadImg = (url) => {
        let drawImg = (sourceImg) => {
            const ctx = this.refs.myCanvas.getContext('2d');
            ctx.drawImage(sourceImg, 0, 0, 300, 250);
        }
        this.sourceImg = new Image();
        this.sourceImg.src = url;
        if (this.sourceImg.complete) {
            drawImg(this.sourceImg);
        }
        else {
            this.sourceImg.onload = () => {
                drawImg(this.sourceImg);
            }
            this.sourceImg.onerror = () => {
                alert('图片加载失败，请稍后重试。');
            }
        }
    }

    toPng = () => {
        domtoimage.toPng(this.refs.cnt)
            .then((dataUrl) => {
                this.refs.result.src = dataUrl;
            })
            .catch((error) => {
                console.error('oops, something went wrong!', error)
            })
    }

    toBlob = () => {
        domtoimage.toBlob(this.refs.cnt)
            .then((blob) => {
                FileSaver.saveAs(blob, 'meme.png')
            })
    }

    readImage = () => {
        if (this.state.selectedFile) {
            const FR = new FileReader();
            FR.onload = e => {
                const img = new Image();
                img.src = e.target.result;
                img.onload = async () => {
                    await this.setState({ canvasHeight: 300 * (img.height / img.width) })
                    this.refs.myCanvas.getContext('2d').drawImage(img, 0, 0, 300, this.state.canvasHeight)
                }
            }
            FR.readAsDataURL(this.state.selectedFile)
        }
    }

    handleSelectedFile = async (event) => {
        await this.setState({
            selectedFile: event.target.files[0]
        })
        this.readImage()
    }

    render() {
        return (
            <section className="section container">
                <h1 className="title">Meme</h1>
                <p className="subtitle">——这个仇我记下了</p>
                <hr />
                <div id="cntVengeful" className="is-centered" ref='cnt'>
                    <canvas id="myCanvas" ref="myCanvas"
                        height={this.state.canvasHeight}
                        onClick={() => { this.refs.fileUpload.click() }}></canvas>
                    <p contentEditable="true" className="edit">
                        {imgCaption}
                    </p>
                </div>
                <div className="button-width">
                    <button id="preview" className="button is-info is-outlined" onClick={this.toPng}>戳我预览</button>
                    <button id="download" className="button is-info is-outlined" onClick={this.toBlob}>戳我下载</button>
                </div>
                <img src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACwAAAAAAQABAAACAkQBADs=" id="result" alt="meme" title="meme" ref='result' />
                <br />
                <br />
                <br />
                <input type='file' id="fileUpload" onChange={this.handleSelectedFile} ref="fileUpload" />
                <article className="message is-warning content">
                    <div className="message-body">
                        <p>Tips:</p>
                        <ol className="message-text">
                            {messages.map(msg => <li>{msg}</li>)}
                        </ol>
                    </div>
                </article>
            </section>
        )
    }
}

export { Vengeful };
