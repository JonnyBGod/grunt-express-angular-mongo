/**
 * Module dependencies.
 */
var SITE_SECRET = 'anything',
    tenDays = 864000000,
    workers = [];

var express = require('express'),
    ejsLocals = require("ejs-locals"),
    i18n = require("i18n"),
    fs = require('fs'),
    cluster = require('cluster'),
    numCPUs = require('os').cpus().length,
    flash = require('connect-flash'),
    mongoose = require('mongoose'),
    SessionStore = require("connect-mongostore")(express),
    passport = require('passport'),
    passportSocketIo = require("passport.socketio");

var app = module.exports = express();

var httpsOptions = {
    key : fs.readFileSync(__dirname + '/private.key'),
    cert: fs.readFileSync(__dirname + '/public.pem')
};

var http = require('http').createServer(app),
    https = require('spdy').createServer(require('https').Server, httpsOptions, app),
    io = require('socket.io').listen(https);

global.socket;

// Load configurations
// if test env, load example file
var env = process.env.NODE_ENV || 'production';
global.config = require('./config')[env];

mongoose.connect(config.db, {
    server: {
        auto_reconnect: 1,
        socketOptions: {
            keepAlive: 1
        }
    }
});

var db = mongoose.connection;

var store = new SessionStore({
    db: 'sessions',
    mongooseConnection: mongoose.connection
});
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
    console.log('Connected to DB');
});

// Bootstrap models
var models_path = __dirname + '/models'
fs.readdirSync(models_path).forEach(function (file) {
  require(models_path+'/'+file)
})

// bootstrap passport config
require('./controllers/passport')(passport, config);

global.supported_languages = ['en', 'en-GB', 'pt-PT'];

i18n.configure({
    directory: __dirname + '/../app/locales',
    // setup some locales - other locales default to en silently
    locales: supported_languages,

    // where to register __() and __n() to, might be "global" if you know what you are doing
    register: global
});

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');

    next();
};

var testUrls = function (req, res, next) {
    if (func.testUrl(req.url)) {
        next();
    } else {
        res.status(404);
        if (req.accepts('html')) {
            res.render('404', {url: req.url});
            return;
        }
        if (req.accepts('json')) {
            res.send({error: 'Not found'});
            return;
        }
        res.type('txt').send('Not found');
    }
}

function requiresLogin(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else if (req.url == "/new/" && req.params.action == "undefined"
        || req.url == "/new" && req.params.action == "undefined"
        || req.url.indexOf('/edit') !== -1) {
        buildHome(req, res);
    } else if (req.url == "/new/" 
        || req.url == "/new"
        || req.url == "/edit/"
        || req.url == "/edit"
        || req.url == "/getaccount/"
        || req.url == "/getaccount"
        || req.url == "/user/"
        || req.url == "/user"
        || req.url == "/getregister/"
        || req.url == "/getregister"
        || req.url == "/logged/"
        || req.url == "/logged") {
        res.redirect('home');
    } else {
        res.render("notLoggedPages", {
            act : "login_form",
            fb_canvas: false
        });
    }
};

// Configuration

app.configure("development", function () {
    app.use(express.compress());
    app.use(express.static(__dirname + '/../app', {maxAge: tenDays}));
});
app.configure("production", function () {
    app.use(express.compress());
    app.use(express.static(__dirname + '/../dist', {maxAge: tenDays}));
});

app.configure(function(){
    app.use(express.cookieParser(SITE_SECRET));
    app.use(express.bodyParser());
    app.use(express.session({
        store: store,
        secret: SITE_SECRET,
        key: 'express.sid'
    }));
    app.use(flash());
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(i18n.init);
    app.engine("html", ejsLocals);
    app.set('views', __dirname + '/views');
    app.set("view engine", "html");
    app.set('view options', {layout: false});
    app.use(allowCrossDomain);
});
app.configure("development", function () {
    var liveReloadPort = 35729;

    app.use(require('connect-livereload')({
        port: liveReloadPort
    }));
});
app.configure(function(){
    app.use(app.router);
    app.use(function (err, req, res, next) {
        console.log(err.stack);
        next(err);
    });
    app.use(function (err, req, res, next) {
        if (req.xhr) {
            res.send(500, {error: 'Something bad happened!'});
        } else {
            next(err);
        }
    });
    app.use(function (err, req, res, next) {
        res.status(500);
        res.render('error', {error: err});
    });
});

app.configure('development', function(){
    app.use(express.errorHandler({dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
    app.use(express.errorHandler());
});

app.get('/heartbeat', function(req, res){
    res.status(200);
    res.close();
});

app.get('*', function(req, res, next){
    if (!req.secure && !req.isSpdy) {
        res.redirect(301, "https://" + req.headers.host + req.url);
    } else {
        next();
    }
});

// Bootstrap routes
require('./routes/auth')(app, passport);
routes = require('./routes'),
api = require('./routes/api'),
socket_routes = require('./routes/socket');

// Routes
app.get('/failedLogin', function(req, res) {
    var flash = req.flash();
    if (flash.register[0]) {
        req.session.register = flash.register[0];
        if (flash.register[0].twitter) {
            res.render("notLoggedPages", {
                act : "register_form_out",
                name : flash.register[0].name,
                signin: true,
                fb_canvas: false
            });
        } else if (flash.register[0].facebook || flash.register[0].google || flash.register[0].linkedin || flash.register[0].foursquare || flash.register[0].yahoo || flash.register[0].windowslive) {
            res.render("notLoggedPages", {
                act : "register_form_out",
                name : flash.register[0].name,
                email : flash.register[0].email.value,
                signin: true,
                fb_canvas: false
          });
        }
    } else {
        res.status(401);
        res.json({error: flash.error[0]});
    }
});

app.get('/logged/?', requiresLogin, function (req, res) {
    if (req.query.ps) {
        res.status(200);
        res.json({message: __('Welcome!')});
    } else {
        res.render("notLoggedPages", {act: "loguser", USER: req.user, fb_canvas: false});
    }

    socket.emit('userData',
        {
            user: {
                id: req.user._id,
                admin: req.user.admin,
                foursquareToken: req.user.foursquare && req.user.foursquare.id
            },
            lists: req.user.lists
        }
    );
    //log.log({what: 'userLogin', params: {userid: req.user.details.id, remote_address: req.ip}});
});

// JSON API
app.get('/api/v1/something', api.getSomething);

// redirect all others to the index (HTML5 history)
app.get('*', testUrls, routes.index);

//Socket.io
io.enable('browser client minification');  // send minified client
//io.enable('browser client etag');      // apply etag caching logic based on version number
io.enable('browser client gzip');
//io.set('store', mystore);
io.set('close timeout', 310);
//io.set('heartbeat', false);
io.set('heartbeat timeout', 360);
io.set('heartbeat interval', 300);
//io.set('transports', ['websocket']);
io.set('rememberTransport', false);

io.configure('development', function(){
    io.set('log level', 2);
    io.set('transports', ['websocket', 'xhr-polling']);
});

io.configure('production', function(){
    io.set('log level', 1);
    //io.set('transports', ['websocket', 'xhr-polling']);
    io.set('transports', ['xhr-polling']);
});

io.set("authorization", passportSocketIo.authorize({
    cookieParser: express.cookieParser,
    key:    'express.sid',       //the cookie where express (or connect) stores its session id.
    secret: SITE_SECRET,           //the session secret to parse the cookie
    store:   store,     //the session store that express uses
    fail: function(data, accept) {  // *optional* callbacks on success or fail
        accept(null, true);        // second param takes boolean on whether or not to allow handshake
    },
    success: function(data, accept) {
        accept(null, true);
    }
}));

io.sockets.on('connection', function (soc) {
    socket = soc;
    hs = socket.handshake;

    if (hs.user) {
        socket.emit('userData',
            {
                user: {
                    id: hs.user._id
                }
            }
        );
    } else {
        socket.emit('userData',
            {
                user: {
                    id: false
                }
            }
        );
    }

    socket.on('ping', socket_routes.ping);
});

// Start server

if(cluster.isMaster && env == 'production'){
    console.log('Master Working Now!');
    for (var i = 0; i < numCPUs; i++) {
        var worker = cluster.fork();
        workers.push(worker);
        console.log('Starting Worker (PID): ' + worker.process.pid);
    }
 
    cluster.on('death', function (worker){
        for(var i=0; i < workers.length; i++){
            var aworker = workers[i];
            if(worker.process.pid === aworker.process.pid) {
                workers.splice(i);
                console.log('Worker stopped (PID): ' + worker.process.pid);
            }
        }
        var regen = cluster.fork();
        workers.push(regen);
        console.log('Starting Worker (PID): ' + regen.process.pid);
    });
} else {
    http.listen(process.env.NODE_ENV == 'development' ? 9000 : 80, function(){
        console.log("http server started");
    });
    https.listen(process.env.NODE_ENV == 'development' ? 9001 : 443, function(){
        console.log("https server started");
    });
}

process.on('SIGTERM',function(){
    for(var i=0; i < workers.length; i++){
        console.log('Worker killed (PID)'+ workers[i].process.pid);
        workers[i].kill('SIGTERM');
    }
    console.log('Master killed');
    process.exit(1);
 });

 process.on('SIGINT',function(){
    http.close();
    https.close();
    process.exit();
 });
