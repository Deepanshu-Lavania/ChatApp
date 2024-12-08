import React, { useEffect} from "react";
import User from "./User";
import GetAllUsers from "../../context/GetAllUsers";
import Loading from "../../components/Loading";


export default function Users() {

  const [allUsers, loading] = GetAllUsers();
  console.log("allusers are : ", allUsers);

 

  if (loading) {
    return <Loading/>;
  }

  return (
    <>
    {/* Ist div */}
      {/* <div>
        {selectedConversation ? (
          <div>
            <Chatuser />
            <Messages />
            <Type />
          </div>
        ) : (
          <div
            style={{
              maxHeight: "calc(87vh)",
              overflowY: "auto",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {allUsers.map((user, index) => (
              <User key={index} user={user} />
            ))}
          </div>
        )}
      </div> */}
      <div
            style={{
              overflowY: "auto",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
            className="flex-grow"
          >
            {allUsers.map((user, index) => (
              <User key={index} user={user} />
            ))}
          </div>
    </>
  );
}
