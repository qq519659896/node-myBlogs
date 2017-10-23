'use strict';

import formidable from 'formidable'
import dtime from 'time-formater'
import baseComponent from '../../prototype/baseComponent'
import AnnounceModel from '../../models/s2/announce'

class announce extends baseComponent{
		constructor(req,res,next){
		  super();
		  this.add = this.add.bind(this);
		}
		async add(req,res,next){
				const form = new formidable.IncomingForm();
				form.parse(req,async (err, fields, files) => {
						const {content,type,img,user_id} = fields;
						try{
							if(!content){
								throw new Error('输入内容为空');
							}else if(!user_id){
								throw new Error('用户为空');
							}
						}catch(err){
								console.log('参数错误',err);
								res.send({
									status:0,
									type: 'ERROR_QUERY',
									message: err.message
								})
						}
						const announce_id = await this.getId('announce_id');
						const announce_time = dtime().format('YYYY-MM-DD HH:mm');
						const update_time = dtime().format('YYYY-MM-DD HH:mm');
						const newAnnounce = {user_id,type,content,announce_id,announce_time,update_time};
						const creatAnnounce = new AnnounceModel(newAnnounce);
						const resAnnounce = await creatAnnounce.save();
						res.send({
								status:1,
								type: 'SUCCESS',
								data:resAnnounce
						});
				})
				

		}	
		async update(){

		}
		async del(){

		}
}
export default new announce()