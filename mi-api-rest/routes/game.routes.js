const { Router } = require('express');
const router = Router();
const controller = require('../controllers/game.controller');

router.get('/:user_id', controller.getGameUser);
router.put('/:user_id', controller.updatePoints);

module.exports = router;