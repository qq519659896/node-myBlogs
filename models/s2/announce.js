'use strict';

import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const announceSchema = new Schema({
	announce_id: Number,
	user_id: String,
	content:String,
	anounce_time:String,
	type:{type:Number,default:0},
	profect_number:{type:Number,default:0},
	comment_number:{type:Number,default:0},
	transmit_number:{type:Number,default:0},
	is_del:{type: Boolean, default: false},
	update_time:String,
	img:[
			{
				original_link:{type:String,default:''},
				thumbnail_link:{type:String,default:''},
				is_del:{type:Boolean,default:false},
				upload_time:{type:String,default:''},
			}
	]
})

announceSchema.index({id:1});
const User = mongoose.model('announce', announceSchema);	

export default User