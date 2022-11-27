import { useEffect } from "react";
import FriendList from "./components/FriendList";
import FriendGroup from "./components/FriendGroup";
import { BsFillStarFill } from "react-icons/bs";

import { UserProvider } from "./MainContext";

function App() {
  return (
    <UserProvider>
      <div className="bg-gray-200">
        <div className="flex justify-between p-4 h-screen">
          <FriendList />
          <h1 className="flex text-center bg-red-800 h-11 items-center px-2 text-2xl text-white rounded gap-x-2">
            <BsFillStarFill />
            FRIEND CATEGORIZER APP
            <BsFillStarFill />
          </h1>
          <FriendGroup />
        </div>
      </div>
    </UserProvider>
  );
}

export default App;
