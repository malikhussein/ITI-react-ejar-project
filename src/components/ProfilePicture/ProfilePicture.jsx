import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

export default function ProfilePicture() {
  //  store the path from the server (e.g. "uploads/profile-pictures/....")
  const [profilePicture, setProfilePicture] = useState(null);

  const [localPreview, setLocalPreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const fileInputRef = useRef();
  // Our endpoints
  const getUrl = "http://localhost:3000/api/user/profile-picture";
  const uploadUrl = "http://localhost:3000/api/user/upload-profile-picture";

  const token = localStorage.getItem("UserToken") || sessionStorage.getItem("UserToken");

  const defaultPic = "https://static.vecteezy.com/system/resources/previews/026/619/142/non_2x/default-avatar-profile-icon-of-social-media-user-photo-image-vector.jpg";

  // fetch the existing profile picture path
useEffect(() => {
    if (!token) return;
    (async function fetchProfilePic() {
      try {
        const { data } = await axios.get(getUrl, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfilePicture(
          data.profilePicture
            ? `http://localhost:3000/${data.profilePicture}`
            : defaultPic
        );
      } catch (error) {
        console.error("❌ Error fetching profile picture:", error);
        setProfilePicture(defaultPic);
      }
    })();
  }, [token]);
  
  //  2) CLEAN UP any local object URLs to prevent memory leaks
  useEffect(() => {
    return () => {
      if (localPreview) {
        URL.revokeObjectURL(localPreview);
      }
    };
  }, [localPreview]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLocalPreview(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("profilePicture", file);

    try {
      setIsUploading(true);

      const { data } = await axios.put(uploadUrl, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setProfilePicture(`http://localhost:3000/${data.profilePicturePath}`);
      setLocalPreview(null);

    } catch (error) {
      console.error("❌ Upload failed:", error);
    } finally {
      setIsUploading(false);
    }
  };

  // If no token => don't render
  if (!token) return null;

  return (
    <div className="text-center my-3">
      <div style={{ position: "relative", display: "inline-block" }}>
      {(localPreview || profilePicture) ? (
        <img
            src={localPreview || profilePicture}
            onError={(e) => {
            e.target.onerror = null;
            e.target.src = defaultPic;
            }}
            alt="Profile Picture"
            className="rounded-circle border"
            style={{ width: 130, height: 130, objectFit: "cover", cursor: "pointer" }}
            onClick={() => setShowModal(true)}
        />
        ) : (
        <div
            style={{
            width: 130,
            height: 130,
            borderRadius: "50%",
            backgroundColor: "#eee",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            }}
        >
            <span className="spinner-border spinner-border-sm"></span>
        </div>
        )}


        {isUploading && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: 130,
              height: 130,
              background: "rgba(0,0,0,0.5)",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50%",
            }}
          >
            Uploading...
          </div>
        )}
      </div>

      {/* Hidden <input> to pick file */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />

      <p style={{ color: "#555", fontSize: 14, marginTop: 10 }}>
        Click photo to enlarge or change
      </p>

      {/* Modal for enlarge / changing pic */}
      {showModal && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          role="dialog"
          onClick={() => setShowModal(false)}
        >
          <div
            className="modal-dialog modal-dialog-centered"
            role="document"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content">
              <div className="modal-body text-center">
              <img
                src={localPreview || profilePicture}
                onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = defaultPic;
                }}
                alt="Profile Picture"
                style={{ width: "100%", borderRadius: 5 }}
                />

              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => fileInputRef.current.click()}
                >
                  Change Picture
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
