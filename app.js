var express = require('express');
var bodyParser = require('body-parser');
var init = require('./config/init').start();
const PORT = require('./config/port');
var index = require('./routes/api');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api', index);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json({error: err});
});

app.listen(PORT,function () {
    console.log('http://%s:%s', 'localhost', PORT);
});
module.exports = app;
