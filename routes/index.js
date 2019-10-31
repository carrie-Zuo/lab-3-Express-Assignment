var express = require('express');
var router = express.Router();

var loki = require('lokijs');

var db = new loki('data.json', {
  autoload: true,
  autoloadCallback: databaseInitialize,
  autosave: true,
  autosaveInterval: 4000
});

// implement the autoloadback referenced in loki constructor
function databaseInitialize() {
  var bookings = db.getCollection("bookings");
  if (bookings === null) {
    bookings = db.addCollection("bookings");
  }
}

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Depressed' });
});

/* Handle the Form */

/* Display all Bookings */
router.get('/bookings', function (req, res) {

  let result = db.getCollection("bookings").find();

  res.render('bookings', {bookings: result});

});

router.post('/form', function (req, res) {

  var response = {
    header: req.headers,
    body: req.body
  };

  req.body.numTickets = parseInt(req.body.numTickets);

  db.getCollection("bookings").insert(req.body);

  res.json(response);
});

module.exports = router;
