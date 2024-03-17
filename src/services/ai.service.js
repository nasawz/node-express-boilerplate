const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const config = require('../config/config');
const axios = require('axios');
const { Fee, User } = require('../models');

const chatCompletions = async (data, user) => {
  // console.log('chatCompletions');
  return new Promise((resolve, reject) => {
    const userId = user.id;
    // axios({
    //   timeout: 5000, // Set a timeout of 5 seconds
    //   method: 'post',
    //   url: '/v1/chat/completions',
    //   baseURL: 'https://api.moonshot.cn',
    //   headers: {
    //     authorization: `Bearer ${config.aiApiKey}`,
    //   },
    //   data: data,
    // })
    data.model = 'gpt-3.5-turbo';
    axios({
      method: 'post',
      url: 'https://gateway.ai.cloudflare.com/v1/ee4005a384afb2fab9650d18176e56ce/openai/openai/chat/completions',
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
