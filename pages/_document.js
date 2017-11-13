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
          <meta charSet='utf-8' />

          <title>Time Tracker</title>

          <meta name='description' content='Track your work time' />
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <meta name='theme-color' content='#00d1b2' />
          <link rel='manifest' href='manifest.json' />

          <link rel='stylesheet' href='/static/css/font-awesome/css/font-awesome.css' />
          <link rel='stylesheet' href='/static/css/bulma.css' />
          <link rel='stylesheet' href='/static/css/nprogress.css' />
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
