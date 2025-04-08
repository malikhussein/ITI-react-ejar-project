import React, { useEffect, useState } from "react";
import useProcessStore from "../../Store/process";
import axios from "axios";

const ReviewPage = () => {

const{getProcesses,userProcesses } =useProcessStore()
const [rating, setRating] = useState(0);
const [comment, setComment] = useState("");
const [message, setMessage] = useState("");
const [error, setError] = useState("");


useEffect(() => {
  const token = localStorage.getItem("UserToken");
getProcesses(token)
console.log(userProcesses);
console.log("userProcesses",usersFinishedProcess)

},[getProcesses])

const usersFinishedProcess=userProcesses.filter((item) => item.status === "finished")
console.log("usersFinishedProcess",usersFinishedProcess)
;




  const handleSubmit = async (e) => {
    e.preventDefault();// Prevent default form submission behavior

    try {
      const token = localStorage.getItem("UserToken");

      const res = await axios.post(
        "/api/review",
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

      setMessage("🎉 Your review was submitted!");
      setError("");
      setTimeout(() => navigate(`/products/${productId}`), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong ");
    }
  };

  return (
    
    <div className=" container ">
      <div className="row">
{
  usersFinishedProcess.map((item) => (
    <div className="col-md-3" key={item._id}>
      <div className="card mb-4">
        <img src={item.productId.images[0]} alt={item.productId.name} className="card-img-top" />
        <div className="card-body">
          <h5 className="card-title">{item.productId.name}</h5>
          <p className="card-text">EGP {item.productId.daily}</p>
           <p className="card-text">Status: {item.status}</p>
        </div>
      </div>
    </div>
  ))
}

  </div>


        <h2  className="my-5">
           Leave a Review
        </h2>
      
         { <form onSubmit={handleSubmit} className="space-y-5">
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
             Rating (1 to 5)
            </label>
           
            <br />

            <input
              type="number"
              min={1}
              max={5}
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter your rating"
              required
            />

        </div>
<br />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              💬 Comment
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
<br />
          <button
            type="submit"
            className="btn-primary bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
             Submit Review
          </button>
        </form>

        }
 

      </div>
  );
};

export default ReviewPage;
