const express = require('express');
const helmet = require('helmet');
const compression = require('express-compression');
const cors = require('cors');
const passport = require('passport');
const httpStatus = require('http-status');
const config = require('./config/config');
const morgan = require('./config/morgan');
const { authLimiter } = require('./middlewares/rateLimiter');
const routes = require('./routes/v1');
const healthcheck = require('./routes/healthcheck.route');
const { errorConverter, errorHandler } = require('./middlewares/error');
const ApiError = require('./utils/ApiError');
const { userService } = require('./services');
const { jwtDecode } = require('jwt-decode');

var Strategy = require('passport-http-bearer').Strategy;

const app = express();

if (config.env !== 'test') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
// app.use(mongoSanitize());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options('*', cors());


// Bearer Tokens
passport.use(new Strategy(
  async function(token, done) {
    let isAuth = await userService.authenticateUser(token)
    if(isAuth){
      var decoded = jwtDecode(token);
      const { ID } = decoded;
      const result = await userService.getUserById(ID);
      const user = result[0][0];
      return done(null, user, { scope: user.authority });      
    }else{
      return done(null, false);
    }
  }
));

// limit repeated failed requests to auth endpoints
if (config.env === 'production') {
  app.use('/v1/auth', authLimiter);
}

// healthcheck api route
app.use('/health', healthcheck);

// v1 api routes
app.use('/v1', routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;
