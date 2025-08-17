const express = require('express');
const router = express.Router();
const { getIdeas, createCategory, createItem, deleteCategory, deleteItem } = require('../controllers/ideasController');

router.get('/', getIdeas);
router.post('/categories', createCategory);
router.post('/items', createItem);
router.delete('/categories/:id', deleteCategory);
router.delete('/items/:id', deleteItem);

module.exports = router;
