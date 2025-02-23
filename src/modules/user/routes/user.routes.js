const express = require('express');
const router = express.Router();
const userController = require('./../controller/user.controller');
const middlware = require('./../../../middlewares/auth.middleware');

router.post('/me',middlware.authMiddleware,userController.getUserInfo);

module.exports = router;