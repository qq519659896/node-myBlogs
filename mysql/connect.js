var config = require('../config/config')
var Mysql = require('mysql2')
var Sequelize = require('sequelize')

var db = {
	sequelize:new Sequelize('testmysql','root','password',{
		host:'localhost',
		port:'6666',
		dialect: 'mysql',
		pool: {	
	        max: 5, // 连接池中最大连接数量
	        min: 0, // 连接池中最小连接数量
	        idle: 10000 // 如果一个线程 10 秒钟内没有被使用过的话，那么就释放线程
	    }
	})
}
db.userLogin = db.sequelize.import('../models/user/userLogin');
db.userDetail = db.sequelize.import('../models/user/userDetail');
db.fileDetail = db.sequelize.import('../models/file/fileDetail');
module.exports = db;