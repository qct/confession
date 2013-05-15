var moment = require('moment');
moment.lang('zh-cn');
this.add_formatted_datestr = function (posts) {
  for (var i = 0; i < posts.length; i++) {
    posts[i].updated_at_str = moment(posts[i].updated_at.getTime()).fromNow();//.format("YYYY-MM-DD HH:mm:ss");
  }
}