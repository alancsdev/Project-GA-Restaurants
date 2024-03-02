var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var passport = require('passport');
var methodOverride = require('method-override');
var mongoStore = require('connect-mongo');
const bodyParser = require('body-parser');

require('dotenv').config();
// connect to the database with AFTER the config vars are processed
require('./config/database');

require('./config/passport');

const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const restaurantsRouter = require('./routes/restaurants');
const accountRouter = require('./routes/account');
const orderRouter = require('./routes/order');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
app.use(bodyParser.json());

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: mongoStore.create({
      mongoUrl: process.env.DATABASE_URL,
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Add this middleware BELOW passport middleware
app.use(function (req, res, next) {
  res.locals.user = req.user;
  next();
});

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/restaurants', restaurantsRouter);
app.use('/account', accountRouter);
app.use('/order', orderRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
