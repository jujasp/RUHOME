'use strict'
const express = require('express')
const volleyball = require('volleyball')
const bodyParser = require('body-parser')
const path = require('path')

const app = express()
const port = process.env.PORT || 3000

app.use(volleyball)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static(path.join(__dirname, '/public')))

app.use(express.static(path.join(__dirname, '/components'))
)

app.listen(port)

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'))
})
