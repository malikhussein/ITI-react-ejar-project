import React, { useEffect } from "react";
import "./StartRenting.css";

function StartRenting() {
  return (
    <div
      className="sart-renting mt-5 d-flex justify-content-between mb-5 flex-wrap gap-4"
      data-aos="fade-up"
    >
      <div className="text" data-aos="fade-up">
        <h2 className="rent-head">Turn Your Unused Items Into Earnings!</h2>
        <p className="rent-p mt-4 fs-5">
          Why let your items sit unused when you can make money renting them
          out?{" "}
        </p>
        <p className="fs-4 mb-0">Join Ejar today and start earning!</p>
      </div>

      <div className="bt d-flex">
        <button
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#productModal"
          className="rent-btn mt-auto"
        >
          Start Renting Out
        </button>
      </div>
    </div>
  );
}

export default StartRenting;
