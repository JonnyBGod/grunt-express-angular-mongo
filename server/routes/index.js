
/*
 * GET home page.
 */
 
exports.index = function(req, res){
  	res.render('index', {
  		app_name: config.app.name,
  		server_name: req.headers.host,
        development: process.env.NODE_ENV == 'development' ? true : false
  	});
};

exports.error = function(req, res){
  	res.render('404');
};