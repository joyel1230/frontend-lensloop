import React, { useEffect, useState } from "react";
import Loading from "../loading/Loading";
import ToggleSwitch from "./toggle";
import { deletePost, getReports } from "../../services/admin/apiMethods";

const Reports = () => {
  const [loading, setloading] = useState(true);
  const [reports, setReports] = useState([]);
  useEffect(() => {
    getReports()
      .then((res) => {
        setReports(res.data?.reports);
        setloading(false);
      })
      .catch((err) => console.error(err));
  }, [loading]);

  const handleDelete = async (id, curValue) => {
    try {
      setloading(true);
      const data = { postId: id, value: !curValue };
      await deletePost(data);
      setTimeout(() => {
        setloading(false);
      }, 500);
    } catch (error) {}
  };

  return (
    <div className="container mx-auto px-4 ">
      {loading && <Loading bg="none" />}
      <div className="flex flex-wrap gap-10">
        {reports.map((report) => (
          <div
            className="flex flex-col w-64 border-2 border-black p-3 rounded-xl"
            key={report._id}
          >
            <img src={report.postId?.image} alt="" className="w-fit" />
            <div className="text-center mb-5">
              <h1 className="font-bold text-red-500 overflow-hidden h-auto">{report.reason}</h1>
              <p>report by {report.reporterId?.username}</p>
            </div>
            <div className="flex px-10 justify-center text-xs">
              <span
                onClick={() =>
                  handleDelete(report.postId?._id, report.postId?.deleted)
                }
              >
                <ToggleSwitch
                  checked={report.postId?.deleted}
                  color={"green"}
                />
                Delete Post
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reports;
