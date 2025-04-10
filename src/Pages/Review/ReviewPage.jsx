import React, { useEffect, useState } from "react";
import useProcessStore from "../../Store/process";
import ReviewModl from "./ReviewModel";
import "./ReviewPage.css";

const ReviewPage = () => {
  const { getFinishedProcesses, finishedProcesses } = useProcessStore();
  const [selectedProcess, setSelectedProcess] = useState(null);
  const [reviewCreated, setReviewCreated] = useState();

  useEffect(() => {
    const token = localStorage.getItem("UserToken");
    getFinishedProcesses(token);
    console.log(finishedProcesses);
    console.log("userProcesses", finishedProcesses);
  }, [getFinishedProcesses]);

  return (
    <>
      <div className=" container ">
        <h2 className="my-3">
          {" "}
          Orders You Rent {finishedProcesses[0]?.renterId?.userName}
        </h2>
        <br />
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
                  <h4 style={{ color: "#B72A67" }} className="card-price">
                    EGP {item.price}
                  </h4>
                  <h6 className="card-text">
                    Start Date: {new Date(item.startDate).toLocaleDateString()}
                  </h6>
                  <h5 className="card-text">
                    End Date: {new Date(item.endDate).toLocaleDateString()}
                  </h5>
                  <h6 className="card-text">Status: {item.status}</h6>
                </div>

                {reviewCreated ? (
                  <button className="btn-secandry w-300 h-50" disabled>
                    Review Already Created
                  </button>
                ) : (
                  <button
                    style={{ hover: { backgroundColor: "#4524B1" } }}
                    className="btn-secandry w-300 h-50"
                    data-bs-toggle="modal"
                    data-bs-target="#rentModal"
                    onClick={() => {
                      setSelectedProcess(item);
                      
                    }}
                  >
                    Create Review
                  </button>
                )}
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
