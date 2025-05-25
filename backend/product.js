
const pool = require('./db');

async function getProducts() {
  const result = await pool.query('SELECT * FROM products ORDER BY id');
  return result.rows;
}

async function addProduct(product) {
  const { name, description, price, stock } = product;
  const result = await pool.query(
    'INSERT INTO products (name, description, price, stock) VALUES ($1, $2, $3, $4) RETURNING *',
    [name, description, price, stock]
  );
  return result.rows[0];
}

async function deleteProduct(id) {
  await pool.query('DELETE FROM products WHERE id = $1', [id]);
}

module.exports = { getProducts, addProduct, deleteProduct };
