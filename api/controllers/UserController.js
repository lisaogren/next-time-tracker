/**
 * UserController
 *
 * @description :: Server-side logic for managing user
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

/* globals sails User */

const get = require('lodash/get')
const merge = require('lodash/merge')
const _super = require('sails-auth/api/controllers/UserController')

const { validation, passport } = sails.services

const controller = {
  me (req, res) {
    const id = get(req.session, 'user.id')

    if (!id) return res.ok(null)

    User.findOne({ id })
      .populate('entries')
      .populate('validations')
      .then(user => res.ok(user))
      .catch(() => res.ok(null))
  },

  create (req, res) {
    passport.protocols.local.register(req.body, function (err, user) {
      if (err) return res.negotiate(err)

      validation.send(user, (err) => {
        if (err) return res.negotiate(err)

        res.ok(user)
      })
    })
  }
}

module.exports = merge(_super, controller)
