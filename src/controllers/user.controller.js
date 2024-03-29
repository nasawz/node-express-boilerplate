const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
// const { userService } = require('../services');

const createUser = catchAsync(async (req, res) => {
  // const user = await userService.createUser(req.body);
  // res.status(httpStatus.CREATED).send(user);
  res.status(httpStatus.CREATED).send({});
});

const getUsers = catchAsync(async (req, res) => {
  console.log(req.user);
  // const filter = pick(req.query, ['name', 'role']);
  // const options = pick(req.query, ['sortBy', 'limit', 'page']);
  // const result = await userService.queryUsers(filter, options);
  // res.send(result);
  res.send({});
});

const getUser = catchAsync(async (req, res) => {
  res.send(req.user);
});

const updateUser = catchAsync(async (req, res) => {
  // const user = await userService.updateUserById(req.params.userId, req.body);
  // res.send(user);
  res.send({});
});

const deleteUser = catchAsync(async (req, res) => {
  // await userService.deleteUserById(req.params.userId);
  // res.status(httpStatus.NO_CONTENT).send();
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
