
'use strict';

import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const userInfoSchema = new Schema({
	avatar: { type: String, default: 'default.jpg'},
	email: { type: String, default: '' },
	username: String,
	registe_time: String,
	update_time: String,
	mobile: { type: String, default: '' },
	adress: { type: String, default: '' },
	age: { type: String, default: 0 },
	school: { type: String, default: '' },
	personal_elucidation: {type: String, default:'' },
	friends_number: { type: String, default: 0 },
	id: Number,
	user_id: Number,
	is_del:{ type: Boolean, default: false },
})

userInfoSchema.index({id: 1});


const UserInfo = mongoose.model('UserInfo', userInfoSchema);

export default UserInfo