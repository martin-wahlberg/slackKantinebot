import { getFromDb } from '../Utils/db';
import { View } from '@slack/web-api';
const usersModal = async () => {
  const users = await getFromDb<User[]>('users');

  if (!users?.length) return;

  const modal: View = {
    type: 'modal',
    title: {
      type: 'plain_text',
      text: 'Users',
      emoji: true
    },

    close: {
      type: 'plain_text',
      text: 'Cancel',
      emoji: true
    },
    blocks: [
      {
        type: 'section',
        fields: users.map((cur, index) => ({
          type: 'mrkdwn',
          text: `*User ${index + 1}:*\n\`\`\`Username: ${
            cur.userName
          }\nAdded by: ${cur.addedBy}\`\`\``
        }))
      }
    ]
  };
  return modal;
};
export default usersModal;
