var multer = require('multer')
var commonFn = require('../config/common');
var today = commonFn.showDateYYYYMMDD(new Date());
var storage = multer.diskStorage({
     //设置上传后文件路径，uploads文件夹会自动创建。
	  //   destination: function (req, file, cb) {
			
			// console.log(today);
	  //       cb(null, './public/uploads/'+today);
	  //  	}, 	
	   	destination:'./public/uploads/'+today,
     //给上传文件重命名，获取添加后缀名
	    filename: function (req, file, cb) {
	        var fileFormat = (file.originalname).split(".");
	        cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
	    },
	   	filetype: function (req, file, cb) {
	   		var fileFormat = (file.originalname).split(".");
	   		return fileFormat[fileFormat.length - 1];
	   	} 
 });
//添加配置文件到muler对象。
var upload = multer({
     	storage: storage
	});
module.exports = upload;