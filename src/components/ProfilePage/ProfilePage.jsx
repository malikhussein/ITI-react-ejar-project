import React from 'react';
import ProfileDetails from '../ProfileDetails/ProfileDetails';
import ListingCard from '../ListingCard/ListingCard';
import Listings from '../Listings/Listings';
import EditProdileModal from '../EditProdileModal/EditProdileModal';

export default function ProfilePage() {
  return (
    <>
      <ProfileDetails />
      <Listings />
      <EditProdileModal />
    </>
  );
}
