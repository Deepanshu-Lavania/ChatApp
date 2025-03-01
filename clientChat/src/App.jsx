import React, { useEffect } from "react";
import LeftSide from "./home/left/LeftSide";
import RightSide from "./home/right/RightSide";
import Logout from "./home/left/left1/Logout";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { useAuth } from "./context/AuthProvider";
import { Routes, Route, Navigate } from "react-router-dom";
import { useConversation } from "./statemanage/UseConversation";

export default function App() {
  const { selectedConversation, setSelectedConversation } = useConversation(); // Correctly destructuring the object returned by useConversation
  const [authUser] = useAuth();

  useEffect(() => {
    // Reset selectedConversation on component mount
    setSelectedConversation(null);
  }, [setSelectedConversation]);
  console.log("authentic user data is : ", authUser);
  console.log("............. selectedConversation in the App Component .................. ", selectedConversation);
  
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            authUser ? (
              <div className="flex w-full h-screen">
                <div className=" bg-slate-900 text-white flex flex-col justify-between py-2">
                  <Logout />
                </div>
                <div className={`${selectedConversation ? "hidden":"w-full"} bg-black text-white flex flex-col sm:w-[30%] sm:block`}>
                  <LeftSide />
                </div>
                <div className={`${selectedConversation ? "w-full":"hidden"}   bg-slate-900 text-white sm:w-full sm:block`}>
                  <RightSide />
                </div>
              </div>
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />
        <Route
          path="/login"
          element={authUser ? <Navigate to={"/"} /> : <Login />}
        />
        <Route
          path="/signup"
          element={authUser ? <Navigate to={"/"} /> : <Signup />}
        />
      </Routes>
    </>
  );
}
