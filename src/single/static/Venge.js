import React, { Component } from 'react';
const imgCaption = [
    '5月21日 天气 大火炉',
    <br />,
    '和富婆走丢了。'
]

const messages = [
    <p>点击文字可直接编辑；</p>,
    <p>由于下载采用了<a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Blob" target="__blank">Blob</a> 协议，故仅新版 Chrome、Firefox 支持下载，其它浏览器请点击预览后右击保存。</p>
]

const Vengeful = () => (
    <section className="section container">
        <h1 className="title">Meme</h1>
        <p className="subtitle">——这个仇我记下了</p>
        <hr />
        <div id="cntVengeful" className="is-centered">
            <canvas id="myCanvas"></canvas>
            <p contentEditable="true" className="edit">
                {imgCaption}
            </p>
        </div>
        <div className="button-width">
            <button id="preview" className="button is-info is-outlined">戳我预览</button>
            <button id="download" className="button is-info is-outlined">戳我下载</button>
        </div>
        <img src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACwAAAAAAQABAAACAkQBADs=" id="result" alt="meme" title="meme" />
        <br />
        <br />
        <br />
        <article className="message is-dark content">
            <div className="message-body">
                <p>Tips:</p>
                <ol className="message-text">
                    {messages.map(msg => <li>{msg}</li>)}
                </ol>
            </div>
        </article>
    </section>
)
export { Vengeful, imgCaption, messages }