CREATE TABLE orders_products (
order_id INT REFERENCES orders(id),
product_id INT REFERENCES products(id),
quantity INT,
PRIMARY KEY (order_id, product_id)
);