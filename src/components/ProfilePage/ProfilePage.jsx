import React from 'react';
import ProfileDetails from '../ProfileDetails/ProfileDetails';
import Listings from '../Listings/Listings';
import EditProdileModal from '../EditProdileModal/EditProdileModal';
import { useParams } from 'react-router-dom';
import useAuthStore from '../../Store/Auth';
import useProfileStore from '../../Store/profile';
import { useEffect } from 'react';

export default function ProfilePage() {
  const { id: userId } = useParams();
  const { token } = useAuthStore();
  const { profile, loading, errorStatus, fetchProfile } = useProfileStore();

  useEffect(() => {
    fetchProfile(userId, token);
  }, [userId, fetchProfile, token]);

  if (loading) return <div>Loading...</div>;
  if (errorStatus === 500)
    return (
      <div className="text-center mt-5">
        <h2 className="mb-3">Invalid User ID</h2>
        <p>Sorry, we couldn't find the user you were looking for.</p>
        <p>Please enter a valid ID</p>
      </div>
    );
  if (errorStatus === 404)
    return (
      <div className="text-center mt-5">
        <h2 className="mb-3">User not Found</h2>
        <p>Sorry, we couldn't find the user you were looking for.</p>
        <p>Please check the URL</p>
      </div>
    );

  if (profile)
    return (
      <>
        <ProfileDetails profile={profile} token={token} />
        <Listings />
        <EditProdileModal profile={profile} />
      </>
    );
}
