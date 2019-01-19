import React from 'react'
import 'bulma/css/bulma.css'
import Navbar from "../components/Navbar";

import Layout from '../components/layout'
import SEO from '../components/seo'
import { Vengeful } from '../components/Venge'

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`Meme`, `表情包生成`, `纯 JavaScript`]} />
    <Navbar />
    <Vengeful />
  </Layout >
)

export default IndexPage
