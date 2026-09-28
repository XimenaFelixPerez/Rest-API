const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.send('API funcionando correctamente');
});

router.get('/marco', (req, res) => {
    res.json({ nombre: 'Ximena ', Apellidos: 'Felix Perez', proyecto: 'REST API' });
});

router.get('/ping', (req, res) => {
    res.json({ message: 'pong' });
});

module.exports = router;