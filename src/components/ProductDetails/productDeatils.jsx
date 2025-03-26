import React, { useState, useEffect } from 'react';
import ReactImageMagnify from 'react-image-magnify';
import { useProductStore } from '../../Store/Deatils';
import { jwtDecode } from 'jwt-decode';
import { Link, useParams } from 'react-router-dom';
import useAuthStore from '../../Store/Auth';

const ProductDetails = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { product, fetchProduct, updateProduct, getAllProd } =
    useProductStore();
  const { token } = useAuthStore();
  const [mainImage, setMainImage] = useState(null);
  const [fields, setFields] = useState({
    name: '',
    brand: '',
    category: '',
    owner: '',
    description: '',
    daily: '',
    comfirmed: ' true',
    status: '',
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
        name: product.data.name || '',
        description: product.data.description || '',
        daily: Number(product.data.daily) || 0,
        category: product.data.category.name || '',
        confirmed: Boolean(product.data.confirmed) || false,
        status: product.data.status || '',
        owner: product.data.renterId.userName || '',
        ownerId: product.data.renterId._id || '',
        images: product.data.images || [],
      });
    }
  }, [product]);

  useEffect(() => {
    if (product?.data?.images?.length > 0) {
      setMainImage(product.data.images[0]); // تحديد أول صورة كـ mainImage
    }
  }, [product?.data?.images]);

  useEffect(() => {
    getAllProd(product?.data?.category);
  }, [getAllProd, product]);

  const toggleEdit = async () => {
    if (isEditing) {
      const updatedProduct = { ...product.data, ...fields };
      await updateProduct(updatedProduct);
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
    formData.append('images', newImage);

    try {
      const response = await fetch(`http://localhost:3000/api/product/${id}`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();

      setFields((prev) => ({
        ...prev,
        images: [...new Set([...prev.images, ...data.product.images])], // 🔹 منع التكرار
      }));

      setNewImage(null);
    } catch (error) {
      console.error('Image upload failed:', error);
    }
  };

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="container my-5">
        <div className="card p-4 shadow-lg">
          <div className="row">
            <div className="col-md-6 text-center">
              <ReactImageMagnify
                {...{
                  smallImage: {
                    alt: 'Product Image',
                    isFluidWidth: true,
                    src: mainImage,
                  },
                  largeImage: {
                    src: mainImage,
                    width: 1200,
                    height: 1200,
                  },
                  enlargedImageContainerDimensions: {
                    width: '120%',
                    height: '120%',
                  },
                }}
              />
              <div className="d-flex justify-content-center mt-3 flex-wrap">
                {fields.images.map((img, index) => (
                  <div key={index} className="position-relative m-2">
                    <img
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      className="rounded border"
                      style={{
                        width: '80px',
                        height: '80px',
                        objectFit: 'cover',
                        cursor: 'pointer',
                        border:
                          mainImage === img
                            ? '2px solid blue'
                            : '2px solid transparent',
                      }}
                      onClick={() => handleImageClick(img)}
                    />
                    {isEditing && (
                      <button
                        className="position-absolute top-0 end-0 btn btn-sm btn-danger p-0 rounded-circle"
                        style={{
                          width: '20px',
                          height: '20px',
                          fontSize: '12px',
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
                      width: '80px',
                      height: '80px',
                      cursor: 'pointer',
                      opacity: 0.7,
                    }}
                  >
                    ➕
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: 'none' }}
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
                  onChange={(e) => handleChange(e, 'name')}
                  className="form-control mb-2"
                />
              ) : (
                <h3>{fields.name}</h3>
              )}

              {/* <div className="d-flex justify-content-between">
<h3>Category : {fields.category} </h3>

 
<h3>Owner: {fields.owner} </h3>
</div> */}
              <h3>Category : {fields.category} </h3>

              <h3>
                Owner:
                <Link to={`/profile/${fields.ownerId}`}>{fields.owner}</Link>
              </h3>

              {isEditing ? (
                <input
                  type="text"
                  value={fields.status}
                  onChange={(e) => handleChange(e, 'status')}
                  classstatus="form-control mb-2"
                />
              ) : (
                <h3> Status: {fields.status}</h3>
              )}

              {product.data.reviews === 0 ? (
                <p>NEW</p>
              ) : (
                <p className="text-muted">
                  {Array.from({ length: 5 }, (_, i) => (
                    <i
                      key={i}
                      className={`fa-star ${
                        i + 1 <= Number(product.data.rating) ? 'fas' : 'far'
                      }`}
                      style={{
                        color:
                          i + 1 <= Number(product.data.rating)
                            ? 'gold'
                            : 'lightgray',
                      }}
                    ></i>
                  ))}
                  ({product.data.reviews} )
                </p>
              )}
              {isEditing ? (
                <textarea
                  value={fields.description}
                  onChange={(e) => handleChange(e, 'description')}
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
                  onChange={(e) => handleChange(e, 'daily')}
                  className="form-control mb-2"
                />
              ) : (
                <h4 className="text-danger">{fields.daily} EGP/Day </h4>
              )}
              <div className="mt-3">
                {decoded.id == product.data.renterId._id ? (
                  <button
                    className="btn btn-primary w-25 mx-1"
                    onClick={toggleEdit}
                  >
                    {isEditing ? 'Save' : 'Edit'}
                  </button>
                ) : (
                  ''
                )}
                <button className="btn btn-primary w-25">
                  <i className="fa-solid fa-comment"></i> Chat
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
