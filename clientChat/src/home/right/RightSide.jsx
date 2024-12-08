import React, { useEffect } from "react";
import Chatuser from "./Chatuser";
import Messages from "./Messages";
import Type from "./Type";
import { useConversation } from "../../statemanage/UseConversation";
import { useAuth } from "../../context/AuthProvider";

export default function RightSide() {
  const { selectedConversation, setSelectedConversation } = useConversation();
  useEffect(() => {
    return setSelectedConversation(null);
  }, [setSelectedConversation]);
  console.log(
    "selectedConversation is become : ",
    selectedConversation,
    "and setSelectedConversation is become  ",
    setSelectedConversation
  );

  return (
    <>
      
        {!selectedConversation ? (
          <Nochat />
        ) : (
          <>
          <div className="flex flex-col h-screen">
            <Chatuser />
            <Messages />
            <Type />
          </div>
          </>
        )}
      
    </>
  );
}

const Nochat = () => {
  const [authUser] = useAuth();
  return (
    <>
      <div className="flex h-screen items-center justify-center">
        <h1 className="text-center font-semibold text-xl ">
          Welcome{" "}
          <span className="font-bold text-2xl text-red-400">
            {authUser.user.name}
          </span>{" "}
          ,
          <br />
          Select a chat to start messaging.
        </h1>
      </div>
    </>
  );
};
// import React, { useEffect } from "react";
// import Chatuser from "./Chatuser";
// import Messages from "./Messages";
// import Type from "./Type";
// import { useConversation } from "../../statemanage/UseConversation";
// import { useAuth } from "../../context/AuthProvider";

// export default function RightSide() {
//   const { selectedConversation, setSelectedConversation } = useConversation();
//   useEffect(() => {
//     return setSelectedConversation(null);
//   }, [setSelectedConversation]);
//   console.log(
//     "selectedConversation is become : ",
//     selectedConversation,
//     "and setSelectedConversation is become  ",
//     setSelectedConversation
//   );

//   return (
//     <>
//       <div className="hidden bg-slate-900 text-white sm:w-full sm:block">
//         <div>
//           {!selectedConversation ? (
//             <Nochat />
//           ) : (
//             <>
//               <Chatuser />
//               <Messages />
//               <Type />
//             </>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

// const Nochat = () => {
//   const [authUser] = useAuth();
//   return (
//     <>
//       <div className="flex h-screen items-center justify-center">
//         <h1 className="text-center font-semibold text-xl ">
//           Welcome <span className="font-bold text-2xl text-red-400">{authUser.user.name}</span> ,
//           <br />
//           Select a chat to start messaging.
//         </h1>
//       </div>
//     </>
//   );
// };
