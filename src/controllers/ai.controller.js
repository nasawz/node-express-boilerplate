const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { io } = require('../app');
const { aiService } = require('../services');

const createMessage = catchAsync(async (req, res) => {
  let aiRes = await aiService.chatCompletions(req.body,req.user);
  // console.log(aiRes);
  let { id, object, created, model, usage,...others } = aiRes;
  res.send({...others});
});

module.exports = {
  createMessage,
};
