
module.exports = function (app, passport, auth) {

  // user routes
  var users = require('../controllers/users')
  app.get('/logout', users.logout)
  app.post('/auth/register', users.create)
  app.post('/auth/login', passport.authenticate('local', {failureRedirect: '/failedLogin', failureFlash: 'Invalid email or password.'}), users.session)
  app.get('/users/:userId', users.show)

  app.get('/auth/facebook', passport.authenticate('facebook', { scope: [ 'email', 'user_photos'], failureRedirect: '/failedLogin' }), users.signin)
  app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/failedLogin' }), users.authCallback)

  app.get('/auth/github', passport.authenticate('github', { failureRedirect: '/failedLogin' }), users.signin)
  app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/failedLogin' }), users.authCallback)

  app.get('/auth/twitter', passport.authenticate('twitter', { failureRedirect: '/failedLogin' }), users.signin)
  app.get('/auth/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/failedLogin' }), users.authCallback)

  app.get('/auth/google', passport.authenticate('google', { failureRedirect: '/failedLogin', scope: [ 'profile', 'email', 'https://www.google.com/m8/feeds'] }), users.signin)
  app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/failedLogin', scope: [ 'profile', 'email', 'https://www.google.com/m8/feeds'] }), users.authCallback)

  app.get('/auth/linkedin', passport.authenticate('linkedin', { failureRedirect: '/failedLogin', scope: ['r_emailaddress', 'r_basicprofile'] }), users.signin)
  app.get('/auth/linkedin/callback', passport.authenticate('linkedin', { failureRedirect: '/failedLogin' , scope: ['r_emailaddress', 'r_basicprofile'] }), users.authCallback)

  app.get('/auth/foursquare', passport.authenticate('foursquare', { failureRedirect: '/failedLogin' }), users.signin)
  app.get('/auth/foursquare/callback', passport.authenticate('foursquare', { failureRedirect: '/failedLogin' }), users.authCallback)

  /*app.get('/auth/yahoo', passport.authenticate('yahoo', { failureRedirect: '/failedLogin' }), users.signin)
  app.get('/auth/yahoo/callback', passport.authenticate('yahoo', { failureRedirect: '/failedLogin' }), users.authCallback)*/

  app.get('/auth/windowslive', passport.authenticate('windowslive', { failureRedirect: '/failedLogin', scope: ['wl.signin', 'wl.basic', 'wl.emails'] }), users.signin)
  app.get('/auth/windowslive/callback', passport.authenticate('windowslive', { failureRedirect: '/failedLogin', scope: ['wl.signin', 'wl.basic', 'wl.emails'] }), users.authCallback)

  app.param('userId', users.user)
}