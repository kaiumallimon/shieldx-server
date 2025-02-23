const testController = require('./../controllers/test.controller');
const express = require('express');
const router = express.Router();


router.get('/', testController.home);

module.exports = router;