
'use strict';

import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const userInfoSchema = new Schema({
	avatar: {type: String, default: 'default.jpg'},
	balance: {type: Number, default: 0},
	brand_member_new: {type: Number, default: 0},
	current_address_id: {type: Number, default: 0},
	current_invoice_id: {type: Number, default: 0},
	email: {type: String, default: ''},
	registe_time: String,
	id: Number,
	user_id: Number,
	is_email_valid: {type: Boolean, default: false},
	is_mobile_valid: {type: Boolean, default: true},
	mobile: {type: String, default: ''},
	username: String,
	column_desc: {
		game_desc: {type: String, default: '这是一个测试'},
		game_image_hash: {type: String, default: '05f108ca4e0c543488799f0c7c708cb1jpeg'},
		game_is_show: {type: Number, default: 1},
		game_link: {type: String, default: 'https://gamecenter.faas.ele.me'},
		gift_mall_desc: {type: String, default: '这是一个测试'},
	},
})

userInfoSchema.index({id: 1});


const UserInfo = mongoose.model('UserInfo', userInfoSchema);

export default UserInfo