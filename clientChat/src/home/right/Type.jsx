import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import useSendMessage from "../../context/useSendMessage";

export default function Type() {
  const { loading, sendMessages } = useSendMessage();
  const [msg, setMsg] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendMessages(msg);
    setMsg("");
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="px-4 py-5 text-center h-full w-[100%] bg-slate-800 ">
          <div className="flex gap-2">
            <label className="border-[1px]  border-gray-700 bg-slate-900 rounded-lg flex items-center p-4 gap-2 w-[70%] h-10">
              <input
                type="text"
                value={msg}
                onChange={(e) => {
                  setMsg(e.target.value);
                }}
                className="outline-none bg-slate-900 w-[100%]"
                placeholder="Type here"
              />
            </label>
            <button>
              <IoSend className="text-4xl p-1 hover:bg-gray-600 rounded-lg duration-300" />
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
