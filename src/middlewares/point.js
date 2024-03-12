const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { roleRights } = require('../config/roles');

const verifyCallback = (req, resolve, reject, requiredRights) => async (err, user, info) => {
  if (err || !user) {
    return reject(new ApiError(httpStatus.UNAUTHORIZED, '请登录后使用！'));
  }
  req.user = user;

  if (requiredRights.length) {
    const userRights = roleRights.get('user');
    const hasRequiredRights = requiredRights.every((requiredRight) => userRights.includes(requiredRight));
    if (!hasRequiredRights) {
      return reject(new ApiError(httpStatus.FORBIDDEN, 'Forbidden'));
    }
  }

  resolve();
};

const point =
  () =>
  async (req, res, next) => {
    return new Promise((resolve, reject) => {
      if (req.user.point <= 0) {
        return reject(new ApiError(httpStatus.FORBIDDEN, '点数不足'));
      }
      resolve();
    })
      .then(() => next())
      .catch((err) => next(err));
  };

module.exports = point;
