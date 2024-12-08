import React, { useEffect, useState } from "react";
import { useConversation } from "../statemanage/UseConversation";
import axios from "axios";

export default function useGetMessage() {
  const [loading, setLoading] = useState(false);
  const { message, setMessage, selectedConversation } = useConversation();

  useEffect(() => {
    const getMessage = async () => {
      setLoading(true);
      if (selectedConversation && selectedConversation._id) {
        try {
          console.log(
            "selectedConversation._id is : ",
            selectedConversation._id
          );
          const response = await axios.get(
            `/api/message/get/${selectedConversation._id}`
          );
          // const data = await response.json();
          console.log("message response is : ", response.data);

          setMessage(response.data);
          setLoading(false);
        } catch (error) {
          console.log("Error in useGetMessage : ", error);
        }
      }
    };
    getMessage();
  }, [selectedConversation, setMessage]);
  return { message, loading };
}
