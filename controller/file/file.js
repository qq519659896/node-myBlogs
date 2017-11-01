'use strict';

import formidable from 'formidable'
import dtime from 'time-formater'
import baseComponent from '../../prototype/baseComponent'
import FileModel from '../../models/file/file'
import path from 'path'
import fs from 'fs' 
class onLoad extends baseComponent{
		constructor() {
				super();
		}
		async onLoadFile(req,res,next) {
				const form = new formidable.IncomingForm();
				form.uploadDir = "./uploads";//修改文件上传默认的存储路径;
				form.encoding = 'utf-8';     //设置编辑
				//name名称为files
				form.parse(req,async (err, fields, files) => {
						const {business_id}  = fields;
						if(!business_id) {
								res.send({
										status:2,
										Msg:'参数错误',
								})
								return 
						}
						//const filesData = files;
						//const {}
						const randomNumber = parseInt(Math.random() * 8999 +10000) + dtime().format('YYYYMMDDHHmm');
						const file_type = path.extname(files.files.name);
						const file_size = files.files.size;
						const file_name = files.files.name;

						const update_time = dtime().format('YYYY-MM-DD HH:mm');
						const rootPath = path.dirname(require.main.filename);
						console.log(rootPath)
						const oldPath = rootPath + '/' + files.files.path;
						const newPath = rootPath + '/uploads/' + randomNumber + file_type;
						const original_link = 'uploads/'+randomNumber+file_type;
						fs.rename(oldPath,newPath,async function(err){
								try{
									if(err){
											throw Error('改名失败');
									}
								}catch(err){
										console.log(err);
								}
								try{
										const newFile = {business_id,original_link,file_type,file_name,file_size,update_time};
										const creatFileModel = new FileModel(newFile);
										const resData = await creatFileModel.save();
										res.send({
												status:1,
												Msg:'上传成功',
												data:resData
										});
										return 
								}catch(err){
										console.log('数据库错误',err);
										res.send({
												status:3,
												error:err
										})
										return 
								}
						})
						//const original_link;
						
						//const creatFileModel = new FileModel({business_id,original_link,file_type,file_name,file_size,update_time});
						//const resFile = await creatFileModel.save();

						
				})
		}
		async downLoad(req,res,next) {
				console.log(req.query);
				if(!req.query.url){
						res.send({
								status:2,
								Msg:'参数错误'
						})
						return 
				}
				const filePath = req.query.url;
				res.download(filePath);
		}
		async getFileList(req,res,next) {
				if(!req.query.id){
						res.send({
								status:2,
								Msg:'参数错误',
						})
						return 
				}
				const id = req.query.id;
				try{
						const Rows = await FileModel.find({business_id:id,is_del:false},{original_link:1,business_id:1,file_type:1,file_name:1,file_size:1});
						res.send({
								status:1,
								Msg:'成功',
								data:Rows,
						})
				}catch(err){
						console.log('数据库错误',err);
						res.send({
								status:3,
								Msg:'数据库错误',
						})
						return 
				}
		}
		async delFile(req,res,next) {
				if(!req.query.id){
						res.send({
								status:2,
								Msg:'参数错误'
						})
						return 
				}
				const _id = req.query.id;
				try{
						await FileModel.update({_id},{$set:{is_del:true}});
						res.send({
								status:1,
								Msg:'删除成功',
						})
				}catch(err){
						console.log('数据库错误',err);
						res.send({
								status:3,
								Msg:'数据库错误',
						})
						return 
				}
				

		}
}
export default new onLoad()