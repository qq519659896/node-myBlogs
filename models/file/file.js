'use strict';

import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const fileSchema = new Schema({
		business_type:{type:Number,default:1},
		thumbnail_link:{type:Number,default:''},
		original_link:String,
		business_id:String,
		file_type:String,
		file_name:String,
		file_size:String,
		is_del:{type:Boolean,default:false},
		update_time:String,
})

fileSchema.index({id:1});
const file = mongoose.model('file', fileSchema);	

export default file