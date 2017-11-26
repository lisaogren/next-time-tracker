/**
 * ValidationController
 *
 * @description :: Server-side logic for managing validations
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

/* globals sails User */

const { validation } = sails.services

module.exports = {
  resend (req, res) {
    const id = req.param('user')

    if (!id) return res.badRequest()

    User.findOne({ id })
      .then(user => {
        validation.send(user, err => {
          if (err) return res.negotiate(err)

          res.send(204)
        })
      })
      .catch(err => {
        res.negotiate(err)
      })
  },

  validate (req, res) {
    const key = req.param('key')

    validation.validate(key, (err, validated) => {
      if (err) return res.negotiate(err)

      sails.next.render(req, res, '/validate-email')
    })
  }
}
