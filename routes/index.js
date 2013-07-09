
/*
 * GET home page.
 */
var mongoose = require( 'mongoose' );
var Post     = mongoose.model( 'Post' );
var utils    = require( 'connect' ).utils;
// var moment = require('moment');
var dateUtils = require('../dateUtils');

exports.index = function(req, res, next){
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
          user: req.user,
          notification:{
            commont:{count:1},
            reply:{count:2},
            letter:{count:3},
            mention:{count:4}
          }
      });
  });

};
exports.show = function( req, res, next ){
  var id=req.params.id;
  if(/^[0-9]+$/gi.test(id)){
    Post.find( {id:req.params.id}, function ( err, post ){
      if( err ) return next( err );
      res.send(post);
    });
  }else{
    res.send([]);
  }
}
exports.create = function ( req, res, next ){
  console.log(req.body.user);
  new Post({
    user_id    : req.cookies.user_id,
    content    : req.body.content,
    updated_at : Date.now(),
    author     : req.body.user,
    id         : new Date().getTime()
  }).save( function( err, post, count ){
    if( err ) return next( err );
    res.redirect( '/' );
  });
};

exports.destroy = function ( req, res, next ){
  Post.findById( req.params.id, function ( err, post ){
    if( post.user_id !== req.cookies.user_id ){
      return utils.forbidden( res );
    }
    post.remove( function ( err, post ){
      if( err ) return next( err );
      res.redirect( '/' );
    });
  });
};

exports.edit = function ( req, res, next ){
  Post.
    find({ user_id : req.cookies.user_id }).
    sort( '-updated_at' ).
    exec( function ( err, posts ){
      if( err ) return next( err );
      dateUtils.add_formatted_datestr(posts);
      res.render( 'edit', {
          title   : 'Confession',
          posts   : posts,
          current : req.params.id
      });
  });
};

exports.update = function ( req, res, next ){
  Post.findById( req.params.id, function ( err, post ){
    if( post.user_id !== req.cookies.user_id ){
      return utils.forbidden( res );
    }
    post.content    = req.body.content;
    post.updated_at = Date.now();
    post.save( function ( err, post, count ){
      if( err ) return next( err );
      res.redirect( '/' );
    });
  });
};

// ** 注意!! express 会将 cookie key 转成小写 **
exports.current_user = function ( req, res, next ){
  if( !req.cookies.user_id ){
    res.cookie( 'user_id', utils.uid( 32 ));
  }
  next();
};