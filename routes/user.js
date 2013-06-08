
/*
 * GET users listing.
 */
var mongoose = require('mongoose');
var User     = mongoose.model('User');

exports.list = function(req, res){
  res.send("respond with a resource");
};

exports.login = function(req, res) {
  res.render('login', {
    title : '我忏悔 I Confess',
    user: req.user});
};

exports.signup = function(req, res) {
  res.render('signup', {
    title : '我忏悔 I Confess',
    user: req.user});
};

exports.writeUserGoogle = function(req, res, way) {
  console.log('create new user from ' + way);
  this.create(req, res, way);
};

exports.create = function(req, res, way, next) {
  new User({
    name: req.user.displayName, 
    email: req.user.emails[0].value, 
    sign_way: way, 
    create_at: Date.now()
  }).save(function(err, user, count) {
    if( err ) return next( err );
  });
};

exports.createNormalUser = function(req, res, next) {
  new User({
    loginname: req.body.loginname,
    email: req.body.email,
    pass: req.body.pass,
    sign_way: 'own', 
    create_at: Date.now()
  }).save(function(err, user, count) {
    if( err ) return next( err );
  });
};