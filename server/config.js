var path = require('path')
  , rootPath = path.normalize(__dirname);

module.exports = {
  development: {
    db: 'mongodb://USER:PASSWORD@ADDRESS:PORT',
    root: rootPath,
    app: {
      name: 'NAME'
    },
    facebook: {
      clientID: "clientID",
      clientSecret: "clientSecret",
      callbackURL: "/auth/facebook/callback"
    },
    twitter: {
      clientID: "clientID",
      clientSecret: "clientSecret",
      callbackURL: "/auth/twitter/callback"
    },
    google: {
      clientID: "clientID",
      clientSecret: "clientSecret",
      callbackURL: "/auth/google/callback"
    },
    linkedin: {
      clientID: "clientID",
      clientSecret: "clientSecret",
      callbackURL: "/auth/linkedin/callback"
    },
    foursquare: {
      clientID: "clientID",
      clientSecret: "clientSecret",
      callbackURL: "/auth/foursquare/callback"
    },
    yahoo: {
      clientID: "clientID",
      clientSecret: "clientSecret",
      callbackURL: "/auth/yahoo/callback"
    },
    windowslive: {
      clientID: "clientID",
      clientSecret: "clientSecret",
      callbackURL: "/auth/windowslive/callback"
    }
  },
  production: {
    db: 'mongodb://USER:PASSWORD@ADDRESS:PORT',
    root: rootPath,
    app: {
      name: 'NAME'
    },
    facebook: {
      clientID: "clientID",
      clientSecret: "clientSecret",
      callbackURL: "/auth/facebook/callback"
    },
    twitter: {
      clientID: "clientID",
      clientSecret: "clientSecret",
      callbackURL: "/auth/twitter/callback"
    },
    google: {
      clientID: "clientID",
      clientSecret: "clientSecret",
      callbackURL: "/auth/google/callback"
    },
    linkedin: {
      clientID: "clientID",
      clientSecret: "clientSecret",
      callbackURL: "/auth/linkedin/callback"
    },
    foursquare: {
      clientID: "clientID",
      clientSecret: "clientSecret",
      callbackURL: "/auth/foursquare/callback"
    },
    yahoo: {
      clientID: "clientID",
      clientSecret: "clientSecret",
      callbackURL: "/auth/yahoo/callback"
    },
    windowslive: {
      clientID: "clientID",
      clientSecret: "clientSecret",
      callbackURL: "/auth/windowslive/callback"
    }
  }
}
