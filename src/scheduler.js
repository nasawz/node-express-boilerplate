const { CronJob } = require('cron');

const job = new CronJob(
  '0 0 0 * * *',
  function () {
    console.log('每天的午夜（0时0分0秒）执行任务');
  }, // onTick
  null, // onComplete
  true, // start
  'Asia/Shanghai', 
);