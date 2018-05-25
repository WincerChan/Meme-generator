import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Vengeful, imgCaption, messages } from './static/Venge';
import { Wangjingze } from './static/Wangjingze';
import { Weisuoyuwei } from './static/Weisuoyuwei';

var templates = [Wangjingze, Weisuoyuwei];

templates.forEach((element, i) => {
    templates[i].component = () => (
        <section className="section container" >
            <h1 className="title">Meme</h1>
            <p className="subtitle">——{element.name}</p>
            <hr />
            <div id="contentWjz">
                <video width="400px" className="video" src={element.video} controls="controls" muted="muted" autoPlay="autoplay" loop="loop">
                </video>
            </div>
            {
                element.config.map((sentence, index) =>
                    <div className="field">
                        <label className="label">第 {index + 1} 句：</label>
                        <div class="control">
                            <input className="input is-info sentence" type="text" placeholder={sentence.default} />
                        </div>
                    </div>)
            }
            <div className="button-width">
                <button id="preveiw" className="button is-info is-outlined">戳我预览</button>
                <button id="download" className="button is-info is-outlined">戳我下载</button>
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
