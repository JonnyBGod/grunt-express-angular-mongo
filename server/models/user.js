
/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , crypto = require('crypto')
  , _ = require('underscore')
  , authTypes = ['linkedin', 'twitter', 'facebook', 'google', 'foursquare', 'yahoo', 'windowslive']

function isOpenAuth (that) {
    return (that.google != undefined || that.facebook != undefined || that.twitter != undefined || that.linkedin != undefined || that.foursquare != undefined || that.yahoo != undefined || that.windowslive != undefined
      && that.google.id || that.facebook.id || that.twitter.id || that.linkedin.id || that.foursquare.id || that.yahoo.id || that.windowslive.id);
}

/**
 * User Schema
 */

var UserSchema = new Schema({
  name: String,
  email: String,
  photo: String,
  hashed_password: String,
  salt: String,
  facebook: {},
  twitter: {},
  linkedin: {},
  google: {},
  foursquare: {},
  yahoo: {},
  windowslive: {}
})

/**
 * Virtuals
 */

UserSchema
  .virtual('password')
  .set(function(password) {
    this._password = password
    this.salt = this.makeSalt()
    this.hashed_password = this.encryptPassword(password)
  })
  .get(function() { return this._password })

/**
 * Validations
 */

var validatePresenceOf = function (value) {
  return value && value.length
}

// the below 4 validations only apply if you are signing up traditionally

UserSchema.path('name').validate(function (name) {
  // if you are authenticating by any of the oauth strategies, don't validate
  if (isOpenAuth(this)) return true
  return name.length
}, 'Name cannot be blank')

UserSchema.path('email').validate(function (emails) {
  // if you are authenticating by any of the oauth strategies, don't validate
  if (isOpenAuth(this)) return true
  return emails.length
}, 'Emails cannot be blank')

UserSchema.path('hashed_password').validate(function (hashed_password) {
  // if you are authenticating by any of the oauth strategies, don't validate
  if (isOpenAuth(this)) return true
  return hashed_password.length
}, 'Password cannot be blank')


/**
 * Pre-save hook
 */

UserSchema.pre('save', function(next) {
  if (!this.isNew) return next()
  if (!validatePresenceOf(this.password)
    && !isOpenAuth(this))
    next(new Error('Invalid password'))
  else
    next()
})

/**
 * Methods
 */

UserSchema.methods = {

  /**
   * Authenticate - check if the passwords are the same
   *
   * @param {String} plainText
   * @return {Boolean}
   * @api public
   */

  authenticate: function(plainText) {
    return this.encryptPassword(plainText) === this.hashed_password
  },

  /**
   * Make salt
   *
   * @return {String}
   * @api public
   */

  makeSalt: function() {
    return Math.round((new Date().valueOf() * Math.random())) + ''
  },

  /**
   * Encrypt password
   *
   * @param {String} password
   * @return {String}
   * @api public
   */

  encryptPassword: function(password) {
    if (!password) return ''
    //return crypto.createHmac('sha1', this.salt).update(password).digest('hex')
    return crypto.createHash('sha256').update(password).digest('hex');
  }
}

mongoose.model('User', UserSchema)
