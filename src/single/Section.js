import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Vengeful } from './static/Venge';
import { Wangjingze } from './static/Wangjingze';
import { Weisuoyuwei } from './static/Weisuoyuwei';

import { gifRender, download } from './gifRender';


var templates = [Wangjingze, Weisuoyuwei];

templates.forEach((element, i) => {
    templates[i].component = () => (
        <section className="section container" >
            <h1 className="title">Meme</h1>
            <p className="subtitle">——{element.name}</p>
            <hr />
            <div id="contentWjz">
                <img src={element.gif} id="gifMeme" alt="meme" />
            </div>
            <div id="success-notification" className="notification is-success">
                <button className="delete" onClick={() => document.querySelector('#success-notification').style.display = 'none'}></button>
                成功生成
            </div>
            {
                element.config.map((sentence, index) =>
                    <div className="field">
                        <label className="label">第 {index + 1} 句：</label>
                        <div className="control">
                            <input className="input is-info sentence" type="text" placeholder={sentence.default} />
                        </div>
                    </div>)
            }
            <div className="button-width">
                <button id="preveiw" className="button is-info is-outlined" onClick={() => gifRender(element)}>戳我预览</button>
                <button id="download" className="button is-info is-outlined" onClick={() => download(element)}>戳我下载</button>
            </div>
            <br />
            <br />
            <br />
            <article className="message is-danger content">
                <div className="message-body">
                    <p>目前预览和下载还在完善中</p>
                </div>
            </article>
        </section >
    );
})


class Section extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Route exact path="/" component={Vengeful} />
                    {templates.map(item =>
                        <Route path={item.url} component={item.component} />
                    )}
                </div>

            </Router>
        )
    }
}

export default Section;
