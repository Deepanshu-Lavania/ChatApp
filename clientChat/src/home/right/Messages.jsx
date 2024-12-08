import React, { useEffect, useRef } from "react";
import Message from "./Message";
import useGetMessage from "../../context/useGetMessage";
import Loading from "../../components/Loading";
import UseGetSocketMessage from "../../context/UseGetSocketMessage";

export default function Messages() {
  const { message, loading } = useGetMessage();
  console.log("message is : ", message);
  console.log("loading is ", loading);
  console.log("message length is : ", message.length);

  //* listen messages at real time
  // UseGetSocketMessage();
  console.log(
    " listen messages at real time through  UseGetSocketMessage.jsx===> ",
    message
  );

  const lastMessageRef = useRef();
  useEffect(() => {
    setTimeout(() => {
      if (lastMessageRef.current) {
        lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  }, [message]);

  return (
    <>
      <UseGetSocketMessage />
      <div
        style={{
          // height: "calc(89vh - 15vh)",
          overflowY: "auto",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
        className="flex-grow"
      >
        {/* <Message />
        <Message /> */}
        {loading ? (
          <Loading />
        ) : (
          /* message.length > 0 &&
          message.map((message, index) => (
            <div key={message._id} ref={lastMessageRef}>
              <Message
                message={message}
                previousMessage={index > 0 ? message[index - 1] : null}
              />
            </div>
          )) */
          message.length > 0 &&
          message.map(
            (
              msg,
              index //stay msg because if you use message despite of msg then it will confuse
            ) => (
              <div
                key={msg._id}
                ref={index === message.length - 1 ? lastMessageRef : null}
              >
                <Message
                  message={msg}
                  previousMessage={index > 0 ? message[index - 1] : null} // Pass the correct previous message
                />
              </div>
            )
          )
        )}
        {!loading && message.length === 0 && (
          <div>
            <p className="text-center font-sans mt-[20%] text-white">Say hi!</p>
          </div>
        )}
      </div>
    </>
  );
}
