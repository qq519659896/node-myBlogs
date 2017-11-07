'use strict';

import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const announceSchema = new Schema({
	announce_id: Number,
	user_id: String,
	content:String,
	announce_time:String,
	type:{type:Number,default:1},  //type: 1为短文本状态，2为短文本加图片， 3 为文章
	profect_number:{type:Number,default:0},
	comment_number:{type:Number,default:0},
	transmit_number:{type:Number,default:0},
	is_del:{type: Boolean, default: false},
	update_time:String,
	txt_url:String,
	img:[
			{
				original_link:{ type: String, default: ''},
				thumbnail_link:{ type: String, default: ''},
				is_del:{ type: Boolean, default:false},
				upload_time:{ type: String, default: ''},
			}
	]
})

announceSchema.index({id:1});
const User = mongoose.model('announce', announceSchema);	

export default User