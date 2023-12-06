import React, { useEffect, useState } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';
import axios from 'axios'; // Import axios
import { getAccessToken, getUserEmail } from '~/app/utils/local-storage';
import { Bell } from 'react-feather';
import { useNavigate } from 'react-router-dom';
import { formatPostedAt } from '../../pages/ThreadsPage/SubTab';

const NotificationComponent = () => {
  const [notifications, setNotifications] = useState<string[]>([]); // Thêm kiểu dữ liệu là string[] hoặc any[]
  const [messages, setMessages] = useState([]);
  const [notificationDropDown, setNotificationDropDown] = useState(false);
  const nav = useNavigate();
  const navTo = (l: any) => {
    nav(l);
  };
  const clickBell = () => {
    setNotificationDropDown(!notificationDropDown);
    seenAll();
  };
  useEffect(() => {
    fetchNotifications();

    const client = new HubConnectionBuilder()
      .withUrl(
        'https://dungeonoftrialsnotificationsapi-dev.eba-hm8cinx9.ap-southeast-1.dev4f.site/myHub'
      ) // Địa chỉ Hub bạn đã cấu hình trong ASP.NET API
      .withAutomaticReconnect() // Tự động kết nối lại nếu mất kết nối
      .build();

    // Đăng ký kênh (channel) và xử lý khi có thông báo đến
    client.on('ReceiveNotification', (user, message) => {
      const newMessage = `${user}: ${message}`;
      //setMessages([...messages, newMessage]);
      console.log('Received notification');

      fetchNotifications();
    });

    // Fetch danh sách thông báo khi component được render
    client
      .start()
      .then(() => {
        console.log('Connection established!');
        const email = getUserEmail(); // Lấy email của người dùng
        console.log(email);

        client.invoke('RegisterConnection', email); // Gửi email của người dùng để đăng ký kết nối với tên người dùng
      })
      .catch((err) =>
        console.error('Error while establishing connection:', err)
      );

    return () => {
      client.stop();
    };
  }, []);

  const fetchNotifications = async () => {
    const email = getUserEmail();
    const apiUrl =
      'https://jphm-cors-anywhere.onrender.com/http://gateway.ap-southeast-1.elasticbeanstalk.com/notifications/GetAllNotificationsByEmail';

    try {
      const accessToken = getAccessToken();

      const response = await axios.get(apiUrl, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          Authorization: `bearer ${accessToken}`, // Đính kèm Authentication Header
        },
        params: {
          email, // Truyền email của client vào params (nếu cần)
        },
      });

      setNotifications(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const seenAll = async () => {
    const apiUrl =
      'https://jphm-cors-anywhere.onrender.com/http://gateway.ap-southeast-1.elasticbeanstalk.com/notifications/SetSeenAllNotificationsByEmail';

    try {
      const accessToken = getAccessToken();

      const response = await axios.post(apiUrl, null, {
        headers: {
          Authorization: `bearer ${accessToken}`, // Đính kèm Authentication Header
        },
      });

      setNotifications(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const countUnseenNotifications = notifications
    ? notifications.reduce((count, notification: any) => {
        if (!notification.isSeen) {
          return count + 1;
        }
        return count;
      }, 0)
    : 0;

  return (
    <li className="onhover-dropdown">
      <div className="notification-box" onClick={() => clickBell()}>
        <Bell />
        <span className="badge badge-pill badge-secondary">
          {countUnseenNotifications}
        </span>
      </div>
      <ul
        className={`notification-dropdown onhover-show-div ${
          notificationDropDown ? 'active' : ''
        }`}
      >
        <li>Notifcations</li>
        {notifications &&
          notifications.map((notification: any, index) => (
            <li
              className="eachNoti"
              key={index}
              onClick={() => navTo(notification.url)}
            >
              <p>
                <i className="fa fa-circle-o mr-3 font-primary"> </i>
                <i>{notification.causerUserName}</i> has {notification.action}
                &nbsp;to your&nbsp;
                {notification.action === 'comment' ? 'post' : 'comment'}
                <span className="pull-right">
                  &nbsp;at&nbsp;{formatPostedAt(notification.time)}
                </span>
              </p>
            </li>
          ))}
        <li></li>
      </ul>
    </li>
  );
};

export default NotificationComponent;
