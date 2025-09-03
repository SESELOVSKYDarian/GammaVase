const pool = require('../db/db');

const getIdeas = async (_req, res) => {
  let categoriesRes;
  try {
    categoriesRes = await pool.query(
      'SELECT id, name FROM idea_categories ORDER BY id'
    );
  } catch (err) {
    console.error('Error fetching idea categories:', err);
    return res
      .status(500)
      .json({ error: 'Failed to fetch idea categories', details: err.message });
  }

  let itemsRes;
  try {
    itemsRes = await pool.query(
      'SELECT id, category_id, title, type, url FROM idea_items ORDER BY id'
    );
  } catch (err) {
    console.error('Error fetching idea items:', err);
    return res
      .status(500)
      .json({ error: 'Failed to fetch idea items', details: err.message });
  }

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
};

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const result = await pool.query(
      'INSERT INTO idea_categories(name) VALUES($1) RETURNING id, name',
      [name]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating category:', err);
    res
      .status(500)
      .json({ error: 'Failed to create category', details: err.message });
  }
};

const createItem = async (req, res) => {
  try {
    const { categoryId, title, type, url } = req.body;
    const result = await pool.query(
      `INSERT INTO idea_items(category_id, title, type, url)
       VALUES($1,$2,$3,$4)
       RETURNING id, category_id, title, type, url`,
      [categoryId, title, type, url]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating item:', err);
    res
      .status(500)
      .json({ error: 'Failed to create item', details: err.message });
  }
};

const deleteCategory = async (req, res) => {
  const client = await pool.connect();
  try {
    const { id } = req.params;

    await client.query('BEGIN');
    // Borrar hijos primero para evitar violaciones de FK
    await client.query('DELETE FROM idea_items WHERE category_id=$1', [id]);
    // Borrar la categoría
    const delCat = await client.query('DELETE FROM idea_categories WHERE id=$1', [id]);
    await client.query('COMMIT');

    if (delCat.rowCount === 0) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.sendStatus(204);
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Error deleting category:', err);
    res
      .status(500)
      .json({ error: 'Failed to delete category', details: err.message });
  } finally {
    client.release();
  }
};

const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM idea_items WHERE id=$1', [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }

    res.sendStatus(204);
  } catch (err) {
    console.error('Error deleting item:', err);
    res
      .status(500)
      .json({ error: 'Failed to delete item', details: err.message });
  }
};

module.exports = {
  getIdeas,
  createCategory,
  createItem,
  deleteCategory,
  deleteItem,
};
