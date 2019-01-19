import React, { Component } from 'react';


class Footer extends Component {

    componentDidMount() {
        console.clear()
        console.log(` %c © Wincer's Meme | Date: ${new Date().toLocaleDateString()} %c https://github.com/WincerChan/Meme-generator `, "color: #fff; background-image: linear-gradient(90deg, rgb(18, 103, 144) 0%, rgb(0, 151, 167) 100%); padding:5px 1px;", "background-image: linear-gradient(90deg, rgb(18, 103, 144) 0%, rgb(194, 194, 194) 0%); padding:5px 0;")
        const s = document.createElement('script');
        s.type = 'text/javascript';
        s.async = true;
        s.innerHTML = `!function(e,t,n,a,i){var g=n.screen,o=encodeURIComponent,r=["ga=UA-101362832-2","dt="+o(a.title),"dr="+o(a.referrer),"ul="+(i.language||i.browserLanguage||i.userLanguage),"sd="+g.colorDepth+"-bit","sr="+g.width+"x"+g.height,"vp="+Math.max(a.documentElement.clientWidth,n.innerWidth||0)+"x"+Math.max(a.documentElement.clientHeight,n.innerHeight||0),"z="+ +new Date];n.__ga_img=new Image,n.__ga_img.src="https://ga.giuem.com?"+r.join("&")}(0,0,window,document,navigator,location)`;
        document.body.appendChild(s);
        document.body.removeChild(s);
    }

    render() {
        return (
            <footer className="footer">
                <div className="container">
                    <div className="content has-text-centered">
                        <p>
                            <strong>Meme </strong> by&nbsp;
                            <a target="_blank" rel="noopener noreferrer" href="https://www.itswincer.com">Wincer</a>. The source code is licensed &nbsp;
                            <a target="_blank" rel="noopener noreferrer" href="https://www.gnu.org/licenses/gpl-3.0.html">GPL 3.0</a>. The website content is licensed &nbsp;
                            <a target="_blank" rel="noopener noreferrer" href="https://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY NC SA 4.0</a>.
                        </p>
                    </div>
                </div>
            </footer>
        )
    }
}

export default Footer;