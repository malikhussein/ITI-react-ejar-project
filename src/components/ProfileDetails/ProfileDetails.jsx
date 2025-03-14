import React from 'react';
import users from '../../assets/users.json';
import './ProfileDetails.css';

export default function ProfileDetails() {
  const user = users[0];
  console.log(user);
  return (
    <div className="container">
      <div className="d-flex flex-column flex-lg-row justify-content-between align-items-center">
        <div className="d-flex flex-column flex-lg-row">
          <img src={user.personal_pic} alt="User Picture" width={200} />
          <div className="d-flex flex-column justify-content-center align-items-center align-items-lg-start mb-4 mb-lg-0">
            <h2 className="fw-bold">{user.name}</h2>
            <h5>{user.email}</h5>
          </div>
        </div>
        <div className="d-flex flex-column justify-content-center">
          <button
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            className="btn btn-primary btn-blue rounded-1 fw-bold py-2 px-4"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}
