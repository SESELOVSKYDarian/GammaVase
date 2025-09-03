const pool = require('../db/db');

const getIdeas = async (_req, res) => {
  try {
    const categoriesRes = await pool.query(
      'SELECT id, name, image_url FROM idea_categories ORDER BY id'
    );
    const itemsRes = await pool.query(
      'SELECT id, category_id, title, type, url, image_url FROM idea_items ORDER BY id'
    );

    const categories = categoriesRes.rows.map((cat) => ({
      id: cat.id,
      name: cat.name,
      imageUrl: cat.image_url,
      cards: itemsRes.rows
        .filter((item) => item.category_id === cat.id)
        .map((item) => ({
          id: item.id,
          title: item.title,
          type: item.type,
          url: item.url,
          imageUrl: item.image_url,
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
    const { name, imageUrl } = req.body;
    const result = await pool.query(
      'INSERT INTO idea_categories(name, image_url) VALUES($1,$2) RETURNING id, name, image_url',
      [name, imageUrl]
    );
    res.status(201).json({ id: result.rows[0].id, name: result.rows[0].name, imageUrl: result.rows[0].image_url });
  } catch (err) {
    console.error('Error creating category', err);
    res.status(500).json({ error: 'Error creating category' });
  }
};

const createItem = async (req, res) => {
  try {
    const { categoryId, title, type, url, imageUrl } = req.body;
    const result = await pool.query(
      `INSERT INTO idea_items(category_id, title, type, url, image_url)
       VALUES($1,$2,$3,$4,$5)
       RETURNING id, category_id, title, type, url, image_url`,
      [categoryId, title, type, url, imageUrl]
    );
    res.status(201).json({
      id: result.rows[0].id,
      category_id: result.rows[0].category_id,
      title: result.rows[0].title,
      type: result.rows[0].type,
      url: result.rows[0].url,
      imageUrl: result.rows[0].image_url,
    });
  } catch (err) {
    console.error('Error creating item', err);
    res.status(500).json({ error: 'Error creating item' });
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
    console.error('Error deleting category', err);
    res.status(500).json({ error: 'Error deleting category' });
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
    console.error('Error deleting item', err);
    res.status(500).json({ error: 'Error deleting item' });
  }
};

module.exports = {
  getIdeas,
  createCategory,
  createItem,
  deleteCategory,
  deleteItem,
};
