'use strict';

import formidable from 'formidable'
import dtime from 'time-formater'
import baseComponent from '../../prototype/baseComponent'
import AnnounceModel from '../../models/s2/announce'
import TestListModel from '../../models/s2/testList'
import fs from 'fs'
import {rootPath} from '../../config/default'
class announce extends baseComponent{
		constructor(req,res,next){
		  super();
		  this.addAnnounce = this.addAnnounce.bind(this);
		}
		async addAnnounce(req,res,next){
				console.log(req.body, req.body.content);
				const form = new formidable.IncomingForm();
				form.encoding = 'utf-8';
				form.parse(req,async (err, fields, files) => {
						const { type, img, user_id } = fields;
						let { content } = fields;
						console.log(content, type, user_id, img);
						try{ 
								if(!content){ 
									throw new Error('输入内容为空');
								}else if(!user_id){
									throw new Error('用户为空');
								}
						}catch(err) {
								console.log('参数错误', err);
								res.send({
									status: 0,
									type: 'ERROR_QUERY',
									message: err.message
								})
								return 
						}
						// if(content.length > 200 && type === 1){
						// 		fs.writeFile(`${rootPath}`)
						// }
						try{
								const announce_id = await this.getId('announce_id');
								const announce_time = dtime().format('YYYY-MM-DD HH:mm');
								const update_time = dtime().format('YYYY-MM-DD HH:mm');
								const tempUrl = `/public/article/${this.randomNumber()}.txt`;
								//内容为文章的时候保存text文件
								if(content.length > 200){
									await fs.writeFile(`${rootPath+tempUrl}`, content, (err) => {
										if(err){
												console.log('生成txt失败');
												throw new Error(err)
												return 
										}
									});
									content = content.substring(0,200);
								}
								const txt_url = tempUrl;
								const newAnnounce = { user_id, type, content, announce_id, announce_time, update_time, txt_url };
								const creatAnnounce = new AnnounceModel(newAnnounce);
								const resAnnounce = await creatAnnounce.save();
								console.log( announce_time, update_time );
								res.send({
										status: 1,
										type: 'SUCCESS',
										data: newAnnounce,
								});
						} catch (err) {
								console.log('数据库错误',err);
								res.send({
										status:3,
										msg:'数据库错误',
								})
						}
				})
		}
		async getAnnounceList(req,res,next) {
				const params = req.body;
				const {PageIndex = 1,PageCount = 10,StartDate,EndDate,Sort,OrderType} = params;
				try{
						const Rows = await AnnounceModel.find({is_del:false}).limit(Number(PageCount)).skip((Number(PageIndex)-1)*Number(PageCount));
						const Total = await AnnounceModel.count();	
				}catch(err){
						console.log('参数错误',err);
						res.send({
							status:2,
							type:"FAIL",
							msg:err
						})
						return 
				}
				res.send({
						status:1,
						type:"SUCCESS",
						rows:Rows,
						total:Total
				})
		}
		async updateAnnounce(req,res,next){
				const form = new formidable.IncomingForm();
				form.parse(req,async (err, fields, files) => {
						if(err){
						  res.send({
						 		status:2,
						 		msg:'表单信息错误',
						  })
							return;
						}
						const update_time = dtime().format('YYYY-MM-DD HH:mm');
						const { type, announce_id, content, profect_number, comment_number, transmit_number } = fields;
						if(!announce_id) {
							res.send({
								status:2,
								msg:'参数错误',
							})
							return; 
						}
						const newData = { type, content, profect_number, comment_number, transmit_number, update_time };
						for(var val in newData){
							if(newData[val] === undefined) delete newData[val];
						}
						try{
							await AnnounceModel.findOneAndUpdate({announce_id},{$set:newData});
							res.send({
								status:1,
								msg:'更新成功'
							})
						}catch(err) {
							console.log('数据库错误',err);
							res.send({
								status:3,
								msg:'数据库错误',
							})
							return; 
						}
				})
		}
		async getAnnounceArticle(req, res, next) {
				const {announce_id} = req.query;
				try{
						if(!announce_id) {
							 	throw new Error('参数错误');
						}
						const resData = await AnnounceModel.find({announce_id});
						let {txt_url} = resData[0];
						if(!txt_url) throw new Error('未找到数据');
						const txtData = fs.readFileSync(`${rootPath+txt_url}`).toString(); //读取文件
						res.send({
								status:1,
								msg:'成功',
								data:txtData,
						})
				} catch (error) {
						console.log('参数错误',error);
						res.send({
								status:3,
								msg:error
						})	
				}
		}
		async delAnnounce(req,res,next) {
				const { announce_id } = req.query;
				if(!announce_id){
						res.send({
								status:2,
								msg:'参数错误',
						})
						return 
				}
				try{
						await AnnounceModel.findOneAndUpdate({ announce_id },{ $set:{ is_del: true }});
						res.send({
								status:1,
								msg:'删除成功'
						})
				}catch(err) {
						console.log('数据库错误', err);
						res.send({
								status:2,
								msg:'数据库错误'
						})
				} 
		}
		//测试接口
		async getList(req,res,next) {
				let params = req.body;
				const searchObj = {};
				params.forEach((item,idx) => {
						searchObj[item.split('^')[0]] = item.split('^')[1];
				})
				console.log(searchObj);
				try{
					const {PageIndex,PageCount,StartDate,EndDate,Sort,OrderType} = searchObj;
					const Rows = await TestListModel.find().sort({updata_time:-1}).limit(Number(PageCount)).skip(Number((PageIndex-1)*PageCount));
					const Counts = await TestListModel.count();
					console.log(Rows);
					res.send({
							Code:1000,
							Msg:"成功",
							DataValue:{
								Total:Counts,
								Rows:Rows
							}
					});
				}catch(err){
					console.log('参数错误',err);
					res.send({
						status:0,
						type: 'ERROR_QUERY',
						message: err.message
					})
				}
		}
		//测试接口
		async addList(req,res,next) {
				const form = new formidable.IncomingForm();
				form.parse(req, async (err, fields, files) => {
						const {custom,status,sales_name,folio,sn,product_code} = fields;
						const updata_time = dtime().format('YYYY-MM-DD HH:mm');
						const newData = {custom,status,sales_name,folio,sn,product_code,updata_time};
						const createTestList = new TestListModel(newData);
						const resData = await createTestList.save();
						res.send({
							status:1,
							type:'SUCCESS',
							data:resData,			
						});
				})
		}
}
export default new announce()