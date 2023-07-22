var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const bodyParser = require('body-parser');
const {check, validationResult} = require('express-validator');
const session = require('express-session'); // Session middleware
const passport = require('passport'); // Authentication 
const connectEnsureLogin = require('connect-ensure-login'); // Authorization

const User = require('./user'); // User model

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');

var app = express();

// Configure session
app.use(session({
  secret: 'r8q,+&1LM3)CD*zAGpx1xm{NeQhc;#',
  resave: false,
  saveUninitialized: true,
  cookie: {maxAge: 60*60*1000}// 1 hour
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({extended: false}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());

// To use with sessions
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//app.use('/login',loginRouter);
app.get('/login', (req,res) => {
  res.sendFile(__dirname + '/public/html/login.html');
});
//app.use('/', indexRouter);
app.get('/', (req,res) => {
  res.sendFile(__dirname + '/public/html/index.html');
});
app.get('/dashboard',connectEnsureLogin.ensureLoggedIn(),(req,res) =>{
  res.send(`Hello ${req.user.username}. Your session id is ${req.sessionID}
  and your session expires is ${req.session.cookie.maxAge}
  milliseconds<br><br>
  <a href="/logout">Log out</a><br><br>
  <a href="/secret">Members Only</a>`);
});
app.get('/secret',connectEnsureLogin.ensureLoggedIn(), (req,res)=>{
  res.sendFile(__dirname + '/public/html/secret-page.html');
});
app.get('/logout', (req,res)=>{
  req.logOut();
  res.redirect('/login');
});
app.post('/login',passport.authenticate('local', {failureRedirect: '/'}), (req,res)=>{
  console.log(req.user);
  res.redirect('/dashboard');

})
//app.use('/users', usersRouter);

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
