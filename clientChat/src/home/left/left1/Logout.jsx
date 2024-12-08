import React, { useState } from "react";
import { BiLogOutCircle } from "react-icons/bi";
import { MdChat } from "react-icons/md";
import axios from "axios";
import Cookies from "js-cookie";
import { useConversation } from "../../../statemanage/UseConversation";

export default function Logout() {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const [loading, setLoading] = useState(false);
  const handleLogout = async () => {
    setLoading(true);
    const logConfirm=confirm("Do you want to logout ? ");
   if (logConfirm) {
    try {
      const res = await axios.post("/api/user/logout");
      localStorage.removeItem("messenger");
      Cookies.remove("jwt");
      // alert("Logout Successfully");
      if (setLoading) {
        setLoading(false);
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
   }
  };
  const handleBackBtn = () => {
    window.history.back();
  };
  return (
    <>
      <div className="align-top">
        <button onClick={handleBackBtn} className={`${selectedConversation?"block":"hidden"} sm:hidden `}>
          <MdChat className="text-4xl mx-1 p-1 my-3 hover:bg-gray-600 rounded-lg duration-300"/>
        </button>
      </div>
      <div className="align-bottom">
        <button onClick={handleLogout}>
          <BiLogOutCircle className="text-4xl mx-1 p-1 hover:bg-gray-600 rounded-lg duration-300" />
        </button>
      </div>
    </>
  );
}
