
const api = 'http://localhost:3001/api/products';

async function getProducts() {
  const res = await fetch(api);
  return res.json();
}

async function addProduct() {
  const name = document.getElementById('name').value;
  const description = document.getElementById('description').value;
  const price = document.getElementById('price').value;
  const stock = document.getElementById('stock').value;

  await fetch(api, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, description, price, stock }),
  });
  render();
}

async function deleteProduct(id) {
  await fetch(api + '/' + id, { method: 'DELETE' });
  render();
}

async function render() {
  const app = document.getElementById('app');
  const products = await getProducts();
  app.innerHTML = `
    <div>
      <input id="name" placeholder="Nombre" />
      <input id="description" placeholder="Descripción" />
      <input id="price" type="number" placeholder="Precio" />
      <input id="stock" type="number" placeholder="Stock" />
      <button onclick="addProduct()">Agregar</button>
    </div>
    <ul class="product-list">
      ${products.map(p => `
        <li>
          <b>${p.name}</b> - ${p.description} - $${p.price} - Stock: ${p.stock}
          <button onclick="deleteProduct(${p.id})">Eliminar</button>
        </li>
      `).join('')}
    </ul>
  `;
}
window.addProduct = addProduct;
window.deleteProduct = deleteProduct;
window.onload = render;
