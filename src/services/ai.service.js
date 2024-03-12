const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const config = require('../config/config');
const axios = require('axios');

const chatCompletions = async (data) => {
  return new Promise((resolve, reject) => {
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
          resolve(response.data);
          // console.log(response.data.choices[0].message.content);
          // setValue(response.data.choices[0].message.content);
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
