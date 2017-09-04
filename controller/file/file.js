var formidable = require('formidable');
var db = require('../../mysql/connect');
var multer = require('../../plug/multer');

var upload = multer.single('thumbnail');

module.exports = {
	upLoadFile (req,res){
		// 获得文件的临时路径
	    //var tmp_path = req.files.thumbnail.path;
	    // 指定文件上传后的目录 - 示例为"images"目录。 
	    //var target_path = './public/upload/' + req.files.thumbnail.name;
	    // 移动文件
	    //fs.rename(tmp_path, target_path, function(err) {
	      	//if (err) throw err;
	      	//删除临时文件夹文件, 
	      	//fs.unlink(tmp_path, function() {
		        //if (err) throw err;
		        //res.send('File uploaded to: ' + target_path + ' - ' + req.files.thumbnail.size + ' bytes');
		    //});
	    //});
	    
	    upload(req,res,function(err){
	    	if (err) {
		        return console.log(err);
		    } 
		   	var tempArray = req.file.filename.split('.');
		   	req.file.path = req.file.path.replace(/\\/g,'/');
		   	req.file.filetype = tempArray[tempArray.length - 1];
		    db.sequelize.transaction( t => db.fileDetail.create(req.file,{transaction:t}))
		    .then(() => {
		    	res.send({file:req.file,Code:1000,Msg:'上传成功'});
		    }).catch(err => {
		    	console.log(err);
		    	res.status(500).send({Code:1002,Msg:'附件上传失败'});
		    })
	    })
	},
	delFile (req,res){


	},
	getFile (req,res){
		console.log(req.body)
		var data = db.fileDetail.findAll({
			where:{
				id:JSON.parse(req.query.id)
			}
		}).then(data => res.send(data));
	},
	upLoadIMG (req,res){

	}


}