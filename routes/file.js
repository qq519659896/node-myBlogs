'use strict';

import express from 'express'
import File from '../controller/file/file'

const router = express.Router();

router.post('/onLoadFile',File.onLoadFile);
router.get('/downLoad',File.downLoad);
router.get('/getFileList',File.getFileList);
router.get('/delFile',File.delFile);
export default router