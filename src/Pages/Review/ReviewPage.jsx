import React, { useEffect, useState } from 'react';
import useProcessStore from '../../Store/process';
import ReviewModl from './ReviewModel';
import './ReviewPage.css';
import axios from 'axios';
import useAuthStore from '../../Store/Auth';
import { MoonLoader } from 'react-spinners';
import { toast } from 'react-toastify';

const ReviewPage = () => {
  const { getFinishedProcesses, finishedProcesses } = useProcessStore();
  const [selectedProcess, setSelectedProcess] = useState(null);
  const [reviewedProducts, setReviewedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useAuthStore();

  const fetchAllUserReviews = async (userId) => {
    try {
      const res = await axios.get(`http://localhost:3000/api/review/${userId}`);
      console.log('Response from API:', res); // طباعة الـ response كاملاً
      const productIds = res.data.foundedReview.map(
        (review) => review.prodid?._id
      );
      setReviewedProducts(productIds);
      console.log(reviewedProducts);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error fetching reviews');
      console.error('Error fetching reviews:', err.message);
    }
  };

  useEffect(() => {
    document.title = 'History | EJAR';
  }, []);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      await getFinishedProcesses(token);
      setIsLoading(false);
    };
    load();
  }, []);

  useEffect(() => {
    getFinishedProcesses(token);
    console.log('userProcesses', finishedProcesses);
  }, []);

  useEffect(() => {
    if (finishedProcesses.length > 0) {
      const userId = finishedProcesses[0]?.renterId?._id;
      if (userId) {
        fetchAllUserReviews(userId);
      }
    }
  }, [finishedProcesses]);

  return (
    <>
      <div className="container">
        <h2 className="my-3"> Products You Rented</h2>
        <h5 className="text-muted">
          Help us improve our website and give an honest review for your recent
          rentals
        </h5>
        <br />
        <div className="row">
          {isLoading ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '60vh',
                width: '100%',
              }}
            >
              <MoonLoader color="#b72a67" size={100} />
              <p style={{ marginTop: 20, fontSize: '18px', color: '#555' }}>
                Loading your rented orders...
              </p>
            </div>
          ) : finishedProcesses.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: '50px 20px',
                color: '#777',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '60vh',
              }}
            >
              <i
                className="bi bi-clipboard-x	"
                style={{
                  fontSize: '60px',
                  marginBottom: '20px',
                  color: '#b72a67',
                }}
              ></i>
              <h2>No rented orders found</h2>
              <p>Looks like you haven't rented anything yet.</p>
            </div>
          ) : (
            finishedProcesses.map((item) => (
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
                    <h4 style={{ color: '#B72A67' }} className="card-price">
                      EGP {item.price}
                    </h4>
                    <h6 className="card-text">
                      Start Date:{' '}
                      {new Date(item.startDate).toLocaleDateString()}
                    </h6>
                    <h5 className="card-text">
                      End Date: {new Date(item.endDate).toLocaleDateString()}
                    </h5>
                    <h6 className="card-text text-capitalize">
                      Status: {item.status}
                    </h6>
                  </div>

                  {reviewedProducts.includes(item.productId._id) ? (
                    <button className="btn-secandry w-300 h-50" disabled>
                      Review Already Created
                    </button>
                  ) : (
                    <button
                      className="btn-secandry w-300 h-50"
                      data-bs-toggle="modal"
                      data-bs-target="#rentModal"
                      onClick={() => setSelectedProcess(item)}
                    >
                      Create Review
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <ReviewModl selected={{ selectedProcess }} />
    </>
  );
};

export default ReviewPage;
