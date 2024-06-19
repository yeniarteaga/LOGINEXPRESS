const express = require('express')
const app = express()
const port = 3000
// Get the client
const cors = require('cors')
const session = require('express-session')
const md5 = require('md5');
const bcrypt = require('bcrypt');
const login = require('./login');
const registro = require('./registro');
const { obtenerusuarios, eliminarusuarios } = require('./usuarios');
const validar = require('./validar');
const saltRounds = 10;

app.use(cors({
  origin: process.env. HOSTFRONTEND || 'http://localhost:5173',
  credentials: true
}))

const produccion = (process.env.NODE_ENV === 'production')

app.use(session({
  secret:'fjhvbcbcjbcjhcnjcbcnbcvcnvjcvnxczjxzdzxzxcaa',
  cookie: {
    sameSite: 'none',
    secure: produccion
  },
  proxy: produccion
}))

app.get('/', (req, res) => {
  res.send('hello world')
})

app.get('/login', login)

app.get('/Validar', validar)

app.get('/registro', registro)

app.get('/usuarios', obtenerusuarios)

app.delete('/usuarios', eliminarusuarios)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})