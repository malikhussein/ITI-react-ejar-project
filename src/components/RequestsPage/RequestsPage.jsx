import React, { useEffect } from 'react';
import RequestCard from '../RequestCard/RequestCard';
import useProcessStore from '../../Store/process';
import useAuthStore from '../../Store/Auth';

export default function RequestsPage() {
  const { loading, error, userProcesses, getProcesses } = useProcessStore();
  const { token } = useAuthStore();

  useEffect(() => {
    getProcesses(token);
  }, [getProcesses, token]);
  console.log(userProcesses);

  if (error) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center mt-5">
        <h2>Something went wrong</h2>
        <p>{error}</p>
      </div>
    );
  }
  return (
    <div className="container">
      <h2 className="m-5 text-center text-lg-start">Pending Requests</h2>
      <div className="d-flex flex-row flex-wrap justify-content-center gap-4">
        {loading ? (
          <p>Loading...</p>
        ) : userProcesses.length === 0 ? (
          <p>There are no pending requests</p>
        ) : (
          userProcesses.map((process) => (
            <RequestCard key={process._id} process={process} token={token} />
          ))
        )}
      </div>
    </div>
  );
}
