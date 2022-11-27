import { MdGroups } from "react-icons/md";
import { useState } from "react";
import { useFriendsList } from "../MainContext";
import { doc, updateDoc } from "firebase/firestore";
import db from "../firebase.js";

const FriendList = () => {
  const { setGroup, group, list, key, toggleMenu, members, setMembers } =
    useFriendsList();

  const handleChange = (friend, target) => {
    toggleMenu();
    group.forEach((group) => {
      if (group.name === target) {
        setMembers(group.items);
      }
    });
    console.log(members);
    const docRef = doc(db, "friendGroups", target);

    const data = {
      group: {
        name: target,
        items: [...members, friend],
      },
    };
    updateDoc(docRef, data);

    // group.forEach((g) => {
    //   if (target === g.name) {
    //     if (g.items.includes(friend)) {
    //       alert("Friend already exists!");
    //     } else {
    //       g.items.push(friend);
    //       console.log(g);
    //     }
    //   }
    // });
    // setGroup([...group]);
  };

  return (
    <div className="border-2 border-purple-900 bg-gray-400 w-52 text-center text-lg font-semibold">
      <h2>FRIENDS LIST</h2>
      <ul className="gap-y-4">
        {list.map((friend) => {
          return (
            <div
              key={friend}
              className="flex justify-between hover:bg-gray-600 hover:text-white group cursor-pointer px-3 relative"
            >
              <li>
                {list.indexOf(friend) + 1}- {friend}
              </li>
              <button
                className="hidden group-hover:block hover:scale-125 "
                onClick={() => toggleMenu(friend)}
              >
                <MdGroups />
              </button>

              {key === friend ? (
                <select
                  placeholder="aaa"
                  onChange={(e) => {
                    handleChange(friend, e.target.value);
                  }}
                  className="absolute top-0 -right-44 bg-black w-44 text-white text-lg p-2 "
                >
                  {group.map((group, index) => {
                    return (
                      <option key={index} value={group.name}>
                        {group.name}
                      </option>
                    );
                  })}
                </select>
              ) : null}
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default FriendList;
