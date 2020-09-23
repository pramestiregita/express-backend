<h1 align="center">ExpressJS - Ecommerce Database Administrator</h1>



This is a simple Database Administrator application specially for backend only. Built with NodeJs using the ExpressJs Framework.
Express.js is a web application framework for Node.js. [More about Express](https://en.wikipedia.org/wiki/Express.js)

## Built With
[![Express.js](https://img.shields.io/badge/Express.js-4.x-orange.svg?style=rounded-square)](https://expressjs.com/en/starter/installing.html)
[![Node.js](https://img.shields.io/badge/Node.js-v.12.18.3-green.svg?style=rounded-square)](https://nodejs.org/)

## Requirements
1. <a href="https://nodejs.org/en/download/">Node Js</a>
2. Node_modules
3. <a href="https://www.getpostman.com/">Postman</a>
4. Web Server (ex. localhost)

## How to run the app ?
1. Open app's directory in CMD or Terminal
2. Type `npm install`
3. Make new file a called **.env**, set up first [here](#set-up-env-file)
4. Turn on Web Server and MySQL can using Third-party tool like xampp, etc.
6. Open Postman desktop application or Chrome web app extension that has installed before
7. Choose HTTP Method and enter request url.(ex. localhost:8080/)
8. You can see all the end point [here](#end-point)

## End Point

**1. POST**

* `/items` (Add data to table items)
    * ``` { "name": "T-Shirt", "price": 100000, "description": "A T-shirt, or tee shirt, is a style of fabric shirt named after the T shape of its body and sleeves."} ```
* id [default = Auto-increment]

**2. GET**

* `/items`(Get  All items)



* `/items?page=1&limit=5` (Get All items in page 1 with limit data 5)
* page [default = 1], limit [default = 5]



* `/items?search=by` (Get All items based on related search key)
* search key [default = name]



* `/items/:id` (Get all detail on related id number)

**5. PUT**

* `/items/:id` (Update all column in items by id)
  
   * `{"name": "Dress", "price": 200000, "description": "A dress (also known as a frock or a gown) is a garment traditionally worn by women or girls consisting of a skirt with an attached bodice"}`   

**4. PATCH**

* `/items/:id` (Update specific column in items by id)
  
   * `{"price" : 80000}`   

**5. DELETE**

* `/items/:id` (Delete items by id)

  