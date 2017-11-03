'use strict';

import dtime from 'time-formater'
import UserInfoModel from '../../models/s1/userInfo'
import formidable from 'formidable'

class userInfo {
		updateUserInfo(req,res,next) {
				const form = new formidable.IncomingForm();
				form.parse(req, async (err, fields, files) => {
						if(err){
								res.send({
										status:2,
										msg:'表单信息错误'
								})
								return 
						}
						const {avatar, email, mobile, adress, age, school, personal_elucidation, user_id} = fields;
						const update_time = dtime().format('YYYY-MM-DD HH:mm');
						const newData = {avatar, email, mobile, adress, age, school, personal_elucidation, user_id};	
						for(var val in newData){
								if(newData[val] === undefined) delete newData[val];
						}
						console.log(newData);
						try{
							await UserInfoModel.findOneAndUpdate({user_id}, {$set: newData});
							res.send({
									status:1,
									msg:'更新成功'
							})
						} catch (error) {
							console.log('数据库错误',error);
							res.send({
									status:3,
									msg:'数据库错误'
							})
						}
						
				})
		}
} 
export default new userInfo()