import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'

export default class MainDocument extends Document {
  static getInitialProps ({ renderPage }) {
    const { html, head, errorHtml, chunks } = renderPage()
    return { html, head, errorHtml, chunks }
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
