import { createContext, useContext, useEffect } from "react";
import { useState } from "react";
import db from "./firebase.js";

const MainContext = createContext();

export const UserProvider = ({ children }) => {
  const [list, setList] = useState([]);
  const [key, setKey] = useState("");
  const [group, setGroup] = useState([]);
  const [name, setName] = useState("");
  const [members, setMembers] = useState("");

  useEffect(() => {
    db.collection("friends").onSnapshot((snapshot) => {
      setList(snapshot.docs.map((doc) => doc.data().member));
    });
    db.collection("friendGroups").onSnapshot((snapshot) => {
      setGroup(snapshot.docs.map((doc) => doc.data().group));
    });
  }, []);

  const toggleMenu = (keyValue) => {
    if (key === keyValue) {
      setKey("");
    } else {
      setKey(keyValue);
    }
  };

  const data = {
    setGroup,
    group,
    name,
    setName,
    list,
    key,
    toggleMenu,
    members,
    setMembers,
  };
  return <MainContext.Provider value={data}>{children}</MainContext.Provider>;
};

export const useFriendsList = () => useContext(MainContext);
