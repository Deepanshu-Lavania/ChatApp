import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import useGetAllUsers from "../../context/GetAllUsers";
import { useConversation } from "../../statemanage/UseConversation";

export default function Search() {
  const [search, setSearch] = useState("");
  const [allUsers] = useGetAllUsers();
  const { setSelectedConversation } = useConversation();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    const conversation = allUsers.find((user) =>
      user.name.toLowerCase().includes(search.toLowerCase())
    );

    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else {
      alert("User not found");
    }
  };
  return (
    <div className=" mb-5">
      <div className="px-4 py-4">
        <form onSubmit={handleSubmit}>
          <div className="flex gap-2">
            <label className="border-[1px]  border-gray-700 bg-slate-900 rounded-lg flex items-center p-3 gap-2 w-[80%] h-10">
              <input
                type="text"
                className="outline-none bg-transparent w-[100%]"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </label>
            <button>
              <IoIosSearch className="text-4xl p-1 hover:bg-gray-600 rounded-full duration-300" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
