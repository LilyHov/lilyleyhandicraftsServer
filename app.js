var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var http = require('http');
var app = express();
var mongoose = require('mongoose')
/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '4000');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);
var indexRouter = require('./routes/product');
var usersRouter = require('./routes/users');
var supplierRouter = require('./routes/supplier');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use('/products', indexRouter);
app.use('/user', usersRouter);
app.use('/supplier', supplierRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  if(err.status == 404){
    res.send('page not found')
  } else {
  // render the error page
  console.log(err)
    res.status(err.status || 500);
    res.send('server error')
  }

});
mongoose.connect('mongodb://localhost:27017/lilyley', {useNewUrlParser: true}).then(() => {
      server.listen(port, (err) => {
        if(err){
          console.log(err)
        } else {
          console.log('Server running on port:' + port)
        }
      });
}).catch((err) => {
  console.log(err)
});

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

