const express = require('express')
const bodyParser = require('body-parser')
const db = require('./src/helper/db')
const qs = require('querystring')

const app = express()

//middleware
app.use(bodyParser.urlencoded({extended: false}))

app.post('/items', (req, res)=>{
    const {name, price, description} = req.body
    if(name && price && description){
        db.query(`INSERT INTO items (name, price, description) VALUES ('${name}', ${price}, '${description}')`, (err, result, fields)=>{
            if(!err){
                res.status(201).send({
                    success: true,
                    message: 'Item has been created',
                    data: req.body,
                })
            }else{
                res.status(500).send({
                    success: false,
                    message: 'Internal Server Error',
                })
            }
        })
    }else{
        console.log(err)
        res.status(400).send({
            success: false,
            message: 'All field must be filled!'
        })
    }
})

app.get('/items', (req, res)=>{
    let {page, limit, search} = req.query
    let searchKey = ''
    let searchValue = ''
    if(typeof search == 'object'){
        searchKey = Object.keys(search)[0]
        searchValue = Object.values(search)[0]
    }else{
        searchKey = 'name'
        searchValue = search || ''
    }
    
    if(!limit){
        limit = 5
    }else{
        limit = parseInt(limit)
    }
    if(!page){
        page = 1
    }else{
        page = parseInt(page)
    }
    const offset = (page-1) * limit

    db.query(`SELECT * FROM items WHERE ${searchKey} LIKE '%${searchValue}%' LIMIT ${limit} OFFSET ${offset}`, (err, result, fields)=>{
        if(!err){
            const pageInfo = {
                count: 0,
                pages: 0,
                currentPage: page,
                limitPerPage: limit,
                nextLink: null,
                prevLink: null,
            }
            if(result.length){
                db.query(`SELECT COUNT(*) AS count FROM items WHERE ${searchKey} LIKE '%${searchValue}%'`, (err, data, fields)=>{
                    const {count} = data[0]
                    pageInfo.count = count
                    pageInfo.pages = Math.ceil(count / limit)

                    const {pages, currentPage} = pageInfo

                    if(currentPage < pages){
                        pageInfo.nextLink = `http://localhost:8080/items?${qs.stringify({...req.query, ...{page: page+1}})}`
                    }

                    if(currentPage > 1){
                        pageInfo.prevLink = `http://localhost:8080/items?${qs.stringify({...req.query, ...{page: page-1}})}`
                    }

                    res.send({
                        success: true,
                        message: 'List of items',
                        data: result,
                        pageInfo
                    })
                })
            }else{
                res.send({
                    success: true,
                    message: 'There is no item in list',
                    pageInfo
                })
            }
        }else{
            console.log(err)
            res.status(500).send({
                success: false,
                message: 'Internal Server Error'
            })
        }
    })
})

app.put('/items/:id', (req, res)=>{
    const {id, name, price, description} = req.body
    // console.log(req.body);
    if(name && price && description){
        if(id === req.params.id){
            db.query(`UPDATE items SET name = '${name}', price = ${price}, description = '${description}' WHERE id = ${id}`, (err, result, fields)=>{
                if(!err){
                    res.status(201).send({
                        success: true,
                        message: 'Item has been updated',
                        data: req.body
                    })
                }else{
                    res.status(500).send({
                        success: false,
                        message: 'Internal Server Error',
                    })
                }
            })
        }else{
            res.status(400).send({
                success: false,
                message: 'ID does not match!'
            })
        }
    }else{
        res.status(400).send({
            success: false,
            message: 'All field must be filled!'
        })
    }
})

app.patch('/items/:id', (req, res)=>{
    let updateKey = ''
    let updateValue = ''
    if(typeof req.body == 'object'){
        updateKey = Object.keys(req.body)[0]
        updateValue = Object.values(req.body)[0]
    }
    // console.log(req.body)
    // console.log(updateKey)
    // console.log(updateValue)

    if(updateKey === 'name' || 'description'){
        db.query(`UPDATE items SET ${updateKey} = '${updateValue}' WHERE id = ${req.params.id}`, (err, result, fields)=>{
            if(!err){
                res.status(201).send({
                    success: true,
                    message: 'Item has been updated',
                    data: req.body
                })
            }else{
                res.status(500).send({
                    success: false,
                    message: 'Internal Server Error',
                })
            }
        })
    }else if(updateKey === 'price'){
        db.query(`UPDATE items SET ${updateKey} = ${updateValue} WHERE id = ${req.params.id}`, (err, result, fields)=>{
            if(!err){
                res.status(201).send({
                    success: true,
                    message: 'Item has been updated',
                    data: req.body
                })
            }else{
                res.status(500).send({
                    success: false,
                    message: 'Internal Server Error',
                })
            }
        })
    }
})

app.delete('/items/:id', (req, res)=>{
    db.query(`DELETE FROM items WHERE id = ${req.params.id}`, (err, result, fields)=>{
        if(!err){
            res.status(201).send({
                success: true,
                message: 'Item has been deleted',
                data: req.body
            })
        }else{
            res.status(500).send({
                success: false,
                message: 'Internal Server Error',
            })
        }
    })
})

app.listen(8080, ()=>{
    console.log('App listening on port 8080')
})