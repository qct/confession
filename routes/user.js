
/*
 * GET users listing.
 */
exports.list = function(req, res){
  res.send("respond with a resource");
};

exports.login = function(req, res) {
  res.render('login', {
    title : '我忏悔 I Confess',
    user: req.user});
};