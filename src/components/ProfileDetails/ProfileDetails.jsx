import React from 'react';
import './ProfileDetails.css';
import useProfileStore from '../../Store/profile';

const ProfileDetails = ({ profile, token}) => {
  
  const { isEditable} = useProfileStore();

  return (
    <div className="container">
      <div className="d-flex flex-column flex-lg-row justify-content-between align-items-center">
        <div className="d-flex flex-column flex-lg-row">
          <img src={profile.personal_pic || 'https://static.vecteezy.com/system/resources/previews/026/619/142/non_2x/default-avatar-profile-icon-of-social-media-user-photo-image-vector.jpg'} alt="User Picture" width={200} />
          <div className="d-flex flex-column justify-content-center align-items-center align-items-lg-start mb-4 mb-lg-0">
            <h2 className="fw-bold">{profile.userName}</h2>
            <h5>{profile.email}</h5>
          </div>
        </div>
        {isEditable(token) && (
          <div className="d-flex flex-column justify-content-center">
            <button
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#profileModal"
              className="btn btn-primary btn-blue rounded-1 fw-bold py-2 px-4"
            >
              Edit Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileDetails;
