import React from "react";
import { useConversation } from "../../statemanage/UseConversation";
import { useSocketContext } from "../../context/SocketContext";

export default function Chatuser() {
  const { selectedConversation } = useConversation();
  console.log("selectedConversation is ============> ",selectedConversation);
  // {selectedConversation.name!==null?selectedConversation.name:"SelectName"}
  const { onlineUsers } = useSocketContext();

  const getOnlineUserStatus = (userId) => {
    return onlineUsers.includes(userId) ? "Online" : "Offline";
  };

  return (
    <div className="pl-5 py-5 pb-2  space-x-4 bg-gray-900 hover:bg-gray-600 duration-300">
      <div>
        {/* <div className={`avatar ${isOnline ? "online" : ""}`}> */}
        {/* <div className={`avatar online`}> */}
        <div className="avatar">
          <div className="w-14 rounded-full">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </div>
      </div>
      <div>
        <h1 className="text-lg">{selectedConversation.name}</h1>
        <span className="text-sm">
          {getOnlineUserStatus(selectedConversation._id)}
        </span>
      </div>
    </div>
  );
}
