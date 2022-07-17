var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors  = require('cors');

const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/HuntKingdom")
  .then(()=>console.log("database connected"))
  .catch((exc)=>console.log(exc));

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var facture = require('./routes/facture');
var produitRouter = require('./routes/produit');
var categoryProduitRouter = require('./routes/categorieProduit');
var commentairesRouter = require('./routes/commentaires');

var app = express();
app.use(cors());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/facture', facture);
app.use('/produit', produitRouter);
app.use('/categorieProduit', categoryProduitRouter);
app.use('/commentaires', commentairesRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
