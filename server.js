'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const loggerObj = require('./config/logger/logger.js');
const helmet = require('helmet');
const cors = require('cors');

const config = require(__dirname + '/config');
const db = require(__dirname + '/config/db.js');
const appDir = config.appDir;

console.log('PORT NUMBER', config.port);

// ---------- MIDDLEWARES ---------- //

// Body parser
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// Security headers via Helmet
app.use(helmet());
app.use(
  helmet.referrerPolicy({
    policy: 'no-referrer',
  })
);
app.use(helmet.xssFilter());
app.use(helmet.frameguard());

// ---------- CORS CONFIG ---------- //

const allowedOrigins = [
  'https://cm2.beehiveinfotech.com', // production
  'http://localhost:4200',
  'https://localhost',           // local development
  'http://13.201.136.123',
  'http://13.200.62.244',
  'ionic://localhost'
];

const corsOptions = {
  origin: function (origin, callback) {

    // ✅ Allow Postman, mobile apps, WebView
    if (!origin) {
      return callback(null, true);
    }

    // ✅ Allow known web origins
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    // ✅ Allow Cordova / Ionic file based origin
    if (origin.startsWith('file://')) {
      return callback(null, true);
    }

    // 🔒 Prod safe: log but DO NOT block mobile
    console.log('⚠️ CORS allowed for mobile origin:', origin);
    return callback(null, true);
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// ---------- CUSTOM LOGGING + HEADERS ---------- //

app.use((req, res, next) => {
  loggerObj.info('Request Body in Server.js', req.body);
  console.log('Request Body in Server.js', req.body);

  // Attach DB and logger to request headers for downstream usage
  req.headers.options = { db: db, logger: loggerObj };

  next();
});

// ---------- ROUTES ---------- //

app.get('/', (req, res) => {
  res.status(200).send('Our server is running at port ' + app.get('port'));
});

app.use('/api/v1/', require(appDir + '/routes'));

// ---------- SERVER LISTEN ---------- //

app.set('port', process.env.PORT || config.port);
const server = app.listen(app.get('port'), () => {
  console.log(`ðŸš€ Server running on port ${app.get('port')}`);
});

module.exports = app;
