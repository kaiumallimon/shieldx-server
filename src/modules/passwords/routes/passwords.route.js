const express = require('express');
const router = express.Router();
const passwordController = require('../controllers/passwords.controller');
const middlware = require('../../../middlewares/auth.middleware');


router.post('/store',middlware.authMiddleware, passwordController.storePassword);
router.get('/all/:userId',middlware.authMiddleware, passwordController.getAllPasswords);
router.get('/single/:passwordId',middlware.authMiddleware, passwordController.getPasswordById);
router.delete('/delete/:passwordId',middlware.authMiddleware, passwordController.deletePassword);
router.post('/update',middlware.authMiddleware, passwordController.updatePassword);


module.exports = router;