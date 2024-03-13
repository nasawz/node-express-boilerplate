const { surrealDB } = require('../surrealdb');

const generateLicenseKey = (length, pairs = 4) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return (result.match(new RegExp(`.{1,${pairs}}`, 'g')) || []).join('-');
};

createCode4Email = (email) => {
  return new Promise(async (resolve, reject) => {
    const code = generateLicenseKey(8, 4);

    const result = await surrealDB.query('SELECT count() FROM code WHERE email = $email And expiredAt > time::now() GROUP BY count;', {
      email: email,
    });
    console.log(result);
    if(result[0][0]?.count>1){
      reject('请稍后重试')
    }else{
      await surrealDB.create('code', {
        email,
        code,
        createdAt: new Date().getTime(),
        expiredAt: new Date(Date.now() + 5 * 60 * 1000),
      });
      resolve(code);
    }
  });
};

chkCode4Email = (code) => {
  return new Promise(async (resolve, reject) => {
    const result = await surrealDB.query(' SELECT * FROM code WHERE code = $code And expiredAt > time::now();', {
      code: code,
    });
    if (result[0].length > 0) {
     let upRes =  await surrealDB.query(`UPDATE user SET isEmailValid = true WHERE email = $email And isEmailValid = false`, { email: result[0][0].email });
     if(upRes[0].length>0){
      resolve(result[0][0].email);
     }
     reject(false);
    }else{
      reject(false);
    }
  });
};

module.exports = {
  createCode4Email,
  chkCode4Email,
};
