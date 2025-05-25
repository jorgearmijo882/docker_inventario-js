
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

const productModel = require('./product');
const movementModel = require('./stockMovement');

app.use(cors());
app.use(express.json());

app.get('/api/products', async (req, res) => {
  const products = await productModel.getProducts();
  res.json(products);
});

app.post('/api/products', async (req, res) => {
  const product = await productModel.addProduct(req.body);
  res.json(product);
});

app.delete('/api/products/:id', async (req, res) => {
  await productModel.deleteProduct(req.params.id);
  res.sendStatus(204);
});

app.get('/api/movements', async (req, res) => {
  const movements = await movementModel.getMovements();
  res.json(movements);
});

app.post('/api/movements', async (req, res) => {
  const movement = await movementModel.addMovement(req.body);
  res.json(movement);
});

app.listen(port, () => {
  console.log(`Backend corriendo en http://localhost:${port}`);
});
