
/**
 * Module dependencies.
 */
// 设定 mongoose
require( './db' );
var express = require('express')
  , passport = require('passport')
  , util = require('util')
  , GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
  , routes = require('./routes')
  , comment = require('./routes/comment')
  , users = require('./routes/user')
  , http = require('http')
  , escapehtml=require('./smiddleware/escapehtml')
  , checkuser=require('./smiddleware/checkuser.js')
  , http = require('http')
  , https = require('https')
  , crypto=require('crypto')
  , fs = require('fs')
  , path = require('path');
var RedisStore=require('connect-redis')(express);

global.urls={
  tags:"https://www.rosegun.com/t/",
  people:"https://www.rosegun.com/u/",
  posts:"https://www.rosegun.com/p/"
}
  // , moment = require('moment');

// API Access link for creating client ID and secret:
// https://code.google.com/apis/console/
var GOOGLE_CLIENT_ID = "1016513914615-vm7oqoaifb4u9t1r0gqj8i1qdvu8qmcf.apps.googleusercontent.com";
var GOOGLE_CLIENT_SECRET = "H2tG-ogZ-S-WymitfxtlkMip";

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://127.0.0.1:3000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return done(err, user);
    // });z
    process.nextTick(function () {
      // To keep the example simple, the user's Google profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the Google account with a user record in your database,
      // and return that user instead.
/*      console.log("acc: " + accessToken);
      console.log("ref: " + refreshToken);
      console.log(profile);*/
      return done(null, profile);
    });
  }
));

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon(__dirname+"/favicon.ico"));
app.use(express.logger('dev'));
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.session({ 
  secret: 'keyboard cat',
  store:new RedisStore({
    host:"rosegun.com"
  })
}));
// app.use(express.methodOverride());
app.use(passport.initialize());
app.use(passport.session());
app.use(escapehtml);
app.use(checkuser);
app.use(app.router);
app.use(require('less-middleware')({ src: __dirname + '/public' }));
app.use(express.static(path.join(__dirname, 'public')));


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


app.get('/', routes.index);
app.get('/users', users.list);

app.post( '/create', routes.create );
app.get( '/destroy/:id', routes.destroy );
app.get( '/edit/:id', routes.edit );
app.post( '/update/:id', routes.update );
app.get('/show/:id',routes.show);
app.all('/comment',comment.active)
app.all('/comment/show',comment.show)

// user management--google oauth2
// app.get('/auth/google', passport.authenticate('google'));
app.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/userinfo.profile',
                                            'https://www.googleapis.com/auth/userinfo.email'] }),
  function(req, res){
    // The request will be redirected to Google for authentication, so this
    // function will not be called.
});
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {
    //这里要做点逻辑：用户从google验证回来之后，把用户的信息写入user表
    users.writeUserGoogle(req, res, 'google');
    req.user.loginname = req.user.emails[0].value;
    res.redirect('/');
});
app.get('/logout', function(req, res){
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

//user login
app.get('/login', users.login);
app.post('/logincheck', users.logincheck);
app.get('/signup', users.signup);
app.post('/signupsave', users.createNormalUser);

app.get('/test',routes.test);


app.use(function(req,res){
  res.statusCode=404;
  res.send("<body align='center'><span style='font-weight:bold;font-family:consolas;font-size:50px;color:red;'>404!!</span><hr/><br/><img src='/images/404.jpg' style='border:0px;'/></body>")
});



http.createServer(app).listen(80, function(){
  console.log('Express server listening on port 80' );
});


var options = {
  key: fs.readFileSync(__dirname+'/cert/www.rosegun.com.key.unsecure'),
  cert: fs.readFileSync(__dirname+'/cert/www.rosegun.com.crt')
};
https.createServer(options,app).listen(443, function(){
    console.log('Express https server listening on port 443' );
});
