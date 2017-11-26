/**
 * UserController
 *
 * @description :: Server-side logic for managing timeentries
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

/* globals sails User */

const get = require('lodash/get')
const merge = require('lodash/merge')
const _super = require('sails-auth/api/controllers/UserController')

const controller = {
  me (req, res) {
    const id = get(req.session, 'user.id')

    if (!id) return res.ok(null)

    User.findOne({ id })
      .populate('entries')
      .then(user => res.ok(user))
      .catch(() => res.ok(null))
  },

  create (req, res) {
    sails.services.passport.protocols.local.register(req.body, function (err, user) {
      if (err) return res.negotiate(err)

      const to = user.email
      const subject = 'Création de compte Time Tracker'
      const html = `<h2>Bienvenue ${user.username} !</h2><p>A bientôt sur https://time-tracker.carlogren.com</p>`

      sails.services.mailgun.send({ to, subject, html }, (err) => {
        if (err) return res.negotiate(err)

        res.ok(user)
      })
    })
  }
}

module.exports = merge(_super, controller)
