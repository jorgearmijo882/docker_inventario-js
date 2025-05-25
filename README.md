# Control de Inventario de Productos

Sistema distribuido para la gestión básica de inventario de productos y control de movimientos de stock.

## Url para acceder al sistema

http://localhost:3000/ 

## Tecnologías utilizadas

- **Backend:** Node.js + Express
- **Frontend:** HTML/CSS/JS (estático, servido por Nginx)
- **Base de datos:** PostgreSQL
- **Orquestación:** Docker y Docker Compose

---

## Cómo ejecutar el sistema

1. **Descomprime el proyecto** y ubica el archivo `docker-compose.yml`.
2. Abre una terminal y navega a esa carpeta.
3. Ejecuta los siguientes comandos (esto borra datos antiguos y asegura la creación de tablas):

   
   docker-compose down -v
   docker-compose up --build

## Estructura del proyecto

inventario_js/
│
├── backend/          # Código fuente Node.js/Express (API REST)
│   ├── app.js
│   ├── db.js
│   ├── product.js
│   ├── stockMovement.js
│   ├── package.json
│   └── Dockerfile
│
├── frontend/         # Interfaz web (HTML, JS, CSS, Dockerfile)
│   ├── index.html
│   ├── app.js
│   ├── style.css
│   └── Dockerfile
│
├── db-init/          # Script de inicialización de tablas SQL
│   └── init.sql
│
└── docker-compose.yml


## Comandos útiles
Acceder al contenedor de PostgreSQL y ejecutar consultas:
Ver el nombre del contenedor:

Copiar
Editar
docker ps
Acceder al bash del contenedor:


Copiar
Editar
docker exec -it inventario_js-db-1 bash
Entrar a PostgreSQL:


Copiar
Editar
psql -U user -d inventorydb
Ejecutar consultas, por ejemplo:

sql
Copiar
Editar
SELECT * FROM products;
SELECT * FROM stock_movements;

## Descripción de módulos y clases
## Backend
app.js: Punto de entrada. Define rutas y arranca el servidor Express.

db.js: Conexión a PostgreSQL usando variables de entorno.

product.js: Funciones CRUD para productos.

stockMovement.js: Funciones para registrar y listar movimientos de stock.

## Frontend
index.html: Página principal con interfaz de usuario.

app.js: Lógica para interactuar con la API REST.

style.css: Estilos básicos.

## Base de datos
db-init/init.sql: Script para crear automáticamente las tablas products y stock_movements al levantar los contenedores.

## ¿Qué endpoints tiene el backend?
GET /api/products – Listar productos

POST /api/products – Crear producto

DELETE /api/products/:id – Eliminar producto

GET /api/movements – Listar movimientos de stock

POST /api/movements – Registrar movimiento (no usado aún en frontend simple)

## Notas
El frontend consume el backend en http://localhost:3001.

Si haces cambios en el backend o frontend, reinicia los contenedores con docker-compose up --build.

Todos los datos se persisten aunque apagues los contenedores, a menos que uses docker-compose down -v.

## Cómo construir y subir imágenes a Docker Hub

1. **Crea una cuenta en Docker Hub:**  
   [https://hub.docker.com/](https://hub.docker.com/)

2. **Inicia sesión desde la terminal:**

   docker login

3. **Construye las imágenes del backend y frontend:**  

   docker build -t TUUSUARIO/inventario-backend:latest ./backend
   docker build -t TUUSUARIO/inventario-frontend:latest ./frontend

   Reemplaza TUUSUARIO por tu usuario real de Docker Hub.

4. **Sube las imágenes a Docker Hub:**

   docker push TUUSUARIO/inventario-backend:latest
   docker push TUUSUARIO/inventario-frontend:latest

   Verifica las imágenes en tu cuenta Docker Hub:
   Entra a hub.docker.com y revisa tu repositorio.