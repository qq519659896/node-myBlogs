var formidable = require('formidable');
var db = require('../../mysql/connect');

module.exports = {
	addUser (req,res) {
		console.log(req.body);
		var LoginName = req.body.LoginName ? req.body.LoginName.replace(/(^\s+)|(\s+$)/g, "") : '';
		var UserName = req.body.UserName ? req.body.UserName.replace(/(^\s+)|(\s+$)/g, "") : '';
		var Email = req.body.Email ? req.body.Email.replace(/(^\s+)|(\s+$)/g, "") : '';
		var Password = req.body.Password;
		var NICKNAME_REGEXP = /^[(\u4e00-\u9fa5)0-9a-zA-Z\_\s@]+$/;
		var EMAIL_REGEXP = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
		var errorMsg;
		if(LoginName === ''){
			errorMsg = "用户名不能为空";
		} else if (UserName === '') {
			errorMsg = "昵称不能为空";
		} else if (Email === '') {
			errorMsg = "邮箱地址不能为空";
		} else if (UserName.length < 3 || UserName.length > 9) {
			//不符合呢称规定.
			errorMsg = "呢称不合法";
		} else if (Email.length <= 4 || Email.length > 30 || !EMAIL_REGEXP.test(Email)) {
			errorMsg = "邮箱地址不合法";
		} else if (Password.length <= 5 || Password.length > 15) {
			errorMsg = "密码不合法";
		} 
		if (errorMsg) {
			return res.status(401).send({errorMsg: errorMsg,Code: 1001});
		}
		db.userDetail.findAll({where:{LoginName:req.body.LoginName}})
		.then(item => {
			console.log(item);
			if(!item.length){
				//新增用户
				db.sequelize.transaction( t => db.userLogin.create(req.body,{transaction:t})
				.then(() => {
					db.userDetail.create({
						UserName:req.body.UserName,
						Email:req.body.Email,
						LoginName:req.body.LoginName
					})
				})
				.then(() => res.send({Code:1000,msg:'添加成功'})).catch(err => {
					console.log(err);
					return res.status(500).send({errorMsg:'添加用户失败',Code:1002})
				}));
				//新增用户详情



			} else {
				res.send({Code:1001,msg:'已存在登陆账号'});
			}
		})

		
		// userLogin.create(req.body).then(() => {
		// 	userDetail.create({
		// 		UserName:req.body.UserName,
		// 		Email:req.body.Email
		// 	})
		// }).then(() => {
		// 	return res.send({
		// 		Code:1000,
		// 		msg:'添加成功'
		// 	})
		// }).catch(err => {
		// 	console.log(err)
		// 	return res.status(500).send({errorMsg:'添加用户失败',Code:1002})
		// })
		
	},
	updateUser (req,res) {
		var errorMsg;
		if(!req.body.Id){
			errorMsg = '用户不存在';
		}
		if(errorMsg){
			return res.send({Code:'1001',errorMsg:errorMsg})
		}
		db.sequelize.transaction( t => db.userDetail.findById(req.body.Id,{transaction:t})
		.then(item => item.update(req.body),{transaction:t})
		.then(() => res.send({Code:1000,msg:'更新数据成功'}))
		.catch(err => {
			console.log(err);
			res.send({Code:1002,errorMsg:'更新用户失败'})
		}));
	},
	infoUser (req,res) {
		console.log(req.body);
		var data = db.userDetail.findAll({
			where:req.body
		})
		.then((data) => res.send(data));
		
	},
	delUser (req,res) {
			
	}	
}