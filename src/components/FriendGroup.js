import { BsFillTrashFill } from "react-icons/bs";
import { useFriendsList } from "../MainContext";
import db from "../firebase";
import { doc, deleteDoc } from "firebase/firestore";

const FriendGroup = () => {
  const { group, setGroup, name, setName } = useFriendsList();

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const addGroup = () => {
    if (group.map((group) => group.name).includes(name)) {
      alert("Group already exists!");
    } else {
      db.collection("friendGroups")
        .doc(name)
        .set({
          group: {
            name: name,
            items: [],
          },
        });
    }
    setGroup([...group]);
    setName("");
  };

  const deleteGroup = (groupName) => {
    deleteDoc(doc(db, "friendGroups", groupName));
  };

  const deleteMember = (index, groupName) => {
    group.forEach((group) => {
      if (group.name === groupName) {
        group.items.splice(index, 1);
      }
    });
    setGroup([...group]);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Add Group"
        className="px-1"
        value={name}
        onChange={handleChange}
      />
      <input
        disabled={name === "" ? true : false}
        type="button"
        value="Add"
        className="border border-purple-800 disabled:cursor-not-allowed bg-purple-800 text-white rounded cursor-pointer enabled:hover:bg-white enabled:hover:text-purple-800 transition-all duration-100"
        onClick={addGroup}
      />

      {group.map((group) => {
        return (
          <ul
            key={group.name}
            className="text-bold bg-green-200 border flex flex-col gap-y-3 mb-3 relative rounded"
          >
            <h2 className="text-center font-bold underline capitalize text-lg">
              {group.name === "Select an Option" ? "" : group.name}
            </h2>

            {group.name === "Select an Option" ? (
              ""
            ) : (
              <div>
                <button
                  onClick={() => deleteGroup(group.name)}
                  className="hover:scale-125 font-extrabold hover:text-red-700 absolute top-2 right-2"
                >
                  <BsFillTrashFill />
                </button>
              </div>
            )}

            {group.items.map((item, index) => {
              return (
                <div
                  key={index}
                  className="flex border-b-2 border-purple-300 justify-between group px-3 cursor-pointer "
                >
                  <li className="font-semibold text-[15px] h-6">
                    {index + 1} - {item}
                  </li>
                  <button
                    onClick={() => deleteMember(index, group.name)}
                    className="hidden group-hover:block hover:scale-125 hover:font-extrabold hover:text-red-700"
                  >
                    X
                  </button>
                </div>
              );
            })}
          </ul>
        );
      })}
    </div>
  );
};

export default FriendGroup;
