import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'
import flush from 'styled-jsx/server'

export default class MainDocument extends Document {
  static getInitialProps ({ renderPage }) {
    const { html, head, errorHtml, chunks } = renderPage()
    const styles = flush()
    return { html, head, errorHtml, chunks, styles }
  }

  render () {
    return (
      <html>
        <Head>
          <link rel='stylesheet' href='/static/css/font-awesome/css/font-awesome.css' />
          <link rel='stylesheet' href='/static/css/bulma.css' />
        </Head>
        <body>
          {this.props.customValue}
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
