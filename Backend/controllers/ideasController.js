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
    const { name } = req.body;
    const imagePath = req.file ? `/ideas/${req.file.filename}` : null;
    const result = await pool.query(
      'INSERT INTO idea_categories(name, image_url) VALUES($1,$2) RETURNING id, name, image_url',
      [name, imagePath]
    );
    res.status(201).json({ id: result.rows[0].id, name: result.rows[0].name, imageUrl: result.rows[0].image_url });
  } catch (err) {
    console.error('Error creating category', err);
    res.status(500).json({ error: 'Error creating category' });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const imagePath = req.file ? `/ideas/${req.file.filename}` : null;
    const fields = [name];
    let query = 'UPDATE idea_categories SET name=$1';
    if (imagePath) {
      query += ', image_url=$2 WHERE id=$3 RETURNING id, name, image_url';
      fields.push(imagePath, id);
    } else {
      query += ' WHERE id=$2 RETURNING id, name, image_url';
      fields.push(id);
    }
    const result = await pool.query(query, fields);
    if (!result.rows.length) return res.status(404).json({ error: 'Category not found' });
    res.json({ id: result.rows[0].id, name: result.rows[0].name, imageUrl: result.rows[0].image_url });
  } catch (err) {
    console.error('Error updating category', err);
    res.status(500).json({ error: 'Error updating category' });
  }
};

const createItem = async (req, res) => {
  try {
    const { categoryId, title, type, url, imageUrl } = req.body;
    let finalUrl = url;
    if (type === 'pdf' && req.files && req.files.file) {
      finalUrl = `/ideas/${req.files.file[0].filename}`;
    }
    const imagePath = req.files && req.files.image
      ? `/ideas/${req.files.image[0].filename}`
      : imageUrl;
    const result = await pool.query(
      `INSERT INTO idea_items(category_id, title, type, url, image_url)
       VALUES($1,$2,$3,$4,$5)
       RETURNING id, category_id, title, type, url, image_url`,
      [categoryId, title, type, finalUrl, imagePath]
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

const updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { categoryId, title, type, url, imageUrl } = req.body;
    let finalUrl = url;
    if (type === 'pdf' && req.files && req.files.file) {
      finalUrl = `/ideas/${req.files.file[0].filename}`;
    }
    const imagePath = req.files && req.files.image
      ? `/ideas/${req.files.image[0].filename}`
      : imageUrl;
    const result = await pool.query(
      `UPDATE idea_items SET category_id=$1, title=$2, type=$3, url=$4, image_url=$5 WHERE id=$6 RETURNING id, category_id, title, type, url, image_url`,
      [categoryId, title, type, finalUrl, imagePath, id]
    );
    if (!result.rows.length) return res.status(404).json({ error: 'Item not found' });
    res.json({
      id: result.rows[0].id,
      category_id: result.rows[0].category_id,
      title: result.rows[0].title,
      type: result.rows[0].type,
      url: result.rows[0].url,
      imageUrl: result.rows[0].image_url,
    });
  } catch (err) {
    console.error('Error updating item', err);
    res.status(500).json({ error: 'Error updating item' });
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
  updateCategory,
  createItem,
  updateItem,
  deleteCategory,
  deleteItem,
};
