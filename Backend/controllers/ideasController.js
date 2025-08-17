const pool = require('../db/db');

const getIdeas = async (_req, res) => {
  try {
    const categoriesRes = await pool.query('SELECT id, name FROM idea_categories ORDER BY id');
    const itemsRes = await pool.query('SELECT id, category_id, title, type, url FROM idea_items ORDER BY id');
    const categories = categoriesRes.rows.map((cat) => ({
      id: cat.id,
      name: cat.name,
      cards: itemsRes.rows
        .filter((item) => item.category_id === cat.id)
        .map((item) => ({
          id: item.id,
          title: item.title,
          type: item.type,
          url: item.url,
        })),
    }));
    res.json(categories);
  } catch (err) {
    console.error('Error fetching ideas', err);
    res.status(500).json({ error: 'Error fetching ideas' });
  }
};

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const result = await pool.query('INSERT INTO idea_categories(name) VALUES($1) RETURNING id, name', [name]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating category', err);
    res.status(500).json({ error: 'Error creating category' });
  }
};

const createItem = async (req, res) => {
  try {
    const { categoryId, title, type, url } = req.body;
    const result = await pool.query(
      'INSERT INTO idea_items(category_id, title, type, url) VALUES($1,$2,$3,$4) RETURNING id, category_id, title, type, url',
      [categoryId, title, type, url]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating item', err);
    res.status(500).json({ error: 'Error creating item' });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM idea_categories WHERE id=$1', [id]);
    res.sendStatus(204);
  } catch (err) {
    console.error('Error deleting category', err);
    res.status(500).json({ error: 'Error deleting category' });
  }
};

const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM idea_items WHERE id=$1', [id]);
    res.sendStatus(204);
  } catch (err) {
    console.error('Error deleting item', err);
    res.status(500).json({ error: 'Error deleting item' });
  }
};

module.exports = { getIdeas, createCategory, createItem, deleteCategory, deleteItem };
