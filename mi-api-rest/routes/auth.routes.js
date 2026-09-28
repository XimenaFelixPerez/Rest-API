const { Router } = require('express');
const router = Router();
const controller = require('../controllers/auth.controller');

router.post('/', controller.login);

module.exports = router;