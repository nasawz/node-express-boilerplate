const { Surreal } = require('surrealdb.js');
const config = require('./config/config');
const logger = require('./config/logger');

const { url, ns, db, user, pass } = config.surreal;

// https://surrealdb.com/docs/surrealdb/integration/sdks/javascript

const surrealDB = new Surreal();
const dbClient = new Surreal();

async function initDB() {
  try {
    logger.info(`Initializing database... ${url}`);
    await dbClient.connect(url);
    await surrealDB.connect(url, {
      auth: {
        username: user,
        password: pass,
      },
    });
    await surrealDB.use({ namespace: ns, database: db });
    await dbClient.use({ namespace: ns, database: db });
  } catch (err) {
    logger.error(err);
  }
}

module.exports = {
  dbClient,
  surrealDB,
  initDB,
};
