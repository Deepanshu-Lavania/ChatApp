import { useState } from "react";
import axios from "axios";
import { useConversation } from "../statemanage/UseConversation";

export default function useSendMessage() {
  const [loading, setLoading] = useState(false);
  const { message, setMessage, selectedConversation } = useConversation();

  //* why don't use useEffect :
  //?    In your useSendMessage hook, sendMessages is defined inside useEffect, which makes it unavailable outside the hook. Move it out of useEffect to allow calling it from the Type component.
  const sendMessages = async (msg) => {
    console.log("message is during send message : ",msg);
    
    setLoading(true);
    if (selectedConversation && selectedConversation._id) {
      try {
        console.log("selectedConversation._id during send message is : ", selectedConversation._id);
        const response = await axios.post(
          `/api/message/send/${selectedConversation._id}`,{message:msg}
        );
        // const data = await response.json();
        console.log("message send response is : ", response.data);
        console.log("messages are ==============> ",message);
        
        setMessage([...message, response.data]);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log("Error during send Message : ", error.response.data);
      }
    }
  };
  // sendMessages();
  return { loading, sendMessages };
}
