import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ReviewModl({ selected }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  console.log(selected);

  const productId = selected?.selectedProcess?.productId?._id;
 console.log(productId);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      const token = localStorage.getItem("UserToken");

      const res = await axios.post(
        "http://localhost:3000/api/review",
        {
          rating,
          comment,
          prodid: productId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(" Your review was submitted!");
      
      console.log(message);
      setError("");
      // setTimeout(() => navigate(`/product/${productId}`), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong ");
      console.log(error);
    }
  };

  return (
    <>
      <div
        className="modal fade"
        id="rentModal"
        tabIndex={-1}
        aria-labelledby="rentModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="rentModalLabel">
                Rent Product
              </h1>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="startDate" className="form-label">
                    your Rating (1 to 5)
                  </label>
<br />
                  <input
                    type="number"
                    min={1}
                    max={5}
                    id="rating"
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="endDate" className="form-label">
                    your comment                 
                    </label>
                  <textarea
                    rows={4}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="form-control w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    placeholder="Write your review here..."
                    required
                  ></textarea>
                </div>

                <div className="modal-footer">
                  <button type="submit" className="btn btn-primary">
                    sbmit review
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
