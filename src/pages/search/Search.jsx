import React, { useRef, useState } from "react";
import { useEffect } from "react";
import Loading from "../../components/loading/Loading";
import { getUsers } from "../../services/admin/apiMethods";
import { Link } from "react-router-dom";

const Search = ({ show }) => {
  const [users, setUsers] = useState([]);
  const [searchUsers, setSearchUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchInp = useRef();
  useEffect(() => {
    searchInp.current.focus();
    getUsers()
      .then((resp) => {
        setUsers(resp.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSearch = (e) => {
    const str = e.target.value.trim();
    if (str === "") {
      setSearchUsers([]);
      return;
    }
    const data = users.filter((user) => {
      return (
        user.username?.toLowerCase()?.includes(str.toLowerCase()) ||
        user.name?.toLowerCase()?.includes(str.toLowerCase())
      );
    });
    setSearchUsers(data);
  };

  return (
    <>
      <div
        className="fixed top-0 left-0 right-0 bottom-0 z-10"
        onClick={() => show(false)}
      ></div>

      <div className="w-[22rem] rounded-xl h-[35rem] hide-scrollbar overflow-y-auto bg-black bg-opacity-90 fixed top-[50%] left-[50%] right-[auto] bottom-[auto] -mr-[50%] transform translate-x-[-50%] translate-y-[-50%]  z-20 border-2">
        <h2 className="text-lg text-center pt-2 font-semibold font-sans">
          Search Users
        </h2>
        <div className="p-10">
          <input
            type="search"
            ref={searchInp}
            onChange={handleSearch}
            className="w-full bg-transparent px-4 py-2 hide-scrollbar border text-white border-gray-300 rounded-md focus:outline-none"
          />
        </div>
        {!loading ? (
          <div className="flex flex-col gap-5 justify-center">
            {searchUsers.length !== 0
              ? searchUsers.map((user) => {
                  return (
                    <Link to={`/${user.username}`} onClick={() => show(false)} key={user._id}>
                      <div className="flex w-[80%] ms-16">
                        <div className="w-[20%]">
                          <img
                            src={user.profilePic}
                            className="w-12 rounded-full"
                            alt=""
                          />
                        </div>
                        <div>
                          <h1 className="w-full ms-3 text-lg flex items-center">
                            {user.username}{" "}
                            <span className="text-gray-400">-{user.name}</span>
                          </h1>
                          <p className="text-sm ms-3 text-gray-500">
                            432K followers
                          </p>
                        </div>
                      </div>
                    </Link>
                  );
                })
              : ""}
          </div>
        ) : (
          <Loading bg={true} />
        )}
      </div>
    </>
  );
};

export default Search;
