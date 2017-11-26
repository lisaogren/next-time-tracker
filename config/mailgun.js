module.exports.mailgun = {
  auth: {
    api_key: process.env.TIME_TRACKER_MAILGUN_API_KEY,
    domain: process.env.TIME_TRACKER_MAILGUN_DOMAIN
  },

  from: 'Time Tracker <contact@time-tracker.carlogren.com>',
  subject: 'Time Tracker',
  replyTo: 'contact@time-tracker.carlogren.com'
}
