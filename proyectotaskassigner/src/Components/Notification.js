import React, { useState,useEffect } from 'react';
import { Badge, Button, Popover, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getAuthToken, getRole } from '../Services/AuthService';

const Notification = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0); // Initial unread count
    const [notifications, setNotifications] = useState([]);
    const [user, setUser] = useState({});
    const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  //actualizar el unreadCount
  useEffect(() => {
    const newUnreadCount = notifications.filter((n) => !n.read).length;
    setUnreadCount(newUnreadCount);
  }, [notifications]);


  useEffect(() => {
    const authToken = getAuthToken();
    const role = getRole();
        if (!authToken || !role) {
            //Navegar a Login
            navigate('/login');             
        }
        axios.post(
            'https://localhost:7153/api/Users/userInfo',
             null,
            {
                headers:
                {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json',
                    
                }
            }
        ).then((response) => {

            const userInfo = response.data.user;
            axios.get('https://localhost:7153/api/Notifications/'+userInfo.id, {
                headers:
                {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json',
                    
                }
            }).then((response) => {
                setUser(userInfo);
                setNotifications(response.data);
            }).catch((error) => {
                console.error('Error al obtener la informaci�n de las notificaciones');
            });
            
        }).catch((error) => {

        console.error('Error al obtener la información del usuario');
        })
    
}, []);


  const handleNotificationClick = (notification) => {
    // Update the Read parameter of the clicked notification
    const authToken = getAuthToken();
    const role = getRole();
        if (!authToken || !role) {
            //Navegar a Login
            navigate('/login');             
        }
    notification.read = true;

    // Update the notification in the database
    axios.put(`https://localhost:7153/api/Notifications/${notification.id}`, notification,
        {
            headers:
                {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json',
                    
                }
        })
      .then((response) => {
        console.log('Notification updated successfully');
        const newUnreadCount = notifications.filter((n) => !n.read).length;
        setUnreadCount(newUnreadCount);

        // Close popover if desired
        handleClose();

    // Navigate to notification URL
    window.location.href = notification.url;
      })
      .catch((error) => {
        console.error(error)
        console.error('Error updating notification');
      });
      // Recalculate unread count based on unread notifications   
  };

  const open = Boolean(anchorEl);
  const id = open ? 'notification-popover' : undefined;

  return (
    <div>
      <Button aria-describedby={id} variant="contained" onClick={handleClick}>
        <Badge badgeContent={unreadCount} color="error">
          🔔
        </Badge>
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <div style={{ maxHeight: '200px', overflowY: 'auto', padding: '20px' }}>
          
          <ul>
            {notifications.map((notification, index) => (
              <li
                key={index}
                onClick={() => handleNotificationClick(notification)}
                style={{ backgroundColor: notification.read ? 'transparent' : '#f0f0f0' }}
              >
                <strong>{notification.title}</strong>
                <p>{notification.message}</p>
              </li>
            ))}
          </ul>
        </div>
      </Popover>
    </div>
  );
};

export default Notification;
