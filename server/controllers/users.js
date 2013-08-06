
/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
  , User = mongoose.model('User')

exports.signin = function (req, res) {
    if (req.body != undefined && req.body.signed_request != undefined) {var fb_canvas = true;} else {var fb_canvas = false;}
    if (req.cookies.lang) {var lang = req.cookies.lang;} else {var lang = req.language;}if (!(lang in func.oc(supported_languages))) {lang = "en-GB";}var langfb = lang.replace("-", "_");
    
    res.render('index', {
        lang : lang,
        langfb : langfb,
        server_name: req.headers.host,
        user: JSON.stringify(req.user) || false
    });
}

/**
 * Auth callback
 */

exports.authCallback = function (req, res, next) {
  res.redirect('/logged')
}

/**
 * Logout
 */

exports.logout = function (req, res) {
  req.logout()
  res.redirect('/')
}

/**
 * Session
 */

exports.session = function (req, res) {
  res.redirect('/logged?ps=1')
}

/**
 * Create user
 */

exports.create = function (req, res) {
  console.log(req.body);
  
  /*user.save(function (err) {
    if (err) {
      return res.render('users/signup', { errors: err.errors, user: user })
    }
    req.logIn(user, function(err) {
      if (err) return next(err)
      return res.redirect('/')
    })
  })*/
  if (req.body.name && req.body.surname && req.body.email_register &&
    req.body.password_register == req.body.confirm_password && req.body.tos == "tos") {

    User.findOne({ emails: req.body.email_register }, function (err, user) {
      if (err) { return done(err) }
      if (!user) {
        user = new User({
            name: {
              surname: req.body.surname,
              given: req.body.name
            }
          , password: req.body.password_register
          , emails: [req.body.email_register]
        })
        if (req.session.register) {
          if (req.session.register.facebook) {
            user.facebook = {
              id: req.session.register.facebook,
              token: req.session.register.token,
              tokenSecret: req.session.register.tokenSecret,
              username: req.session.register.username
            }
          } else if (req.session.register.google) {
            user.google = {
              id: req.session.register.google,
              token: req.session.register.token,
              tokenSecret: req.session.register.tokenSecret,
              username: req.session.register.username
            }
          } else if (req.session.register.linkedin) {
            user.linkedin = {
              id: req.session.register.linkedin,
              token: req.session.register.token,
              tokenSecret: req.session.register.tokenSecret,
              username: req.session.register.username
            }
          } else if (req.session.register.twitter) {
            user.twitter = {
              id: req.session.register.twitter,
              token: req.session.register.token,
              tokenSecret: req.session.register.tokenSecret,
              username: req.session.register.username
            }
          } else if (req.session.register.foursquare) {
            user.foursquare = {
              id: req.session.register.foursquare,
              token: req.session.register.token,
              tokenSecret: req.session.register.tokenSecret,
              username: req.session.register.username
            }
          } else if (req.session.register.yahoo) {
            user.yahoo = {
              id: req.session.register.yahoo,
              token: req.session.register.token,
              tokenSecret: req.session.register.tokenSecret,
              username: req.session.register.username
            }
          } else if (req.session.register.windowslive) {
            user.windowslive = {
              id: req.session.register.windowslive,
              token: req.session.register.token,
              tokenSecret: req.session.register.tokenSecret,
              username: req.session.register.username
            }
          }
          user.photo = req.session.register.photo;
          req.session.register = null;
        }
        user.save(function (err) {
          if (err) {
            return res.json({ error: err.errors[0]})
          }
          req.logIn(user, function(err) {
            if (err) return next(err)
            return res.redirect('/logged/?ps=1')
          })
        });
      } else {
        return res.json({ error: __('User already exists!')})
      }
    })
  } else {
    return res.json({ error: __('Passwords mismatch!')})
  }
}

/**
 *  Show profile
 */

exports.show = function (req, res) {
  var user = req.profile
  res.render('users/show', {
    title: user.name,
    user: user
  })
}

/**
 * Find user by id
 */

exports.user = function (req, res, next, id) {
  User
    .findOne({ _id : id })
    .exec(function (err, user) {
      if (err) return next(err)
      if (!user) return next(new Error('Failed to load User ' + id))
      req.profile = user
      next()
    })
}
