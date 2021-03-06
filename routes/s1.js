'use strict';

import express from 'express'
import User from '../controller/s1/user'
import UserInfo from '../controller/s1/userInfo'

const router = express.Router();

router.post('/login', User.login);
router.get('/loginOut',User.loginOut);
router.get('/securityCode',User.securityCode);
router.post('/register',User.register);
router.post('/updateUserInfo',UserInfo.updateUserInfo);
export default router