import React, { Component } from "react";
import { Link } from "gatsby";
const templates = require('./config.json')

const Title = "Meme",
    navbarItems = [
        {
            'name': '文档',
            'link': 'https://github.com/WincerChan/Meme-generator/wiki'
        },
        {
            'name': '关于',
            'link': 'https://blog.itswincer.com/posts/8575e868/'
        }
    ],
    menuName = '选择其它梗',
    sourceInfo = {
        'name': '源码',
        'link': 'https://github.com/WincerChan/Meme-generator'
    };

class Navbar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            navBarIsActive: false
        }
    }

    toggleNavbar = () => {
        this.setState((prev, props) => {
            const newState = !prev.navBarIsActive;
            return { navBarIsActive: newState };
        })
    }
    render() {
        return (
            <nav className="navbar is-spaced has-shadow is-white" aria-label="dropdown navigation">
                <div className="navbar-brand">
                    <a className="navbar-item" href="https://meme.itswincer.com">
                        {Title}
                    </a>
                    <div className={this.state.navBarIsActive ? "navbar-burger burger is-active" : "navbar-burger burger"}
                        onClick={this.toggleNavbar}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                <div className={this.state.navBarIsActive ? "navbar-menu is-active" : "navbar-menu"}>
                    <div className="navbar-start">
                        {navbarItems.map((item, i) =>
                            <a key={i} rel="noopener noreferrer" target="_blank"
                                className="navbar-item" href={item.link}>
                                {item.name}
                            </a>
                        )}
                        <div className="navbar-item has-dropdown is-hoverable">
                            <a className="navbar-link" href="/">
                                {menuName}
                            </a>
                            <div className="navbar-dropdown is-boxed">
                                {templates.map((item, i) =>
                                    <Link key={i} className="navbar-item" to={item.url}>{item.name}</Link>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="field is-grouped">
                                <p className="control">
                                    <a className="button is-link" rel="noopener noreferrer" target="_blank" href={sourceInfo.link}>
                                        <span>{sourceInfo.name}</span>
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        )
    }
}

export default Navbar;