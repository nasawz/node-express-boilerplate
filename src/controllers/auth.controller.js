const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { userService, authService } = require('../services');
const { jwtDecode } = require('jwt-decode');
const ApiError = require('../utils/ApiError');
// const { authService, userService, tokenService, emailService } = require('../services');

const register = catchAsync(async (req, res) => {
  try {
    const token = await userService.createUser(req.body);
    var decoded = jwtDecode(token);
    const { ID } = decoded;
    const result = await userService.getUserById(ID);
    res.status(httpStatus.CREATED).send({ token, user: result[0][0] });
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, '服务器错误');
  }
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const token = await authService.loginUserWithEmailAndPassword(email, password);
  var decoded = jwtDecode(token);
  const { ID } = decoded;
  const result = await userService.getUserById(ID);
  res.send({ token, user: result[0][0] });
});

const logout = catchAsync(async (req, res) => {
  // await authService.logout(req.body.refreshToken);
  // res.status(httpStatus.NO_CONTENT).send();
  res.status(httpStatus.NO_CONTENT).send();
});

const refreshTokens = catchAsync(async (req, res) => {
  // const tokens = await authService.refreshAuth(req.body.refreshToken);
  // res.send({ ...tokens });
  res.send({});
});

const forgotPassword = catchAsync(async (req, res) => {
  // const resetPasswordToken = await tokenService.generateResetPasswordToken(req.body.email);
  // await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);
  // res.status(httpStatus.NO_CONTENT).send();
  res.status(httpStatus.NO_CONTENT).send();
});

const resetPassword = catchAsync(async (req, res) => {
  // await authService.resetPassword(req.query.token, req.body.password);
  // res.status(httpStatus.NO_CONTENT).send();
  res.status(httpStatus.NO_CONTENT).send();
});

const sendVerificationEmail = catchAsync(async (req, res) => {
  // const verifyEmailToken = await tokenService.generateVerifyEmailToken(req.user);
  // await emailService.sendVerificationEmail(req.user.email, verifyEmailToken);
  // res.status(httpStatus.NO_CONTENT).send();
  res.status(httpStatus.NO_CONTENT).send();
});

const verifyEmail = catchAsync(async (req, res) => {
  // await authService.verifyEmail(req.query.token);
  // res.status(httpStatus.NO_CONTENT).send();
  res.status(httpStatus.NO_CONTENT).send();
});

const verifyToken = catchAsync(async (req, res) => {
  const { token } = req.body;
  await authService.verifyToken(token);
  // res.status(httpStatus.NO_CONTENT).send();
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  sendVerificationEmail,
  verifyEmail,
  verifyToken,
};
