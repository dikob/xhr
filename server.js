const express = require('express')
const app = express()
const path = require('path')
var bodyParser = require('body-parser')
var port = 3000

const crypto = require('crypto');
const ENCRYPTION_KEY = 'FoCKvdLslUuB4y3EZlKate7XGottHski'; // Must be 256 bits (32 characters)

function decrypt(text) {
  let textParts = text.split(':');
  let iv = Buffer.from(textParts.shift(), 'hex');
  let encryptedText = Buffer.from(textParts.join(':'), 'hex');
  let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
  let decrypted = decipher.update(encryptedText);

  decrypted = Buffer.concat([decrypted, decipher.final()]);

  return decrypted.toString();
}

var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'test',
  debug: false,
});
connection.connect();

app.listen(port, function () {
  console.log('We are listening on port ' + port)
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '/index.html'))
})

app.set('view engine', 'ejs');

app.post('/login', function (req, res) {
  var username = req.body.user;
  var password = req.body.psw;

  var sql = "SELECT password, status, role FROM tb_users WHERE username = ? ";
  connection.query(sql, [username], function (error, results, fields) {
    if (error) {
      throw error;
    }

    if (results.length == 0) {
      return console.log('Cannot find user');
    }

    var dpass = decrypt(results[0].password);
    results[0].username = username;
    delete results[0].password;
    try {
      if (dpass == password) {
        console.log('Success!');
        // index page 
        app.get('/home', function (req, res) {
          res.render('pages/index', {
            results: results
          });
        });
      } else {
        res.send('Not Allowed')
      }
    } catch {
      res.status(500).send()
    }

  });

  //connection.end();
  return res.end('done')
})
