const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const config = require('../config/config');
const axios = require('axios');
const { Fee, User } = require('../models');

const chatCompletions = async (data, user) => {
  return new Promise((resolve, reject) => {
    const userId = user.id;
    axios({
      method: 'post',
      url: '/v1/chat/completions',
      baseURL: 'https://api.moonshot.cn',
      headers: {
        authorization: `Bearer ${config.aiApiKey}`,
      },
      data: data,
    })
      .then(function (response) {
        if (response.data.choices.length > 0) {
          const { id, object, created, model, usage } = response.data;
          const { total_tokens } = usage;
          let feeData = {
            chatId: id,
            object: object,
            created: created,
            model: model,
            total_tokens: total_tokens,
            userId: userId,
          };
          Fee.createRecord(feeData);
          User.costPoint(userId);
          resolve(response.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  });
};
module.exports = {
  chatCompletions,
};
