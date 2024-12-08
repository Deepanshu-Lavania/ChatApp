import React, { useEffect } from "react";
import { useSocketContext } from "./SocketContext";
import { useConversation } from "../statemanage/UseConversation";
import sound from "../assets/Notify.wav";

export default function UseGetSocketMessage() {
  //messages at real time
  const { socket } = useSocketContext();
  const { message, setMessage } = useConversation();

  useEffect(() => {
    const handleNewMessage = (newMessage) => {
      console.log("New message received: ", newMessage);
      const notification = new Audio(sound);
        notification.play().catch((err) => {
          console.warn("Error playing notification sound:", err);
        });
      setMessage((prevMessages) => {
        console.log("Previous messages: ", prevMessages);
        return [...prevMessages, newMessage];
      });
    };
    socket.on("newMessage", handleNewMessage);
    console.log("================Socket:================ ", socket);
    console.log("all message are through UseGetSocketMessage.jsx is", message);
    return () => socket.off("newMessage", handleNewMessage);
  }, [socket, message, setMessage]);
}

/*   import React, { useEffect } from "react";
  import { useSocketContext } from "./SocketContext";
  import { useConversation } from "../statemanage/UseConversation";
  import sound from "../assets/Notify.wav";
  
  export default function UseGetSocketMessage() {
    const { socket } = useSocketContext(); // Access the socket instance
    const { setMessage } = useConversation(); // Access the state setter
  
    useEffect(() => {
      const handleNewMessage = (newMessage) => {
        // Play a notification sound for new messages
        const notification = new Audio(sound);
        notification.play().catch((err) => {
          console.warn("Error playing notification sound:", err);
        });
  
        console.log("New message received in UseGetSocketMessage.jsx:", newMessage);
  
        // Update the conversation state
        setMessage((prevMessages) => [...prevMessages, newMessage]);
      };
  
      // Listen for the "newMessage" event from the server
      socket.on("newMessage", handleNewMessage);
  
      // Cleanup the listener when the component unmounts
      return () => {
        socket.off("newMessage", handleNewMessage);
      };
    }, [socket, setMessage]);
  
    return null; // This component does not render anything; it only listens for events
  }
   */
