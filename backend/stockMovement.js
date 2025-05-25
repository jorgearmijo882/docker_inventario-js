
const pool = require('./db');

async function getMovements() {
  const result = await pool.query('SELECT * FROM stock_movements ORDER BY date DESC');
  return result.rows;
}

async function addMovement(movement) {
  const { type, quantity, product_id, user_name } = movement;
  const result = await pool.query(
    `INSERT INTO stock_movements (type, quantity, date, product_id, user_name)
     VALUES ($1, $2, NOW(), $3, $4) RETURNING *`,
    [type, quantity, product_id, user_name]
  );
  await updateProductStock(product_id, quantity, type);
  return result.rows[0];
}

async function updateProductStock(productId, quantity, type) {
  const factor = type === 'entrada' ? 1 : -1;
  await pool.query('UPDATE products SET stock = stock + ($1) WHERE id = $2', [factor * quantity, productId]);
}

module.exports = { getMovements, addMovement };
