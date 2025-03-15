import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const reviewsData = [
  {
    id: 1,
    name: 'Alex Stanton',
    role: 'CEO at Bukalapak',
    date: '21 July 2022',
    rating: 4,
    image: 'https://randomuser.me/api/portraits/men/10.jpg',
    review:
      'We are very happy with the service from the MORENT App. Morent has a low price and also a large variety of cars with good and comfortable facilities. In addition, the service provided by the officers is also very friendly and very polite.',
  },
  {
    id: 2,
    name: 'Skylar Dias',
    role: 'CEO at Amazon',
    date: '20 July 2022',
    rating: 4,
    image: 'https://randomuser.me/api/portraits/women/12.jpg',
    review:
      'We are greatly helped by the services of the MORENT Application. Morent has low prices and also a wide variety of cars with good and comfortable facilities. In addition, the service provided by the officers is also very friendly and very polite.',
  },
  {
    id: 3,
    name: 'Michael Roberts',
    role: 'CTO at Tesla',
    date: '18 July 2022',
    rating: 5,
    image: 'https://randomuser.me/api/portraits/men/15.jpg',
    review:
      'Amazing experience! The cars are in perfect condition, and the process was smooth. The team is professional and very responsive.',
  },
];

const Reviews = () => {
  const [showAll, setShowAll] = useState(false);

  return (
    <div className="container mt-5">
      <h4 className="mb-3">
        Reviews <span className="badge bg-danger">{reviewsData.length}</span>
      </h4>

      {reviewsData.slice(0, showAll ? reviewsData.length : 2).map((review) => (
        <div key={review.id} className="d-flex align-items-start mb-4">
          <Link to="/profile/123">
            <img
              src={review.image}
              alt={review.name}
              className="rounded-circle me-3"
              width={50}
              height={50}
            />
          </Link>
          <div className="w-100">
            <div className="d-flex justify-content-between">
              <div>
                <Link className="nav-link" to="/profile/123">
                  <h6 className="mb-0">{review.name}</h6>
                </Link>
                <small className="text-muted">{review.role}</small>
              </div>
              <div>
                <span className="text-muted">{review.date}</span>
                <div className="text-warning">
                  {'★'.repeat(review.rating)}
                  {'☆'.repeat(5 - review.rating)}
                </div>
              </div>
            </div>
            <p className="mt-2">{review.review}</p>
          </div>
        </div>
      ))}

      {!showAll && (
        <div className="text-center">
          <button
            className="btn text-primary text-decoration-none fw-bold"
            onClick={() => setShowAll(true)}
          >
            Show All ⬇
          </button>
        </div>
      )}
    </div>
  );
};

export default Reviews;
