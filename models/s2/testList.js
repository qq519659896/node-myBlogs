'use strict';

import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const testListSchema = new Schema({
		custom:String,
		status:String,
		sales_name:String,
		folio:String,
		sn:String,
		product_code:String,
		updata_time:String,
		status:String,
		handle:{
			type:Number,
			default:1
		}

})

testListSchema.index({id:1});
const testList = mongoose.model('testList', testListSchema);	

export default testList