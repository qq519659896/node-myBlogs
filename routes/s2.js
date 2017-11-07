'use strict';

import express from 'express'
import Announce from '../controller/s2/announce'
const router = express.Router();

router.post('/addAnnounce',Announce.addAnnounce);
router.post('/getAnnounceList',Announce.getAnnounceList);
router.post('/updateAnnounce',Announce.updateAnnounce);
router.post('/delAnnounce',Announce.delAnnounce);
router.get('/getAnnounceArticle',Announce.getAnnounceArticle);
router.post('/addList',Announce.addList);
router.post('/getList',Announce.getList);
export default router