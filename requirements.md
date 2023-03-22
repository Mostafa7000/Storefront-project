## Table schema

### users
#### (id SERIAL PRIMARY KEY, fname VARCHAR(20) NOT NULL, lname VARCHAR(20) NOT NULL, password VARCHAR(100) NOT NULL)

### orders
#### (id SERIAL PRIMARY KEY, user_id INT REFERENCES users (id), status VARCHAR(10) CHECK (status BETWEEN 'active' and 'complete'))

### products
#### (id SERIAL PRIMARY KEY, name VARCHAR(50) NOT NULL, price INT NOT NULL, category VARCHAR(50))

### orders_products
#### (order_id INT REFERENCES orders(id), product_id INT REFERENCES products(id), quantity INT, PRIMARY KEY (order_id, product_id))
 
---

## API Endpoints
#### Products
- Index
    - **Get** 127.0.0.1:8000/products
- Show (args: product id)
    - **Get** 127.0.0.1:8000/products/:id
- Create (args: Product)[token required]
    - **Post** 127.0.0.1:8000/products
- Top 5 most popular products
    - **Get** 127.0.0.1:8000/products/top/5

#### Users
- Index [token required]
    - **Get** 127.0.0.1:8000/users
- Show (args: id)[token required]
    - **Get** 127.0.0.1:8000/users/:id
- Create (args: User)[token required]
    - **Post** 127.0.0.1:8000/users

#### Orders
- Adding product to an order
    - **Post** 127.0.0.1:8000/orders/:order_id/products
- Current Order by user (args: user id)[token required]
    - **Get** 127.0.0.1:8000/orders/active/:user_id
- Completed Orders by user (args: user id)[token required]
    - **Get** 127.0.0.1:8000/orders/completed/:user_id


