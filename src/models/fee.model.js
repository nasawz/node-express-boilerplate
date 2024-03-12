const { surrealDB } = require('../surrealdb');

createRecord = (data) => {
  return new Promise(async (resolve, reject) => {
    await surrealDB.create('fee', data);
  });
};

module.exports = {
  createRecord,
};
