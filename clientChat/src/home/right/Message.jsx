import React from "react";

export default function Message({ message, previousMessage }) {
  const getLoggedInUserId = JSON.parse(localStorage.getItem("messenger"));
  const itsMe = message?.senderId === getLoggedInUserId?.user?._id;
  // console.log("======= itsMe ========", itsMe);

  const chatAlignment = itsMe ? "chat-end" : "chat-start";
  const chatBubbleColor = itsMe ? "bg-blue-500" : "";
  // console.log("send message in Message.jsx : ", message);

  const getDate = new Date(message.createdAt).toLocaleDateString([], {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  // Format current message's date
  const currentDate = getDate;

  //* Format previous message's date (if it exists)
  // console.log("previousMessage is : ", previousMessage);

  const previousDate = previousMessage ? getDate : null;

  // Show date only if it's the first message of the day
  const showDate = !previousMessage || currentDate !== previousDate;

  // Format time for the message
  const formattedTime = new Date(message.createdAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  // console.log("formattedTime is ========> ", formattedTime);

  return (
    <>
      {showDate && (
        <div className="text-gray-300 text-center my-2 font-bold py-4">
          {currentDate}
        </div>
      )}
      <div>
        <div className={`chat ${chatAlignment} flex flex-col mx-2`}>
          <div className={`chat-bubble text-white ${chatBubbleColor}`}>
            {message.message}
          </div>
          <div className="text-gray-400 text-sm">{formattedTime}</div>
        </div>
      </div>
    </>
  );
}
