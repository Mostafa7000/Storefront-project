# Store Front API

## Table of Contents
1. Description
2. How to set up database?
3. Technologies used
4. The author
5. Credits

---

## Description

This is the backend of a merchant website.

## How to set up the project?

Install npm packages by running the command `npm install`

## How to set up the Databse?

1. Install Postgres SQL server on your machine
2. open Postgres shell (psql) and connect to the default postgres database
3. run the following to create new user
    - `CREATE ROLE mostafa WITH PASSWORD '9187';`
4. run the following to create development and test databases
    - `CREATE DATABASE store;`
    - `CREATE DATABASE store_test;`
5. connect to the store database with command
    - `\c store`
6. now run the following command to give newly created user a control over the databases
    - `GRANT ALL PRIVILEGES ON DATABASE store TO mostafa;`
    - `GRANT ALL PRIVILEGES ON DATABASE store_test TO mostafa;`
    - `GRANT ALL PRIVILEGES ON SCHEMA public TO mostafa;`

7. Run `db-migrate up -e 'dev'` to set up development database tables
8. Run `npm run start` to get the server up and running using nodemon
9. Run `npm run build` to build the project
10. Run `npm run test` to test the models, **but make sure you are on a windows machine, otherwie the command 'set' will not be recognized, and you will have to remove it from the script in the package.json file**
11. Once set, you can run the final server using `node .` in the dist folder.



## Technologies used

- TypeScript
- Node.js
- Express.js
- pg
- db-migrate
- Jasmine
- ESLint & Prettier
- Plethora of other npm packages


## The author

**Name:** Mostafa Tarek
**Specialization:** Computer Science, 3^rd^ year
**Organization:** Cairo University

## Credits

I owe a big credit to [MDN](https://developer.mozilla.org/en-US/docs/Learn/JavaScript) for learning about the different functions I used throughout this project, also I read the documentation of Express functions in [Express](https://expressjs.com/).