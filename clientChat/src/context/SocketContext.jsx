import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";
import io from "socket.io-client"; //for client

const socketContext = createContext(); //whearHouse

export const useSocketContext = () => {
  //custom Hook ==> Consumer
  return useContext(socketContext);
};

export const SocketProvider = ({ children }) => {
  // ==> Provider
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  const [authUser] = useAuth();

  //!   The client uses emit to send events to the server. The server listens with on
  useEffect(() => {
    if (authUser) {
      const socket = io("http://localhost:8000", {
        query: {
          userId: authUser.user._id,
        },
      });
      setSocket(socket);
      socket.on("getonline", (users) => {
        //argument from socket.js
        // console.log("users from socket.js : ",users);
        setOnlineUsers(users);
        console.log("Socket disconnected from SocketContext.jsx");
      });
      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);

  return (
    <>
      <socketContext.Provider value={{ socket, onlineUsers }}>
        {children}
      </socketContext.Provider>
    </>
  );
};
