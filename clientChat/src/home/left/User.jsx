import React from "react";
import { useConversation } from "../../statemanage/UseConversation";
import { useSocketContext } from "../../context/SocketContext";

export default function User({ user }) {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === user._id; //*Optional Chaining (?.) ensures the code doesn’t throw an error if selectedConversation is null or undefined.
  
  const { socket, onlineUsers } = useSocketContext();
  // console.log("selectedConversation._id is : ",selectedConversation._id);
  // console.log("user._id is : ",user._id);
  // console.log("onlineUsers is  =========>", onlineUsers);
  
  const isOnline = onlineUsers.includes(user._id);

  return (
    <div
      className={`hover:bg-slate-600 duration-300 ${
        isSelected ? "bg-slate-700" : ""
      }`}
      onClick={() => setSelectedConversation(user)}
    >
      <div className="flex space-x-4 px-6 py-5 hover:bg-slate-600 duration-300 cursor-pointer">
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-14 rounded-full">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </div>
        <div>
          <h1 className="font-bold">{user.name}</h1>
          <span className="font-light">{user.email}</span>
        </div>
      </div>
    </div>
  );
}
