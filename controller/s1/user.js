'use strict';

import formidable from 'formidable'
import crypto from 'crypto'
import dtime from 'time-formater'
import UserModel from '../../models/s1/user'
import UserInfoModel from '../../models/s1/userInfo'
import baseComponent from '../../prototype/baseComponent'
import AddressComponent from '../../prototype/addressComponent'
class User extends baseComponent{
		constructor(){
			super()
			this.register = this.register.bind(this);
			this.login = this.login.bind(this);
		}
		async login(req,res,next) {
			const form = new formidable.IncomingForm();
			form.parse(req, async (err, fields, files) => {
					const {username, password, captcha_code} = fields;
					try{
						if (!username) {
							throw new Error('用户名参数错误');
						}else if(!password){
							throw new Error('密码参数错误');
						}else if(!captcha_code){
							throw new Error('验证码参数错误');
						}
					}catch(err){
						console.log('登陆参数错误', err);
						res.send({
							status: 0,
							type: 'ERROR_QUERY',
							message: err.message,
						})
						return
					}
					const user = await UserModel.findOne({username});
					const md5password = this.encryption(password);
					if(md5password === user.password){
						res.send({
							status:1,
							type:'USER_LOGIN_SUCCESS',
							message:'登录成功',
						})
					}else{
						res.send({
							status:2,
							type:'USER_LOGIN_WARNING',
							message:'密码不正确'
						})
					}
			})

		}
		async loginOut() {

		}
		async securityCode() {

		}
		async register(req,res,next) {
				const form = new formidable.IncomingForm();
				form.parse(req, async (err, fields, files) => {
						const {username,password,confirmPassword,email,mobile} = fields;
						if(password !== confirmPassword){
							 res.send({
							 		status:2,
							 		message:'密码不一致'
							 })
							 return 
						}
						const user = await UserModel.findOne({username});
						if(!user){
								const user_id = await this.getId('user_id');
								const registe_time = dtime().format('YYYY-MM-DD HH:mm');
								const newPassword = this.encryption(password);
								const newUser = {username,password:newPassword,user_id};
								const newUserInfo = {username,id:user_id,user_id,email,mobile};
								const createUserInfo = new UserInfoModel(newUserInfo);
								const createUser = new UserModel(newUser);
								const userinfo = await createUserInfo.save();
								const newuser = await createUser.save();
								await createUser.save();
								req.session.user_id = user_id;
								res.send(userinfo);
						}else{
								res.send({
										status:2,
										message:'用户名存在'
								})
							return 
						}
				})

		}
		Md5 (password){
			const md5 = crypto.createHash('md5');
			return md5.update(password).digest('base64');
		}
		encryption (password){
			const newpassword = this.Md5(this.Md5(password).substr(2, 7) + this.Md5(password));
			return newpassword
		}
}

export default new User()