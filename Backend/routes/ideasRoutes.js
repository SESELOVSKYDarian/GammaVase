const express = require('express');
const router = express.Router();
const { getIdeas, createCategory, createItem } = require('../controllers/ideasController');

router.get('/', getIdeas);
router.post('/categories', createCategory);
router.post('/items', createItem);

module.exports = router;
