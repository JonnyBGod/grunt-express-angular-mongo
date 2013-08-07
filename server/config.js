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
      clientID: "CLIENT_ID",
      clientSecret: "CLIENT_SECRET",
      callbackURL: "/auth/facebook/callback"
    },
    twitter: {
      clientID: "CLIENT_ID",
      clientSecret: "CLIENT_SECRET",
      callbackURL: "/auth/twitter/callback"
    },
    google: {
      clientID: "CLIENT_ID",
      clientSecret: "CLIENT_SECRET",
      callbackURL: "/auth/google/callback"
    },
    linkedin: {
      clientID: "CLIENT_ID",
      clientSecret: "CLIENT_SECRET",
      callbackURL: "/auth/linkedin/callback"
    },
    foursquare: {
      clientID: "CLIENT_ID",
      clientSecret: "CLIENT_SECRET",
      callbackURL: "/auth/foursquare/callback"
    },
    yahoo: {
      clientID: "CLIENT_ID",
      clientSecret: "CLIENT_SECRET",
      callbackURL: "/auth/yahoo/callback"
    },
    windowslive: {
      clientID: "CLIENT_ID",
      clientSecret: "CLIENT_SECRET",
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
      clientID: "CLIENT_ID",
      clientSecret: "CLIENT_SECRET",
      callbackURL: "/auth/facebook/callback"
    },
    twitter: {
      clientID: "CLIENT_ID",
      clientSecret: "CLIENT_SECRET",
      callbackURL: "/auth/twitter/callback"
    },
    google: {
      clientID: "CLIENT_ID",
      clientSecret: "CLIENT_SECRET",
      callbackURL: "/auth/google/callback"
    },
    linkedin: {
      clientID: "CLIENT_ID",
      clientSecret: "CLIENT_SECRET",
      callbackURL: "/auth/linkedin/callback"
    },
    foursquare: {
      clientID: "CLIENT_ID",
      clientSecret: "CLIENT_SECRET",
      callbackURL: "/auth/foursquare/callback"
    },
    yahoo: {
      clientID: "CLIENT_ID",
      clientSecret: "CLIENT_SECRET",
      callbackURL: "/auth/yahoo/callback"
    },
    windowslive: {
      clientID: "CLIENT_ID",
      clientSecret: "CLIENT_SECRET",
      callbackURL: "/auth/windowslive/callback"
    }
  }
}
