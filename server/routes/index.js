
/*
 * GET home page.
 */
 
exports.index = function(req, res){
  	res.render('index', {
        development: process.env.NODE_ENV == 'development' ? true : false
  	});
};

exports.error = function(req, res){
  	res.render('404');
};