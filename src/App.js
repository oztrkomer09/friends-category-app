import { useEffect } from "react";
import FriendList from "./components/FriendList";
import FriendGroup from "./components/FriendGroup";

import { UserProvider } from "./MainContext";

function App() {
  return (
    <UserProvider>
      <div className="bg-gray-200">
        <div className="flex justify-between p-4 h-screen">
          <FriendList />

          <FriendGroup />
        </div>
      </div>
    </UserProvider>
  );
}

export default App;
