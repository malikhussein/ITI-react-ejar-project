import React, { useEffect, useState } from "react";
import useProcessStore from "../../Store/process";
import ReviewModl from "./ReviewModel";
import "./ReviewPage.css";

const ReviewPage = () => {
  const { getFinishedProcesses, finishedProcesses } = useProcessStore();
  const [selectedProcess, setSelectedProcess] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("UserToken");
    getFinishedProcesses(token);
    console.log(finishedProcesses);
    console.log("userProcesses", finishedProcesses);
  }, [getFinishedProcesses]);

  return (
    <>
      <div className=" container ">
        <div className="row">
          {finishedProcesses.map((item) => (
            <div className="col-md-3" key={item._id}>
              <div className="card mb-4">
               <div className="square-image">
               <img
                  src={item.productId.images[0]}
                  alt={item.productId.name}
                  className="card-img-top"
                />
                </div> 
                <div className="card-body">
                  <h2 className="card-title">{item.productId.name}</h2>
                  <h3 className="card-text">EGP {item.price}</h3>
                  <h5 className="card-text"> {item.startDate}</h5>
                  <h6 className="card-text"> {item.endDate}</h6>
                  <h6 className="card-text">Status: {item.status}</h6>
                </div>
                <button
                  className="btn-secandry w-300 h-50"
                  data-bs-toggle="modal"
                  data-bs-target="#rentModal"
                  onClick={() => setSelectedProcess(item)}
                >
                  Create Review
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ReviewModl selected={{ selectedProcess }} />
    </>
  );
};

export default ReviewPage;

