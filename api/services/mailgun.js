/* globals sails */

const pick = require('lodash/pick');
const extend = require('lodash/extend')

const nodemailer = require('nodemailer')
const mailgun = require('nodemailer-mailgun-transport')

module.exports = {
  send (options, next) {
    const mailgunConfig = {
      auth: sails.config.mailgun.auth
    }

    const transport = nodemailer.createTransport(
      mailgun(mailgunConfig)
    )

    const mailOptions = getMailOptions(options)

    transport.sendMail(mailOptions, next)
  }
}

// Helpers
function getMailOptions (options) {
  const mailConfigKeys = ['from', 'subject', 'replyTo']

  return extend({}, pick(sails.config.mailgun, mailConfigKeys), options)
}
