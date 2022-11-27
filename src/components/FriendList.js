import { MdGroups } from "react-icons/md";
import { useFriendsList } from "../MainContext";
import { doc, setDoc } from "firebase/firestore";
import db from "../firebase.js";

const FriendList = () => {
  const { group, list, key, toggleMenu } = useFriendsList();

  const handleChange = (friend, target) => {
    toggleMenu();
    group.forEach((g) => {
      if (g.name === target) {
        if (g.items.includes(friend)) {
          alert("Friend already exists in that group!");
        } else {
          setDoc(doc(db, "friendGroups", target), {
            group: {
              name: target,
              items: [...g.items, friend],
            },
          });
        }
      }
    });
  };

  return (
    <div className="border-2 border-purple-900 bg-gray-400 w-52 text-center text-[17px] font-semibold pb-2">
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
