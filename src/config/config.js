const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().lowercase().valid('production', 'development', 'test').required(),
    LOG_LEVEL: Joi.string().lowercase().valid('error', 'warn', 'info', 'http', 'verbose', 'debug', 'silly').default('info'),
    PORT: Joi.number().default(3000),
    SURREALDB_URL: Joi.string().required().description('surreal DB url'),
    SURREALDB_NS: Joi.string().required().description('surreal DB ns'),
    SURREALDB_DB: Joi.string().required().description('surreal DB db'),
    SURREALDB_USER: Joi.string().required().description('surreal DB user'),
    SURREALDB_PASS: Joi.string().required().description('surreal DB pass'),
    JWT_SECRET: Joi.string().required().description('JWT secret key'),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number().default(30).description('minutes after which access tokens expire'),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number().default(30).description('days after which refresh tokens expire'),
    JWT_RESET_PASSWORD_EXPIRATION_MINUTES: Joi.number()
      .default(10)
      .description('minutes after which reset password token expires'),
    JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: Joi.number()
      .default(10)
      .description('minutes after which verify email token expires'),
    // SMTP_HOST: Joi.string().description('server that will send the emails'),
    // SMTP_PORT: Joi.number().description('port to connect to the email server'),
    // SMTP_USERNAME: Joi.string().description('username for email server'),
    // SMTP_PASSWORD: Joi.string().description('password for email server'),
    EMAIL_SECRET_KEY: Joi.string().description('the from field in the emails sent by the app'),
    EMAIL_ENDPOINT: Joi.string().description('the from field in the emails sent by the app'),
    AI_API_KEY: Joi.string().description('AI api secret key'),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  logLevel: envVars.LOG_LEVEL,
  port: envVars.PORT,
  aiApiKey: envVars.AI_API_KEY,
  surreal: {
    url: envVars.SURREALDB_URL,
    ns: envVars.SURREALDB_NS,
    db: envVars.SURREALDB_DB,
    user: envVars.SURREALDB_USER,
    pass: envVars.SURREALDB_PASS,
  },
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes: envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
    verifyEmailExpirationMinutes: envVars.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
  },
  email: {
    key: envVars.EMAIL_SECRET_KEY,
    endpoint: envVars.EMAIL_ENDPOINT,
    // smtp: {
    //   host: envVars.SMTP_HOST,
    //   port: envVars.SMTP_PORT,
    //   auth: {
    //     user: envVars.SMTP_USERNAME,
    //     pass: envVars.SMTP_PASSWORD,
    //   },
    // },
    // from: envVars.EMAIL_FROM,
  },
};
