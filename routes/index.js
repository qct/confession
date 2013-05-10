
/*
 * GET home page.
 */
var mongoose = require( 'mongoose' );
var Post     = mongoose.model( 'Post' );
var utils    = require( 'connect' ).utils;
var moment = require('moment');
var utils = require('../utils');

exports.index = function(req, res, next){
  Post.
    find({ user_id : req.cookies.user_id }).
    sort( '-updated_at' ).
    exec( function ( err, posts, count ){
      if( err ) return next( err );
      utils.add_formatted_datestr(posts);
      res.render( 'index', {
          title : 'Confession',
          posts : posts,
          count : count
      });
  });
};

exports.create = function ( req, res, next ){
  new Post({
    user_id    : req.cookies.user_id,
    content    : req.body.content,
    updated_at : Date.now()
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
      utils.add_formatted_datestr(posts);
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

// ** 注意!! express 會將 cookie key 轉成小寫 **
exports.current_user = function ( req, res, next ){
  if( !req.cookies.user_id ){
    res.cookie( 'user_id', utils.uid( 32 ));
  }
 
  next();
};