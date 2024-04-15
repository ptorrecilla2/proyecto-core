import React, { useState, useEffect } from "react";
import { Badge, IconButton, Popover,Tooltip } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getAuthToken } from "../Services/AuthService";
import { HubConnectionBuilder } from "@microsoft/signalr";
import MarkAllAsReadIcon from "@mui/icons-material/DoneAll";
import ShowAllIcon from "@mui/icons-material/Visibility";
import ShowUnreadIcon from "@mui/icons-material/VisibilityOff";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import NotificationsIcon from "@mui/icons-material/Notifications";

const Notification = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0); // Initial unread count
  const [notifications, setNotifications] = useState([]);
  const [user, setUser] = useState({});
  const [showOnlyUnread, setShowOnlyUnread] = useState(false);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  useEffect(() => {
    let connection = null;
    const authToken = getAuthToken();

    if (!authToken) {
      //Navegar a Login
      navigate("/login");
    }
    const getUserInfo = async () => {
      const userResponse = await axios
      .post("https://localhost:7153/api/Users/userInfo", null, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
          "Content-Type": "application/json",
        },
      })
      const userInfo = userResponse.data.user;
      setUser(userInfo);
      const notificationsResponse = await axios
        .get("https://localhost:7153/api/Notifications/" + userInfo.id, {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        })
      setNotifications(notificationsResponse.data);
    }
    

    const startSignalRConnection = async () => {
      const userResponse = await axios
    .post("https://localhost:7153/api/Users/userInfo", null, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
        "Content-Type": "application/json",
      },
    })
    const userInfo = userResponse.data.user;
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("Authorization", `Bearer ${getAuthToken()}`);

      connection = new HubConnectionBuilder()
        .withUrl("https://localhost:7153/notificationHub", {
          headers: headers,
        })
        .withAutomaticReconnect()
        .build();

      try {
        await connection.start();
        console.log("SignalR connected");

        connection.on("ReceiveNotification", (message) => {
          console.log("Received notification:", message);
          
          if (message.userId === userInfo.id && message.read === false && !notifications.some(n => n.id === message.id)) {
            setNotifications(prevNotifications => { return !prevNotifications.some(n => n.id === message.id) ? [message,...prevNotifications] : prevNotifications});
          }
          
          // Fetch new notifications or update existing ones
          // Example: setNotifications([...notifications, message]);
        });
      } catch (error) {
        console.error("SignalR connection failed:", error);
      }
    };
    getUserInfo();
    startSignalRConnection();

    return () => {
      // Clean up the connection when the component unmounts
      if (connection && connection.state === "Connected") {
        connection.stop();
      }
    };
  }, []);

  //actualizar el unreadCount
  useEffect(() => {
    const newUnreadCount = notifications.filter((n) => !n.read).length;
    setUnreadCount(newUnreadCount);
  }, [notifications]);



  const handleNotificationClick = (notification) => {
    // Update the Read parameter of the clicked notification
    const authToken = getAuthToken();

    if (!authToken) {
      //Navegar a Login
      navigate("/login");
    }
    notification.read = true;

    // Update the notification in the database
    axios
      .put(
        `https://localhost:7153/api/Notifications/${notification.id}`,
        notification,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log("Notification updated successfully");
        const newUnreadCount = notifications.filter((n) => !n.read).length;
        setUnreadCount(newUnreadCount);

        // Close popover if desired
        handleClose();

        // Navigate to notification URL
        window.location.href = notification.url;
      })
      .catch((error) => {
        console.error(error);
        console.error("Error updating notification");
      });
    // Recalculate unread count based on unread notifications
  };

  const handleMarkAllAsRead = () => {
    // Mark all notifications as read
    const authToken = getAuthToken();
    if (!authToken) {
      //Navegar a Login
      navigate("/login");
    }
    const updatedNotifications = notifications.map((n) => {
      n.read = true;
      return n;
    });

    // Update all notifications in the database
    axios
      .put("https://localhost:7153/api/Notifications/batchUpdate", updatedNotifications, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("All notifications updated successfully");
        setNotifications(updatedNotifications);
        setUnreadCount(0);
        handleClose();
      })
      .catch((error) => {
        console.error(error);
        console.error("Error updating notifications");
      });

  };

  const handleToggleShowOnlyUnread = () => {
    setShowOnlyUnread((prev) => !prev);
  };

  const handleOpenNotificationsPage = () => {
    // Navigate to notifications page
  };

  const open = Boolean(anchorEl);
  const id = open ? "notification-popover" : undefined;

  return (
    <div>
      <IconButton aria-describedby={id} onClick={handleClick}>
        <Badge badgeContent={unreadCount} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <div style={{ display: "flex", justifyContent: "flex-end", padding: "10px" }}>
          <Tooltip title="Abrir en una nueva pagina">
            <IconButton onClick={handleOpenNotificationsPage}>
              <OpenInNewIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title={showOnlyUnread ? "Mostrar Todas" : "Mostrar Solo No leídas"}>
            <IconButton onClick={handleToggleShowOnlyUnread}>
              {showOnlyUnread ? <ShowAllIcon /> : <ShowUnreadIcon />}
            </IconButton>
          </Tooltip>
          <Tooltip title="Marcar todas como leídas">
            <IconButton onClick={handleMarkAllAsRead}>
              <MarkAllAsReadIcon />
            </IconButton>
          </Tooltip>
        </div>
        <div style={{ maxHeight: "200px", overflowY: "auto", padding: "10px" }}>
          <ul>
            {unreadCount<=0 && showOnlyUnread? <p>No hay notificaciones nuevas</p> : notifications.map((notification, index) => {
              if (showOnlyUnread && notification.read) {
                return null;
              }
              return (
                <li
                  key={index}
                  onClick={() => handleNotificationClick(notification)}
                  style={{
                    backgroundColor: notification.read ? "transparent" : "#f0f0f0",
                    cursor: "pointer",
                    padding: "5px",
                    marginBottom: "5px",
                    borderRadius: "5px",
                  }}
                >
                  <strong>{notification.title}</strong>
                  <p>{notification.message}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </Popover>
    </div>
  );
};

export default Notification;
