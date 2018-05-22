import React, { Component } from 'react';


class Footer extends Component {
    render() {
        return (
            <footer className="footer">
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
            </footer>
        )
    }
}

export default Footer;