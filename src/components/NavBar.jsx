import { data } from "autoprefixer";
import React, { useEffect } from "react";
import { getUserById } from "../api/getUserById";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../redux/user/userSlice";

const NavBar = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    let currentUser = sessionStorage.getItem("currentUser");
    if (currentUser) {
      (async () => {
        currentUser = JSON.parse(currentUser)?.user?._id;
        const { user } = await getUserById(currentUser);
        dispatch(
          updateUser({
            userId: user._id,
            username: user.username,
            email: user.email,
          })
        );
      })();
    }
    return () => {};
  }, [dispatch]);
  
  const { userId, username, email } = useSelector((state) => state.user);

  return (
    <>
      <div className="fixed h-12 w-full flex justify-between items-center bg-black px-8">
        <h1 className="text-white font-bold text-xl">Task Manager</h1>
        <h1 className="text-white">{username}</h1>
      </div>
    </>
  );
};

export default React.memo(NavBar);
