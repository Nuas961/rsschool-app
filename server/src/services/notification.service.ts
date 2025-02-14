import axios from 'axios';
import { config } from '../config';

export async function sendNotification(notification: NotificationV2) {
  const { password, username } = config.users.cloud;

  await axios.post(`${config.host}/api/v2/users/notifications/send`, notification, {
    headers: {
      Authorization: `Basic ${Buffer.from(username + ':' + password).toString('base64')}`,
    },
  });
}

type NotificationV2 = {
  notificationId: 'mentorRegistrationApproval' | 'taskGrade' | 'interviewerAssigned';
  userId: number;
  data: object;
};
