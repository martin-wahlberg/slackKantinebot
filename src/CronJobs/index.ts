import getDailyNotification from '../Messages/DailyNotification';
import app from '../bolt';
import cron from 'node-cron';

console.log('⏰ CronJobs loaded!');
//Daily lunch notification
cron.schedule(
  '30 10 * * MON,TUE,WED,THU,FRI',
  () => {
    getDailyNotification().then(message => {
      app.client.chat.postMessage({
        ...message
      });
    });
  },
  {
    scheduled: true,
    timezone: 'Europe/Stockholm'
  }
);
