import React, { useEffect } from 'react';
import RequestCard from '../RequestCard/RequestCard';
import useProcessStore from '../../Store/process';
import useAuthStore from '../../Store/Auth';
import { MoonLoader } from 'react-spinners';

export default function RequestsPage() {
  const { loading, error, userProcesses, getProcesses } = useProcessStore();
  const { token } = useAuthStore();

  useEffect(() => {
    getProcesses(token);
  }, [getProcesses, token]);
  console.log(userProcesses);

  if (error) {
    return (
      <div
        style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '60vh', color: '#777', textAlign: 'center', }}>
        <i
        className="bi bi-exclamation-triangle-fill"
        style={{ fontSize: '60px', color: '#b72a67', marginBottom: '20px' }}
        ></i>
        <h2>Oops! Something went wrong</h2>
        <p>{error}</p>
      </div>
    );
  }
  return (
    <div className="container">
      <h2 className="m-5 text-center text-lg-start">Pending Requests</h2>
      <div className="d-flex flex-row flex-wrap justify-content-center gap-4">
      {loading ? (
          <div
            style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '60vh', width: '100%',}}  >
            <MoonLoader color="#b72a67" size={80} />
            <p style={{ marginTop: 20, fontSize: '16px', color: '#555' }}>
              Loading requests, please wait...
            </p>
          </div>
        ) : userProcesses.length === 0 ? (
          <div
            style={{ textAlign: 'center', padding: '50px 20px', color: '#777', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '60vh', }} >
            <i
              className="bi bi-inbox-fill"
              style={{ fontSize: '60px', marginBottom: '20px', color: '#b72a67' }}
            ></i>
            <h2>No pending requests</h2>
            <p>You currently don't have any active requests.</p>
          </div>
        ) : (
          userProcesses.map((process) => (
            <RequestCard key={process._id} process={process} token={token} />
          ))
        )}
      </div>
    </div>
  );
}
