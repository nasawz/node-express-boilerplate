const httpStatus = require('http-status');
// const tokenService = require('./token.service');
const userService = require('./user.service');
// const Token = require('../models/token.model');
const ApiError = require('../utils/ApiError');
const { Code } = require('../models');
// const { tokenTypes } = require('../config/tokens');

/**
 * Login with username and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */
const loginUserWithEmailAndPassword = async (email, password) => {
  try {
    const token = await userService.signinUser(email, password);
    return token;
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
  }
};

/**
 * Logout
 * @param {string} refreshToken
 * @returns {Promise}
 */
const logout = async (refreshToken) => {
  // const refreshTokenDoc = await Token.findOneAndDelete({
  //   token: refreshToken,
  //   type: tokenTypes.REFRESH,
  //   blacklisted: false,
  // });
  // if (!refreshTokenDoc) {
  //   throw new ApiError(httpStatus.NOT_FOUND, 'Not found');
  // }
};

/**
 * Refresh auth tokens
 * @param {string} refreshToken
 * @returns {Promise<Object>}
 */
const refreshAuth = async (refreshToken) => {
  // try {
  //   const refreshTokenDoc = await tokenService.verifyToken(refreshToken, tokenTypes.REFRESH);
  //   const user = await userService.getUserById(refreshTokenDoc.user);
  //   if (!user) {
  //     throw new Error();
  //   }
  //   await Token.findByIdAndDelete(refreshTokenDoc._id);
  //   return tokenService.generateAuthTokens(user);
  // } catch (error) {
  //   throw new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate');
  // }
};

/**
 * Reset password
 * @param {string} resetPasswordToken
 * @param {string} newPassword
 * @returns {Promise}
 */
const resetPassword = async (resetPasswordToken, newPassword) => {
  // try {
  //   const resetPasswordTokenDoc = await tokenService.verifyToken(resetPasswordToken, tokenTypes.RESET_PASSWORD);
  //   const user = await userService.getUserById(resetPasswordTokenDoc.user);
  //   if (!user) {
  //     throw new Error();
  //   }
  //   await userService.updateUserById(user.id, { password: newPassword });
  //   await Token.deleteMany({ user: user.id, type: tokenTypes.RESET_PASSWORD });
  // } catch (error) {
  //   throw new ApiError(httpStatus.UNAUTHORIZED, 'Password reset failed');
  // }
};

/**
 * Verify email
 * @param {string} verifyEmailToken
 * @returns {Promise}
 */
const verifyEmail = async (code) => {
  return await Code.chkCode4Email(code)
};

/**
 * verify Token
 * @param {*} token 
 */
const verifyToken = async (token) => {
  const res = await userService.authenticateUser(token)
console.log('=============',res);

  return res;
};


module.exports = {
  loginUserWithEmailAndPassword,
  logout,
  refreshAuth,
  resetPassword,
  verifyEmail,
  verifyToken,
};
