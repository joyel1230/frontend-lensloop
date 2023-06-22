import React, { useEffect, useRef, useState } from "react";
import ToggleSwitch from "./toggle";
import { adminApiCall } from "../../services/admin/apiCalls";
import { adminUrls } from "../../const/routesPath";
import Loading from "../loading/Loading";
import { BiRefresh } from "react-icons/bi";
import ProfilePic from "../profile/ProfilePic";

const Home = () => {
  const [users, setUsers] = useState(null);
  const [searchData, setSearchData] = useState([]);
  const [refresh, setRefresh] = useState(1);
  const [loading, setLoading] = useState(false);
  const searchValue = useRef();
  useEffect(() => {
    setLoading(true);
    adminApiCall("get", adminUrls.adminUsers).then((res) => {
      setLoading(false);
      setUsers(res.data);
      setSearchData(res.data);
    });
  }, [refresh]);

  const handleSearch = (e) => {
    const search = e.target.value.trim();
    const finalData = users.filter((user) => {
      return user.username.includes(search) || user.email.includes(search);
    });
    setSearchData(finalData);
  };

  const handleVerificationStatus = async (id, curValue, username) => {
    try {
      const data = { status: { changeKey: "verified", bool: !curValue } };
      setLoading(true);
      const response = await adminApiCall(
        "patch",
        `${adminUrls.adminUsersStatus}/${username}`,
        data
      );
      if (response.status === 200) {
        setLoading(false);
        setSearchData((prevUsers) => {
          return prevUsers.map((user) => {
            if (user._id === id) {
              const status = user.verified ? false : true;
              return { ...user, verified: status };
            }
            return user;
          });
        });
        setUsers((prevUsers) => {
          return prevUsers.map((user) => {
            if (user._id === id) {
              const status = user.verified ? false : true;
              return { ...user, verified: status };
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

  const handleBlockStatus = async (id, curValue, username) => {
    try {
      const data = { status: { changeKey: "blocked", bool: !curValue } };
      setLoading(true);
      const response = await adminApiCall(
        "patch",
        `${adminUrls.adminUsersStatus}/${username}`,
        data
      );
      if (response.status === 200) {
        setLoading(false);
        setSearchData((prevUsers) => {
          return prevUsers.map((user) => {
            if (user._id === id) {
              const status = user.blocked ? false : true;
              return { ...user, blocked: status };
            }
            return user;
          });
        });
        setUsers((prevUsers) => {
          return prevUsers.map((user) => {
            if (user._id === id) {
              const status = user.verified ? false : true;
              return { ...user, verified: status };
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
      {loading && <Loading />}
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
              <th className="py-2 px-4 border-b">Profile Picture</th>
              <th className="py-2 px-4 border-b">Username</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Verified</th>
              <th className="py-2 px-4 border-b">Blocked</th>
            </tr>
          </thead>
          <tbody>
            {searchData.map((user) => (
              <tr key={user._id} className="bg-white text-center">
                <td className="py-2 px-4 border-b flex justify-center">
                  {/* <img
                    src={user.profilePic}
                    alt="Profile"
                    className="w-10 h-10 rounded-full"
                  /> */}
                  <ProfilePic
                    width="40"
                    dpUrl={user.profilePic}
                    online={user?.online ? true : false}
                  />
                </td>
                <td className="py-2 px-4 border-b">{user.username}</td>
                <td className="py-2 px-4 border-b">{user.email}</td>
                <td
                  className="py-2 px-4 border-b"
                  onClick={() =>
                    handleVerificationStatus(
                      user._id,
                      user.verified,
                      user.username
                    )
                  }
                >
                  <ToggleSwitch checked={user.verified} color="red" />
                </td>
                <td
                  className="py-2 px-4 border-b"
                  onClick={() =>
                    handleBlockStatus(user._id, user.blocked, user.username)
                  }
                >
                  <ToggleSwitch checked={user.blocked} color="green" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {searchData.length === 0 && <span className="text-2xl"> No results</span>}
    </div>
  ) : (
    <div className="flex justify-center w-full">
      <Loading />
    </div>
  );
};

export default Home;
