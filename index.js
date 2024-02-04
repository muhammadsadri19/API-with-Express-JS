const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')

const db = require('./connection')
const response = require('./response')

app.use(bodyParser.json())


app.get('/', (req, res) => {
  response(200, 'KUMPULAM DIGISTAR API', 'SUCCESS', res)
})

app.get('/list-mahasiswa', (req, res) => {
  const sql = 'SELECT * FROM tb_mahasiswa'
  db.query(sql, (err, result) => {
    if (err) throw err 
    response(200, result, 'GET-API-LIST-MAHASISWA.', res)
  })
})

app.get('/list-mahasiswa/:id', (req, res) => {
  const id = req.params.id
  const sql = `SELECT * FROM tb_mahasiswa WHERE id = ${id}`
  db.query(sql, (err, result) => {
    if (err) throw err
    response(200, result, 'GET-API-LIST-MAHASISWA.', res)
  })
})

app.post('/list-mahasiswa', (req, res) => {
  const {name, email, phone_number, major, campus} = req.body
  const sql = `INSERT INTO tb_mahasiswa (name, email, phone_number, major, campus) VALUES ('${name}','${email}','${phone_number}','${major}','${campus}')`

  db.query(sql, (err, result) => {
    if(err) response(500, 'invalid', 'error', res)
    if (result?.affectedRows){
      response(200, result.insertId, 'Data Mahasiswa Baru Telah Ditambahkan', res)
    } 
  })
})


app.put('/list-mahasiswa', (req, res) => {
  const {id, name, email, phone_number, major, campus} = req.body
  const sql = `UPDATE tb_mahasiswa SET id='${id}',name='${name}',email='${email}',phone_number='${phone_number}',major='${major}',campus='${campus}' WHERE id = ${id}`

  db.query(sql, (err, result) => {
    
    if (err) response(500, 'invalid', 'error', res)
    if (result?.affectedRows) {
      const data = {
        isSuccess : result.affectedRows,
        message : result.message
      }
      response(200, data, 'Update Data Success', res)
    }else{
      response(404, 'Mahasiswa tidak ditemukan', 'ERROR', res)
    }
    
  })

})

app.delete('/list-mahasiswa', (req, res) => {
  const {id} = req.body
  const sql = `DELETE FROM tb_mahasiswa WHERE id = ${id}`

  db.query(sql, (err, result) => {
    if (err) response(500, 'invalid', 'error', res)
    if (result?.affectedRows) {
      const data = {
        isSuccess : result.affectedRows,
        message : "Data sudah dihapus"
      }
      response(200, "Berhasil hapus data", "SUCCESS", res)
    }else{
      response(500, "Data tidak ditemukan", "ERROR", res)
    }
    
  })
})




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})