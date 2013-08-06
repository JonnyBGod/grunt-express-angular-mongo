var mongoose = require('mongoose')
  , LocalStrategy = require('passport-local').Strategy
  , TwitterStrategy = require('passport-twitter').Strategy
  , FacebookStrategy = require('passport-facebook').Strategy
  , GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
  , LinkedInStrategy = require('passport-linkedin-oauth2').Strategy
  , FoursquareStrategy = require('passport-foursquare').Strategy
  , YahooStrategy = require('passport-yahoo-oauth').Strategy
  , WindowsLiveStrategy = require('passport-windowslive').Strategy
  , User = mongoose.model('User')


module.exports = function (passport, config) {
  // require('./initializer')

  // serialize sessions
  passport.serializeUser(function(user, done) {
    done(null, user.id)
  })

  passport.deserializeUser(function(id, done) {
    User.findOne({ _id: id }, function (err, user) {
      done(err, user)
    })
  })

  // use local strategy
  passport.use(new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    },
    function(req, email, password, done) {
      User.findOne({ emails: email }, function (err, user) {
        if (err) { return done(err) }
        if (!user) {
          return done(null, false, { message: 'Unknown user' })
        }
        if (!user.authenticate(password)) {
          return done(null, false, { message: 'Invalid password' })
        }
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
          if (!user.photo)
              user.photo = req.session.register.photo;

          /*var added = user.emails.addToSet();
          console.log(added);*/
          req.session.register = null;

          user.save(function (err) {
            if (err) {
              return done(err)
            }
            return done(null, user)
          });
        } else {
          return done(null, user)
        }
      })
    }
  ))

  // use twitter strategy
  passport.use(new TwitterStrategy({
        consumerKey: config.twitter.clientID
      , consumerSecret: config.twitter.clientSecret
      , callbackURL: config.twitter.callbackURL
      , passReqToCallback: true
    },
    function(req, token, tokenSecret, profile, done) {
      User.findOne({ 'twitter.id': profile.id }, function (err, user) {
        if (err) { return done(err) }
        if (!user) {
          var register = {
            twitter: profile.id,
            name: {
              surname: '',
              given: ''
            },
            photo: profile._json.profile_image_url_https,
            token: token,
            tokenSecret: tokenSecret,
            username: profile.username
          };
          req.flash('register', register);
          return done(null, false)
        }
        else {
          return done(err, user)
        }
      })
    }
  ))

  // use facebook strategy
  passport.use(new FacebookStrategy({
        clientID: config.facebook.clientID
      , clientSecret: config.facebook.clientSecret
      , callbackURL: config.facebook.callbackURL
      , passReqToCallback: true
    },
    function(req, accessToken, refreshToken, profile, done) {
      User.findOne({ 'facebook.id': profile.id }, function (err, user) {
        if (err) { return done(err) }
        if (!user) {
          var register = {
            facebook: profile.id,
            name: {
              surname: profile.name.familyName,
              given: profile.name.givenName
            },
            email: profile.emails[0].value,
            photo: 'https://graph.facebook.com/'+ profile.id +'/picture',
            token: accessToken,
            tokenSecret: refreshToken,
            username: profile.username
          };
          req.flash('register', register);
          return done(null, false)
          /*user = new User({
              name: profile.displayName
            , emails: [profile.emails[0].value]
            , photo: 'https://graph.facebook.com/'+ profile.id +'/picture'
            , facebook: {
                id: profile.id,
                token: accessToken,
                tokenSecret: refreshToken,
                username: profile.username
            }
          })
          user.save(function (err) {
            if (err) console.log(err)
            return done(err, user)
          })*/
        }
        else {
          return done(err, user)
        }
      })
    }
  ))

  // use google strategy
  passport.use(new GoogleStrategy({
      clientID: config.google.clientID,
      clientSecret: config.google.clientSecret,
      callbackURL: config.google.callbackURL,
      passReqToCallback: true
    },
    function(req, accessToken, refreshToken, profile, done) {
      User.findOne({ 'google.id': profile.id }, function (err, user) {
        if (!user) {
          var register = {
            google: profile.id,
            name: {
              surname: profile.name.familyName,
              given: profile.name.givenName
            },
            email: profile.emails[0].value,
            photo: profile._json.picture,
            token: accessToken,
            tokenSecret: refreshToken,
            username: profile.emails[0].value
          };
          req.flash('register', register);
          return done(null, false)
        } else {
          return done(err, user)
        }
      })
    }
  ))

  // use linkedin strategy
  passport.use(new LinkedInStrategy({
        clientID: config.linkedin.clientID
      , clientSecret: config.linkedin.clientSecret
      , callbackURL: config.linkedin.callbackURL
      , passReqToCallback: true
    },
    function(req, token, tokenSecret, profile, done) {
      User.findOne({ 'linkedin.id': profile.id }, function (err, user) {
        console.log(profile);
        if (err) { return done(err) }
        if (!user) {
          var register = {
            linkedin: profile.id,
            name: {
              surname: '',
              given: ''
            },
            email: profile.emails[0].value,
            photo: profile._json.profile_image_url_https,
            token: token,
            tokenSecret: tokenSecret,
            username: profile.username
          };
          req.flash('register', register);
          return done(null, false)
        }
        else {
          return done(err, user)
        }
      })
    }
  ))

  // use foursquare strategy
  passport.use(new FoursquareStrategy({
        clientID: config.foursquare.clientID
      , clientSecret: config.foursquare.clientSecret
      , callbackURL: config.foursquare.callbackURL
      , passReqToCallback: true
    },
    function(req, token, tokenSecret, profile, done) {
      User.findOne({ 'foursquare.id': profile.id }, function (err, user) {
        console.log(profile._json.response.user);
        if (err) { return done(err) }
        if (!user) {
          var register = {
            foursquare: profile.id,
            name: {
              surname: profile.name.familyName,
              given: profile.name.givenName
            },
            emails: profile.emails,
            photo: profile._json.response.user.photo,
            token: token,
            tokenSecret: tokenSecret,
            username: profile.id
          };
          req.flash('register', register);
          return done(null, false)
        }
        else {
          return done(err, user)
        }
      })
    }
  ))

  // use linkedin strategy
  /*passport.use(new YahooStrategy({
        consumerKey: config.yahoo.clientID
      , consumerSecret: config.yahoo.clientSecret
      , callbackURL: config.yahoo.callbackURL
      , passReqToCallback: true
    },
    function(req, token, tokenSecret, profile, done) {
      User.findOne({ 'yahoo.id': profile.id }, function (err, user) {
        console.log(profile._json.profile.emails);
        if (err) { return done(err) }
        if (!user) {
          var register = {
            yahoo: profile.id,
            name: {
              surname: profile.name.familyName,
              given: profile.name.givenName
            },
            email: profile.emails[0].value,
            photo: profile._json.profile_image_url_https,
            token: token,
            tokenSecret: tokenSecret,
            username: profile.username
          };
          req.flash('register', register);
          return done(null, false)
        }
        else {
          return done(err, user)
        }
      })
    }
  ))*/

  // use windowslive strategy
  passport.use(new WindowsLiveStrategy({
        clientID: config.windowslive.clientID
      , clientSecret: config.windowslive.clientSecret
      , callbackURL: config.windowslive.callbackURL
      , passReqToCallback: true
    },
    function(req, token, tokenSecret, profile, done) {
      User.findOne({ 'windowslive.id': profile.id }, function (err, user) {
        if (err) { return done(err) }
        if (!user) {
          var register = {
            windowslive: profile.id,
            name: {
              surname: profile.name.familyName,
              given: profile.name.givenName
            },
            emails: profile.emails,
            photo: profile.photos[0],
            token: token,
            tokenSecret: tokenSecret,
            username: profile.id
          };
          req.flash('register', register);
          return done(null, false)
        }
        else {
          return done(err, user)
        }
      })
    }
  ))
}
