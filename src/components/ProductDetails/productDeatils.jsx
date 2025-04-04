import React, { useState, useEffect } from "react";
import ReactImageMagnify from "react-image-magnify";
import { useProductStore } from "../../Store/Deatils";
import { jwtDecode } from "jwt-decode";
import { Link, useParams } from "react-router-dom";
import useAuthStore from "../../Store/Auth";
import "./productDeatils.css";

const ProductDetails = () => {
  const [showRejectInput, setShowRejectInput] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const { product, fetchProduct, updateProduct, getAllProd } =
    useProductStore();
  const { token } = useAuthStore();
  const [mainImage, setMainImage] = useState(null);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);

  const [fields, setFields] = useState({
    name: "",
    brand: "",
    category: "",
    owner: "",
    description: "",
    daily: "",
    comfirmed: "",
    confirmMessage: "",
    status: "",
    images: [],
  });
  const [newImage, setNewImage] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    fetchProduct(id);
  }, [id, fetchProduct]);

  let decoded;
  if (token) {
    decoded = jwtDecode(token);
  }

  useEffect(() => {
    if (product?.data) {
      setFields({
        name: product.data.name || "",
        description: product.data.description || "",
        daily: Number(product.data.daily) || 0,
        category: product.data.category.name || "",
        confirmed: Boolean(product.data.confirmed),
        confirmMessage: product.data.confirmMessage || "",
        status: product.data.status || "",
        owner: product.data.renterId.userName || "",
        ownerId: product.data.renterId._id || "",
        images: product.data.images || [],
      });
    }
  }, [product]);

  useEffect(() => {
    if (product?.data?.images?.length > 0) {
      setMainImage(product.data.images[0]);
    }
  }, [product?.data?.images]);

  useEffect(() => {
    getAllProd(product?.data?.category._id);
  }, [getAllProd, product]);

  const toggleEdit = async () => {
    if (isEditing) {
      const updatedProduct = { ...product.data, ...fields };
      await updateProduct(updatedProduct);

      setFields(updatedProduct);
    }
    setIsEditing((prev) => !prev);
  };

  const handleChange = (e, field) => {
    setFields((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleImageClick = (imageUrl) => {
    setMainImage(imageUrl);
  };

  const handleDeleteImage = (index) => {
    setFields((prev) => {
      const updatedImages = prev.images.filter((_, i) => i !== index);

      const removedImage = prev.images[index];

      return {
        ...prev,
        images: updatedImages,
        removeImages: [...(prev.removeImages || []), removedImage],
      };
    });
  };

  const handleAddImage = (e) => {
    const file = e.target.files[0];
    if (file) setNewImage(file);
  };

  const handleUploadImage = async () => {
    if (!newImage) return;

    const formData = new FormData();
    formData.append("images", newImage);

    try {
      const response = await fetch(`http://localhost:3000/api/product/${id}`, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      setFields((prev) => ({
        ...prev,
        images: [...new Set([...prev.images, ...data.product.images])], // 🔹 منع التكرار
      }));

      setNewImage(null);
    } catch (error) {
      console.error("Image upload failed:", error);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const confirmProduct = async () => {
    try {
      const updatedData = {
        ...product.data,
        confirmed: true,
        confirmMessage: "Product confirmed by admin",
      };

      await updateProduct(updatedData);
    } catch (error) {
      console.error("Error confirming product:", error);
    }
  };

  const rejectProduct = async () => {
    if (!rejectReason.trim()) {
      return;
    }

    console.log(1);

    try {
      const updatedData = {
        ...product.data,
        confirmed: false,
        confirmMessage: rejectReason,
      };

      await updateProduct(updatedData);
      alert("Product rejected successfully!");
    } catch (error) {
      console.error("Error rejecting product:", error);
    }
  };

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="container my-5">
        <div className="card p-4 shadow-lg">
          <div className="container mt-4">
            {!product.data.confirmed && decoded.role === "admin" && (
              <>
                {product.data.confirmMessage ? (
                  <div className="alert alert-info d-flex align-items-center justify-content-between p-2">
                    <div className="d-flex align-items-center">
                      <i className="fas fa-info-circle me-2"></i>
                      <span>Waiting for user modifications</span>
                    </div>
                  </div>
                ) : (
                  <div className="alert alert-warning d-flex align-items-center justify-content-between p-2">
                    <div className="d-flex align-items-center">
                      <i className="fas fa-exclamation-triangle me-2"></i>
                      <span>Awaiting Admin Review</span>
                    </div>

                    <div className="d-flex gap-2">
                      <button onClick={confirmProduct}>
                        <i className="fa-solid fa-check"></i>
                      </button>

                      <button
                        className=""
                        onClick={() => setShowRejectInput(true)}
                      >
                        ❌
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}

            {showRejectInput && (
              <div className="mt-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter rejection reason..."
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                />
                <button className="btn btn-danger mt-2" onClick={rejectProduct}>
                  Submit Rejection
                </button>
              </div>
            )}
            {!product.data.confirmed &&
              decoded.id == product.data.renterId._id && (
                <div className="alert alert-warning ">
                  <div className="d-flex align-items-center">
                    <i className="fas fa-exclamation-triangle me-2"></i>
                    <h6>admin check</h6>
                  </div>
                  <span className="d-block">
                    {product.data.confirmMessage} dd
                  </span>
                </div>
              )}
            {!product.data.confirmed &&
              decoded.id !== product.data.renterId._id &&
              decoded.role !== "admin" && (
                <div className="alert alert-warning d-flex align-items-center">
                  <i className="fas fa-exclamation-triangle me-2"></i>
                  <span>
                    This product is currently unavailable and is being reviewed.
                  </span>
                </div>
              )}
          </div>

          <div className="row">
            <div className="col-md-6 text-center">
              {isSmallScreen ? (
                <img
                  src={mainImage}
                  alt="Product Image"
                  style={{
                    width: "400px",
                    height: "400px",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <ReactImageMagnify
                  {...{
                    smallImage: {
                      alt: "Product Image",
                      isFluidWidth: false,
                      src: mainImage,
                      width: 400,
                      height: 400,
                    },
                    largeImage: {
                      src: mainImage,
                      width: 1200,
                      height: 1200,
                    },
                    enlargedImageContainerDimensions: {
                      width: "120%",
                      height: "120%",
                    },
                  }}
                />
              )}

              <div className="d-flex justify-content-center mt-3 flex-wrap">
                {fields.images.map((img, index) => (
                  <div key={index} className="position-relative m-2">
                    <img
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      className="rounded border"
                      style={{
                        width: "80px",
                        height: "80px",
                        objectFit: "cover",
                        cursor: "pointer",
                        border:
                          mainImage === img
                            ? "2px solid blue"
                            : "2px solid transparent",
                      }}
                      onClick={() => handleImageClick(img)}
                    />
                    {isEditing && fields.images.length > 1 && (
                      <button
                        className="position-absolute top-0 end-0 btn btn-sm btn-danger p-0 rounded-circle"
                        style={{
                          width: "20px",
                          height: "20px",
                          fontSize: "12px",
                        }}
                        onClick={() => handleDeleteImage(index)}
                      >
                        ❌
                      </button>
                    )}
                  </div>
                ))}

                {isEditing && fields.images.length < 4 && (
                  <label
                    className="m-2 bg-secondary d-flex align-items-center justify-content-center rounded"
                    style={{
                      width: "80px",
                      height: "80px",
                      cursor: "pointer",
                      opacity: 0.7,
                    }}
                  >
                    ➕
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={handleAddImage}
                    />
                  </label>
                )}
              </div>

              {isEditing && newImage && (
                <div className="d-flex justify-content-center mt-3">
                  <button
                    className="btn btn-success"
                    onClick={handleUploadImage}
                  >
                    Upload Image
                  </button>
                </div>
              )}
            </div>

            <div className="col-md-6">
              {isEditing ? (
                <input
                  type="text"
                  value={fields.name}
                  onChange={(e) => handleChange(e, "name")}
                  className="form-control mb-3"
                />
              ) : (
                <h3 className="mb-3 main-text fw-bold">{fields.name}</h3>
              )}

              <div className="d-flex align-items-center mb-2">
                <i className="fa-solid fa-tags me-2 text-secondary"></i>
                <span className="fw-semibold">Category:</span>
                <span className="ms-1 text-muted">
                  {fields.category || "N/A"}
                </span>
              </div>

              <div className="d-flex align-items-center mb-2">
                <i className="fa-solid fa-user me-2 text-secondary"></i>
                <span className="fw-semibold">Owner:</span>
                <Link
                  to={`/profile/${fields.ownerId}`}
                  className="ms-1 text-decoration-none text-primary fw-semibold"
                >
                  {fields.owner}
                </Link>
              </div>

              <div className="d-flex align-items-center mb-3">
                <i className="fa-solid fa-circle-check me-2 text-success"></i>
                <span className="fw-semibold">Status:</span>
                {isEditing ? (
                  <input
                    type="text"
                    value={fields.status}
                    onChange={(e) => handleChange(e, "status")}
                    className="form-control ms-2"
                    style={{ maxWidth: "150px" }}
                  />
                ) : (
                  <span className="ms-1 text-muted">{fields.status}</span>
                )}
              </div>

              {product.data.review.length === 0 ? (
                <span className="badge bg-success">NEW</span>
              ) : (
                <p className="text-muted">
                  {Array.from({ length: 5 }, (_, i) => (
                    <i
                      key={i}
                      className={`fa-star ${
                        i + 1 <= Number(product.data.averageRating)
                          ? "fas"
                          : "far"
                      }`}
                      style={{
                        color:
                          i + 1 <= Number(product.data.averageRating)
                            ? "gold"
                            : "lightgray",
                      }}
                    ></i>
                  ))}
                  ({product.data.review.length})
                </p>
              )}
              {isEditing ? (
                <textarea
                  value={fields.description}
                  onChange={(e) => handleChange(e, "description")}
                  className="form-control mb-2"
                />
              ) : (
                <p>{fields.description}</p>
              )}
              <div className="d-flex flex-wrap mb-3"></div>
              {isEditing ? (
                <input
                  type="text"
                  value={fields.daily}
                  onChange={(e) => handleChange(e, "daily")}
                  className="form-control mb-2"
                />
              ) : (
                <h4 className="text-danger">{fields.daily} EGP/Day </h4>
              )}
              <div className="mt-3">
                {decoded.id == product.data.renterId._id ? (
                  <button
                    className="btn main-back w-25 mx-1"
                    onClick={toggleEdit}
                  >
                    {isEditing ? "Save" : "Edit"}
                  </button>
                ) : (
                  ""
                )}
                {console.log(decoded.role)}
                {product.data.confirmed &&
                decoded.id !== product.data.renterId._id ? (
                  <button className="btn btn-primary w-25">
                    <i className="fa-solid fa-comment"></i> Chat
                  </button>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
