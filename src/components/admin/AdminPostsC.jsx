import React, { useEffect, useRef, useState } from "react";
import ToggleSwitch from "./toggle";
import { adminApiCall } from "../../services/admin/apiCalls";
import { postUrls } from "../../const/routesPath";
import Loading from "../loading/Loading";
import { BiRefresh } from "react-icons/bi";

const AdminPostC = () => {
  const [users, setUsers] = useState(null);
  const [searchData, setSearchData] = useState([]);
  const [refresh, setRefresh] = useState(1);
  const [loading, setLoading] = useState(false);
  const searchValue = useRef();
  useEffect(() => {
    setLoading(true);
    adminApiCall("get", postUrls.posts, { params: { userId: "admin" } })
      .then((res) => {
        setLoading(false);
        setUsers(res.data);
        setSearchData(res.data);
      })
      .catch((e) => console.log(e));
  }, [refresh]);

  const handleSearch = (e) => {
    const search = e.target.value.trim();
    const finalData = users.filter((user) => {
      return user.userId.username.includes(search);
    });
    setSearchData(finalData);
  };

  const handleDeleteStatus = async (id, curValue) => {
    try {
      const data = { postId: id, value: !curValue };
      setLoading(true);
      const response = await adminApiCall(
        "patch",
        `${postUrls.postsDelete}`,
        data
      );
      if (response.status === 200) {
        setLoading(false);
        setSearchData((prevUsers) => {
          return prevUsers.map((user) => {
            if (user._id === id) {
              const status = user.deleted ? false : true;
              return { ...user, deleted: status };
            }
            return user;
          });
        });
        setUsers((prevUsers) => {
          return prevUsers.map((user) => {
            if (user._id === id) {
              const status = user.deleted ? false : true;
              return { ...user, deleted: status };
            }
            return user;
          });
        });
      }
    } catch (error) {
      setLoading(false);
      console.log(error.message);
    }
  };

  return users ? (
    <div className="container mx-auto px-4 ">
      {loading && <Loading bg="none" />}
      <span className="hidden">
        <ToggleSwitch />
      </span>
      <button
        className="bg-black fixed hover:bg-green-600 top-8 text-white font-bold py-2 px-4 rounded-xl "
        onClick={() => setRefresh(refresh + 1)}
      >
        <span className="flex items-center gap-1">
          <BiRefresh />
          <span>Refresh</span>
        </span>
      </button>
      <input
        type="text"
        className="border border-gray-300 rounded-md py-2 px-4 top-20 fixed"
        placeholder="Search by username"
        ref={searchValue}
        onChange={(e) => handleSearch(e)}
      />
      <div className="mt-8 overflow-x-auto hide-scrollbar">
        <table className="table-auto w-full mt-20 overflow-hidden">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b">Post</th>
              <th className="py-2 px-4 border-b">Username</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Date</th>
              <th className="py-2 px-4 border-b">Deleted</th>
            </tr>
          </thead>
          <tbody>
            {searchData.map((user1, index, array) => {
              const user = array[array.length - 1 - index];
              return (
                <tr key={user._id} className="bg-white text-center">
                  <td className="py-2 px-4 border-b flex justify-center">
                    <img src={user?.image} width={70} alt="" />
                  </td>
                  <td className="py-2 px-4 border-b">
                    {user?.userId?.username}
                  </td>
                  <td className="py-2 px-4 border-b">{user?.userId?.email}</td>
                  <td className="py-2 px-4 border-b">
                    {user.date.slice(0, 10)}
                  </td>
                  <td
                    className="py-2 px-4 border-b"
                    onClick={() => handleDeleteStatus(user._id, user.deleted)}
                  >
                    <ToggleSwitch checked={user.deleted} color="green" />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {searchData.length === 0 && <span className="text-2xl"> No results</span>}
    </div>
  ) : (
    <div className="flex justify-center w-full">
      <Loading bg={"none"} />
    </div>
  );
};

export default AdminPostC;
