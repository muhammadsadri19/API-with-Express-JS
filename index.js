const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')

const db = require('./connection')
const response = require('./response')

app.use(bodyParser.json())


app.get('/users', (req, res) => {
    const querySql = "SELECT * FROM tb_mahasiswa"
  db.query(querySql, (error, result) => {
    response(200, result, "Semua data mahasiswa", res)
  })
})

app.post('/login', (req, res) => {
    console.log({
        requstFromOutside : req.body
    })
    res.send('Anda sudah login')
})

app.put('/username', (req, res) => {
    console.log({
        updateData : req.body
    })
    res.send('Data sudah update')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})