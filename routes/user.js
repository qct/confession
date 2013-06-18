
/*
 * GET users listing.
 */
var mongoose = require('mongoose');
var User     = mongoose.model('User');
var Post     = mongoose.model( 'Post' );
var dateUtils = require('../dateUtils');

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
  //先查询有没有这个用户存在，不存在才创建
  console.log('create new user from ' + way);
  this.create(req, res, way);
};

exports.create = function(req, res, way, next) {
  new User({
    name: req.user.displayName, 
    email: req.user.emails[0].value, 
    sign_way: way, 
    create_at: Date.now()
  }).save(function(err) {
    if( err ) return next( err );
  });
};

exports.createNormalUser = function(req, res, next) {
  var newUser = new User({
    loginname: req.body.username,
    name: req.body.username, 
    email: req.body.email, 
    pass: req.body.password,
    sign_way: "own", 
    create_at: Date.now()
  });
  console.log(newUser);
  newUser.save(function(err) {
    if( err ) return next( err );
  });
  Post.
    find({ user_id : req.cookies.user_id }).
    sort( '-updated_at' ).
    exec( function ( err, posts, count ){
      if( err ) return next( err );
      dateUtils.add_formatted_datestr(posts);
      res.render( 'index', {
          title : '我忏悔 I Confess',
          posts : posts,
          count : count,
          user: newUser
      });
  });
};

exports.hasUsername = function() {

};