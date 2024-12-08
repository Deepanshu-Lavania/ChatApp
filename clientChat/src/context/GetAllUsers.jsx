import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie"; // Don't forget to import this if you're using cookies

export default function useGetAllUsers() {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);


  //! To get data from DataBase
  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      try {
        const token = Cookies.get("jwt"); // Ensure Cookies is correctly imported
        const response = await axios.get("/api/user/getalluser", {
          credentials: "include",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAllUsers(response.data);
      } catch (error) {
        console.error("Error fetching users: ", error);
      } finally {
        setLoading(false);
      }
    };
    getUsers();
  }, []);

  return [allUsers, loading];
}
