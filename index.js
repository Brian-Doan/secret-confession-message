// ========== Import Library ========== //
const express = require('express')
var app = express()

var session = require('express-session')
var cookieParser = require('cookie-parser')
app.use(cookieParser('keyboard cat'))
app.use(session({cookie: { maxAge: 60000}}))
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

var path = require('path')
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

var publicDir = require('path').join(__dirname, '/public')
app.use(express.static(publicDir))

app.get('*', (req,res,next) => {
    res.locals.cfs = req.session.cfs
    next()
})

var mongoose = require('mongoose');
var config = require('./config/database');
mongoose.connect(config.database, {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected DB successfully!');
});

// ========== Routing ========== // 
var write_cfs = require('./routes/write_cfs')
var share_cfs = require('./routes/share_cfs')

app.use('/', write_cfs)
app.use('/share', share_cfs)

// ========== Port listener ========== //
const port = process.env.PORT || 2000
app.listen(port, function() {
    console.log('This App is running on port ' + port)
})
