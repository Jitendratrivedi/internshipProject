const express = require('express');
const router = express.Router();

const collegeController=require('../controllers/collegeController')

const interController=require('../controllers/interncontroller')



router.post('/functionup/colleges',collegeController.createcollege)

router.post('/functionup/interns',interController.createIntern)

router.get('/functionup/collegeDetails',collegeController.collegeDetails)

module.exports = router;


