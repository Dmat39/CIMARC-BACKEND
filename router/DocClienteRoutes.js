const express = require('express');
const { admin,subirdoc } = require('../Controllers/DocClienteController.js');

const router = express.Router();

router.get('/subir-documentos', admin);
router.get('/documentos', subirdoc);

module.exports = router;