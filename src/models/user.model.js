const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { surrealDB, dbClient } = require('../surrealdb');
const logger = require('../config/logger');
const config = require('../config/config');
// const { roles } = require('../config/roles');
// const { Surreal } = require('surrealdb.node');
// const config = require('../config/config');

// const userSchema = mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       trim: true,
//       lowercase: true,
//       validate(value) {
//         if (!validator.isEmail(value)) {
//           throw new Error('Invalid email');
//         }
//       },
//     },
//     password: {
//       type: String,
//       required: true,
//       trim: true,
//       minlength: 8,
//       validate(value) {
//         if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
//           throw new Error('Password must contain at least one letter and one number');
//         }
//       },
//       private: true, // used by the toJSON plugin
//     },
//     role: {
//       type: String,
//       enum: roles,
//       default: 'user',
//     },
//     isEmailVerified: {
//       type: Boolean,
//       default: false,
//     },
//   },
//   {
//     timestamps: true,
//   },
// );

// // add plugin that converts mongoose to json
// userSchema.plugin(toJSON);
// userSchema.plugin(paginate);

// /**
//  * Check if email is taken
//  * @param {string} email - The user's email
//  * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
//  * @returns {Promise<boolean>}
//  */
// userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
//   const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
//   return !!user;
// };

// /**
//  * Check if password matches the user's password
//  * @param {string} password
//  * @returns {Promise<boolean>}
//  */
// userSchema.methods.isPasswordMatch = async function (password) {
//   const user = this;
//   return bcrypt.compare(password, user.password);
// };

// userSchema.pre('save', async function (next) {
//   const user = this;
//   if (user.isModified('password')) {
//     user.password = await bcrypt.hash(user.password, 8);
//   }
//   next();
// });

isEmailTaken = async (email) => {
  let res = await surrealDB.query('SELECT * FROM user WHERE email = $email', {
    email,
  });
  if (res[0].length > 0) {
    return true;
  }
  return false;
};

signup = async (data) => {
  return await dbClient.signup({
    namespace: config.surreal.ns,
    database: config.surreal.db,
    scope: 'user',
    ...data,
  });
};

signin = async (email, password) => {
  return await dbClient.signin({
    namespace: config.surreal.ns,
    database: config.surreal.db,
    scope: 'user',
    email: email,
    password: password,
  });
};

authenticate = async (token) => {
  return await dbClient.authenticate(token);
};

findById = async (id) => {
  return await surrealDB.query(`SELECT * OMIT password FROM user WHERE id = $id`, { id });
};

module.exports = {
  isEmailTaken,
  signup,
  signin,
  authenticate,
  findById,
};
