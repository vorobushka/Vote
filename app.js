const express = require('express')
const app = express()
const morgan = require('morgan')
const path = require('path')
const fetch = require('node-fetch')
const engine = require("consolidate");

app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(express.static(path.join(__dirname, 'public')))

app.set('views', path.join(__dirname, 'views'))

app.engine('html', engine.mustache)
app.set('view engine', 'html')

app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
  res.render('secret')
})

app.post("/", async function (req, res) {
  const result = req.body.data
  console.log(result)
})

module.exports = app
