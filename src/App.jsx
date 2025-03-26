import { Route, Router, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import HomePage from './components/HomePage/HomePage';
import ProductPage from './components/Product Page/ProductPage';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import ProfilePage from './components/ProfilePage/ProfilePage';
import ProductDetailsPage from './components/ProductDetailsPage/ProductDetailsPage';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import Wishlist from './Pages/Wishlist/Wishlist';
import ResetPassword from './components/ResetPassword/ResetPassword';

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="product" element={<ProductPage />} />
          <Route path="product/:id" element={<ProductDetailsPage />} />
          <Route path="profile/:id" element={<ProfilePage />} />
          <Route path="wishlist" element={<Wishlist />} />
        </Route>

        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password/:token" element={<ResetPassword />} />
      </Routes>
    </>
  );
}

export default App;
