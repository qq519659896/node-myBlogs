'use strict';

import express from 'express'
import Announce from '../controller/s2/announce'
const router = express.Router();

router.post('/add',Announce.add);
router.post('/getList',Announce.getList);
router.post('/addList',Announce.addList);
export default router