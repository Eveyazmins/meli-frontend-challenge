var express = require('express');
var router = express.Router();
const { fetchItems, fetchItemDescription } = require('../services/itemService');

router.get('/', async (req, res) => res.send(await fetchItems(req.query.q)));

router.get('/:id', async (req, res) => res.send(await fetchItemDescription(req.params.id)));

module.exports = router;
