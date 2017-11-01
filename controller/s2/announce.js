'use strict';

import formidable from 'formidable'
import dtime from 'time-formater'
import baseComponent from '../../prototype/baseComponent'
import AnnounceModel from '../../models/s2/announce'
import TestListModel from '../../models/s2/testList'


class announce extends baseComponent{
		constructor(req,res,next){
		  super();
		  this.add = this.add.bind(this);
		}
		async add(req,res,next){
				const form = new formidable.IncomingForm();
				form.parse(req,async (err, fields, files) => {
						const {content,type,img,user_id} = fields;
						console.log(content,type,user_id,img);
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
								return 
						}
						const announce_id = await this.getId('announce_id');
						const announce_time = dtime().format('YYYY-MM-DD HH:mm');
						const update_time = dtime().format('YYYY-MM-DD HH:mm');
						const newAnnounce = {user_id,type,content,announce_id,announce_time,update_time};
						const creatAnnounce = new AnnounceModel(newAnnounce);
						const resAnnounce = await creatAnnounce.save();
						console.log(announce_time,update_time);
						res.send({
								status:1,
								type: 'SUCCESS',
								data:resAnnounce
						});

				})
				

		}
		async getAnnounceList(){
				const params = req.body;
				const {PageIndex = 1,PageCount = 10,StartDate,EndDate,Sort,OrderType} = params;
				try{
						const Rows = await AnnounceModel.find().limit(Number(PageCount)).skip((Number(PageIndex)-1)*Number(PageCount));
						const Total = await AnnounceModel.count();
						
				}catch(err){
						console.log('参数错误',err);
						res.send({
							status:0,
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
		async updateAnnounce(){
				const {announce_id} = req.body;
				const form = new formidable.IncomingForm();
				form.parse(req,async (err, fields, files) => {
						if(err){
							 res.send({
							 		status:0,
							 		type:'QUERY_FAIL',
							 		msg:'表单信息错误'
							 })
							return 
						}
						const {type,content,announce_id} = fields;
				})
				try{

				}catch(err){

				}
		}
		async delAnnounce(){

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
					//Number(PageCount)   Number((PageIndex-1)*PageCount)
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
							data:resData						
						});
				})
		}
}
export default new announce()