var user = require('./user');
var file = require('./file');
var web = require('./web');
module.exports = app => {
	app.use('/user',user)
	app.use('/file',file)
	app.use('/web',web)
}