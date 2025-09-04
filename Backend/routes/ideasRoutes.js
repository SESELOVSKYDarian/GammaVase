const express = require('express');
const router = express.Router();
const uploadIdeas = require('../middlewares/ideasUpload');
const {
  getIdeas,
  createCategory,
  updateCategory,
  createItem,
  updateItem,
  deleteCategory,
  deleteItem,
} = require('../controllers/ideasController');

router.get('/', getIdeas);
router.post('/categories', uploadIdeas.single('image'), createCategory);
router.put('/categories/:id', uploadIdeas.single('image'), updateCategory);
router.post('/items', uploadIdeas.single('file'), createItem);
router.put('/items/:id', uploadIdeas.single('file'), updateItem);
router.delete('/categories/:id', deleteCategory);
router.delete('/items/:id', deleteItem);

module.exports = router;
