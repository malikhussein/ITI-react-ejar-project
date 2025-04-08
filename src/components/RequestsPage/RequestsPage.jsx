import React, { useEffect } from 'react';
import RequestCard from '../RequestCard/RequestCard';
import useProcessStore from '../../Store/process';
import useAuthStore from '../../Store/Auth';

export default function RequestsPage() {
  const { userProcesses, getProcesses } = useProcessStore();
  const { token } = useAuthStore();

  useEffect(() => {
    getProcesses(token);
  }, [getProcesses, token]);
  console.log(userProcesses);

  return (
    <div className="container">
      <h2 className="m-5 text-center text-lg-start">Pending Requests</h2>
      <div className="d-flex flex-row flex-wrap justify-content-center gap-4">
        {userProcesses.map((process) => (
          <RequestCard key={process._id} process={process} token={token} />
        ))}
      </div>
    </div>
  );
}
