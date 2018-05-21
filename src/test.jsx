import React from 'react';
import ReactDOM from 'react-dom';
import createReactClass from 'create-react-class';

var CustomerFooter = createReactClass({
    render: function () {
        return (
            <div className="container">
                <div className="content has-text-centered">
                    <p>
                        <strong>Meme </strong> by&nbsp;
                        <a target="__blank" href="https://www.itswincer.com">Wincer</a>. The source code is licensed &nbsp;
                        <a target="__blank" href="https://www.gnu.org/licenses/gpl-3.0.html">GPL 3.0</a>. The website content is licensed &nbsp;
                        <a target="__blank" href="https://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY NC SA 4.0</a>.
                    </p>
                </div>
            </div>
        );
    }
});

ReactDOM.render(
    <CustomerFooter />,
    document.getElementById('CustomerFooter')
);

var Navbar = createReactClass({
    render: function () {
        return (
            <nav className="navbar is-spaced has-shadow is-white" aria-label="dropdown navigation">
                <div className="navbar-brand">
                    <a className="navbar-item" href="https://bulma.io">
                        Meme
                    </a>
                    <div className="navbar-burger burger" data-target="navbarExampleTransparentExample">
                    <span></span>
                    <span></span>
                    <span></span>
                    </div>
                </div>
                <div id="navbarExampleTransparentExample" className="navbar-menu">
                    <div className="navbar-start">
                        <a className="navbar-item" href="#">
                            教程
                        </a>
                        <div className="navbar-item has-dropdown is-hoverable">
                            <a className="navbar-link" href="/">
                                选择其它梗
                            </a>
                            <div className="navbar-dropdown is-boxed">
                                {
                                    React.Children.map(this.props.children, function (child) {
                                        return <div>{child}</div>;
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="field is-grouped">
                                <p className="control">
                                    <a className="button is-link" target="__blank" href="https://github.com/WincerChan/Meme-generator">
                                        <span>源码</span>
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
});

ReactDOM.render(
    <Navbar>
        <a className="navbar-item" href="#">请期待</a>
    </Navbar>,
    document.getElementById('Navbar')
);
var Section = createReactClass({
    render: function () {
        return (
            <section className="section container">
                <h1 className="title">Meme</h1>
                <p className="subtitle">——这个仇我记下了</p>
                <hr />
                <div id="content" className="is-centered">
                    <canvas id="myCanvas"></canvas>
                    <p contentEditable="true" className="edit">
                        5月19日 天气 大火炉
                        <br /> 明天就是520了，还是没有人和我表白。这个仇我记下了。
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
                            <li>点击文字可直接编辑；</li>
                            <li>由于下载采用了
                            <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Blob" target="__blank">Blob</a> 协议，故仅新版 Chrome、Firefox 支持下载，其它浏览器请点击预览后右击保存。
                            </li>
                        </ol>
                    </div>
                </article>
            </section>
        );
    }
});

ReactDOM.render(
    <Section />,
    document.getElementById('Section')
);