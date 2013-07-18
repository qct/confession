
/*
 * GET users listing.
 */
var mongoose = require('mongoose');
var User     = mongoose.model('User');
var Post     = mongoose.model( 'Post' );
var dateUtils = require('../dateUtils');
var utils    = require( 'connect' ).utils;
var idGen=require('../smodules/idGenerator');

exports.list = function(req, res){
  res.send("respond with a resource");
};

exports.login = function(req, res) {
  res.render('login', {
    title : '我忏悔 I Confess',
    user  : req.session.user
  });
};

exports.signup = function(req, res) {
  res.render('signup', {
    title : '我忏悔 I Confess',
    user: req.user});
};

exports.writeUserGoogle = function(req, res, way) {
  //先查询有没有这个用户存在，不存在才创建
  console.log('create new user from ' + way);
  console.log(req.user);
  hasLoginname(req.user.emails[0].value,function(result){
    if(!result){
      this.create(req, res, way);
    }
  });


};

exports.create = function(req, res, way, next) {
  idGen.genUserId(function(id){
    new User({
      loginname: req.user.emails[0].value, 
      name: req.user.displayName, 
      email: req.user.emails[0].value, 
      sign_way: way, 
      create_at: Date.now(),
      id:id
    }).save(function(err) {
      if( err ) return next( err );
      req.session.user={loginname:req.user.emails[0].value,id:id};
    });
  });
  
};

exports.createNormalUser = function(req, res, next) {
  idGen.genUserId(function(id){
    var newUser = new User({
      loginname: req.body.username,
      name: req.body.username, 
      email: req.body.email, 
      pass: req.body.password,
      sign_way: "own", 
      create_at: Date.now(),
      id:id
    });
    console.log(newUser);
    newUser.save(function(err) {
      if( err ) return next( err );
      req.session.user={loginname:newUser.loginname,id:id};
      res.redirect("/")
    });
  });
  
};

/*
* check if login name has already exist
* return: boolean
*/
function hasLoginname(loginname,callback) {
  var result = true;
  User.findOne({loginname: loginname}).exec(function(err, user) {
    if(user){
      req.session.user={loginname:user.loginname,id:user.id};
      callback(true);
    }else{
      callback(false);
    }
  });
};

/**
* user login, check if the user is available then go to index
*/
exports.logincheck = function(req, res, next) {
  User.findOne({
    loginname: req.body.username,
    pass: req.body.password,
    sign_way: "own"
  }).exec(function (err, user) {
    if(user){
    req.session.user={loginname:user.loginname,id:user.id};
    res.redirect("/")
  }else{
    res.send({code:20001,result:"fail",des:"fail to login"});
  }
  });
  
  
};