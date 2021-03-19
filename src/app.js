// Custom configurations packages
require('dotenv').config()
const express = require('express')
const app = express()
const config = require('./config')
const cors = require('cors')
const moment = require('moment')
const morgan = require('morgan')
const bodyParser = require('body-parser')

// Definitions/Custom settings/Middle wares
app.set('view engine', 'ejs')
app.use(morgan('dev'))
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))

// Cors configuration
app.use(cors());
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);

  next();
});


// Public path
app.use(express.static('public'))

// Routes/endpoints (each version will be a new line)
require('./routes/indexV1')(app)

// Error no unknown routes
app.use(function (req, res) {
  res.status(404).json({
    // status: false,
    message: 'Endpoint not found. Contact the system administrator for more information;'
  })
});

// Error Handler/Custom error json
app.use(function (err, req, res, next) {
  let customError = require('./libs/customError')
  let error = customError(err, next)

  res.status(error.status).json({
    status: false,
    message: error.message,
    code: error.code,
    callType: error.syscall,
    lineError: error.lineError,
    timestamp: moment().format('YYYY-MM-DD HH:MM:SS:00-03:00')
  })

});

// app.enable('trust proxy')
// TODO: Create workaround to error: listen EADDRINUSE: address already in use :::3000. Change the port maybe? Increase automatically.

app.listen(config.api.port || 3000, function () {
  console.log('-------------------------------------------------------------------------------------------------')
  console.log(`API server started in port ${config.api.port || 3000} in ${Date()}`)
  console.log('-------------------------------------------------------------------------------------------------')
})

module.exports = app