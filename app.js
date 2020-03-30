const express = require('express')
const app = express()
const morgan = require('morgan')
const path = require('path')
const engine = require('consolidate')
const User = require('./models/user')
const fetch = require('node-fetch')
var minify = require('express-minify');
var autoprefixer = require('express-autoprefixer');


app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(express.static(path.join(__dirname, 'public')))

app.set('views', path.join(__dirname, 'views'))

app.engine('html', engine.mustache)
app.set('view engine', 'html')


//var minifyHTML = require('express-minify-html');

app.use(minify());
app.use(autoprefixer({browsers: 'last 2 versions', cascade: false}));
// exp.use(minifyHTML());

//start mysql2


//const mysql = require('mysql2/promise');

//var conn = mysql.createConnection({
//  host: '127.0.0.1',
//    user: 'root',
//    password: 'Mamaama280495',
//    database: 'calipso'
//});


  // const [result] = await conn.query('SELECT * FROM clients', [phone]);
  // if (typeof result[0] === 'undefined') {
  //   throw 'User not found';
  // }
  // console.log(result);
  //  connection.connect(function(err) {
  //    if (err) {
  //      return console.error("mistaaake" + err.message)
  //    }
  //    else {
  //      console.log("without mistake")
  //    }
  //  })
  
  //let insert = await conn.query("INSERT INTO clients (billId, payload) VALUES (1234, 'data')");
 //return insert;


// makeTest('79033214364').then(res => {
//   console.log(res);
// });

//finish

app.use(express.static(path.join(__dirname, 'public')));
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/myapp', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
})
const db = mongoose.connection
if (!db) {
  console.log('Error connecting db')
} else {
  console.log('Db connected successfully')
}

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/s', (req, res) => {
  res.render('secret')
})

app.get('/about', (req, res) => {
  res.render('about')
})

app.get('/product', (req, res) => {
  res.render('product')
})

app.get('/contact', (req, res) => {
  res.render('contact')
})

app.get('/sign', (req, res) => {
  res.render('sign')
})

app.get('/assesm', (req, res) => {
  res.render('assesm')
})

app.get('/registration', (req, res) => {
  res.render('registration')
})
app.get('/black', (req, res) => {
  res.render('blackLanding')
})
app.get('/landing', (req, res) => {
  res.render('landing')
})
app.get('/landing2', (req, res) => {
  res.render('landing2')
})
const mysql = require('mysql');

const conn = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'Mamaama280495',
  database: 'calipso'
});
app.post("/s", async function (req, res) {
  const result = req.body.data
  console.log(result)
})
app.post("/black", async function (req, res) {
  console.log(req.body)
  if (!req.body) return res.sendStatus(400);
  let business = req.body.userBus;
  // if (req.body.userBus) {
  //   business = 2;
  // }
  // console.log('business = ' + business);
  const phone = req.body.userPhone;
  const item = req.body.item
  let price = parseInt(499 * item)
  console.log(price)
  // console.log('phone = ' + phone)
  let payload = JSON.stringify({"firstName": req.body.userName, "item" : item});
  // console.log('payload = ' + payload);
  let data;
  console.log('data = ' + data)
  let ress = await conn.query(
    "INSERT INTO calipso.clients (phone, payload, typeID) VALUES ('" +
      phone +
      "', '" +
      payload +
      "', '" +
      business + "')",
    data,
    (err, result) => {
      if (err) throw err;
      console.log("Number of records inserted: " + result.affectedRows);
    }
  );
  // //console.log(ress)
  // res.redirect("/black");
});




app.post('/registration', async (req, res) => {
  const number = Number(req.body.num)
  let user = await User.findOne({ number })
  const pass = Math.floor(Math.random() * (99999 - 10000)) + 10000
  if (!user) {
    user = new User({
      number: number,
      pin: pass
    })
    await user.save()
  } else {
    const filter = user.number
    console.log(filter)
    User.findByIdAndUpdate(user._id, { pin: pass }, { new: true }, function (err) {
      if (err) {
        console.log(err)
      }
    })
  }
  const response = await fetch('https://mainsms.ru/api/message/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
      project: 'Futura',
      recipients: number,
      message: `Pin: ${pass}`,
      apikey: '3637d340ec391',
      test: 1
    })
  })
  res.end()
})

module.exports = app
