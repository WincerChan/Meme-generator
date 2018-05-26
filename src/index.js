import React from 'react';
import ReactDOM from 'react-dom';
import 'bulma/css/bulma.css'
import './index.css';
import Navbar from './Navbar';
import Footer from './Footer';
import Section from './single/Section';
import registerServiceWorker from './registerServiceWorker';
import { __main } from './single/pngRender.js';

ReactDOM.render(<div id="root">
    <Navbar />
    <Section />
    <Footer />
</div>, document.body);

__main();
registerServiceWorker();