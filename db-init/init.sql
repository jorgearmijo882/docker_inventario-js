
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    description TEXT,
    price NUMERIC,
    stock INTEGER
);

CREATE TABLE IF NOT EXISTS stock_movements (
    id SERIAL PRIMARY KEY,
    type VARCHAR(20),
    quantity INTEGER,
    date TIMESTAMP,
    product_id INTEGER REFERENCES products(id),
    user_name VARCHAR(100)
);
