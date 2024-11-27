//App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import HomePage from './pages/Homepage.jsx';
import PetInfo from './pages/PetInfo.jsx';
import Product from './pages/Product.jsx';
import Reminder from "./pages/Reminder.jsx";
import VetInfo from "./pages/VetInfo.jsx";
import PetHealthDetail from "./pages/PetHealthDetail.jsx";
import ForgotPassword from './pages/ForgotPassword.jsx';
import ChangePassword from './pages/ChangePassword.jsx';
import CustomerHomePage from './pages/CustomerHomePage.jsx'; 
import AdminHomePage from './pages/AdminHomepage.jsx'; 
import MyProduct from './pages/MyProduct.jsx';
import MyService from './pages/MyService.jsx';
import Service from './pages/Service.jsx';
import AllProducts from './pages/AllProduct.jsx'; 
import AdminServices from './pages/AdminService.jsx';
import Cart from './pages/Cart.jsx';
import ProductDetail from './pages/components/ProductDetail.jsx'; 
import CheckoutPage from './pages/CheckoutPage.jsx';
import Success from './pages/Success.jsx';
import CancelPay from './pages/Cancel.jsx';

function App() {
    const [cart, setCart] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const appVersion = '1.1.0';

    useEffect(() => {
        const storedVersion = localStorage.getItem('appVersion');
        if (storedVersion !== appVersion) {
          localStorage.clear();
          localStorage.setItem('appVersion', appVersion);
          console.log('Đã xóa localStorage do cập nhật phiên bản ứng dụng.');
        }
      }, []);

    const fetchCart = async () => {
        try {
            const response = await fetch('https://aqueous-island-09657-d7724403d9f8.herokuapp.com/api/cart', {

                credentials: 'include'
            });
            if (!response.ok) {
                console.error('Lỗi khi lấy giỏ hàng:', response.status);
            } else {
                const data = await response.json();
                setCart(data);
            }
        } catch (error) {
            console.error('Lỗi:', error);
        }
    };

    return (
        <BrowserRouter basename="/">
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} /> 
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgotpassword" element={<ForgotPassword />} />
                <Route path="/changepassword" element={<ChangePassword />} />

                <Route path="/homepage" element={<HomePage /> } />
                <Route path="/pet" element={<PetInfo /> } />
                <Route path="/reminder" element={<Reminder /> } />
                <Route path="/vet" element={<VetInfo /> } />
                <Route path="/myservice" element={<MyService /> } />
                <Route path="/service" element={<Service /> } />
                <Route path="/pet/:petId/health" element={<PetHealthDetail /> } />
                <Route path="/customerhomepage" element={<CustomerHomePage /> } />
                <Route path="/adminhomepage" element={<AdminHomePage /> } />
                <Route path="/myproduct" element={<MyProduct /> } /> 
                <Route path="/admin/allproducts" element={<AllProducts /> } />
                <Route path="/admin/allservices" element={<AdminServices /> } />
                <Route path="/cart" element={<Cart fetchCart={fetchCart} cart={cart} setCart={setCart} /> } /> 
                <Route path="/product" element={<Product fetchCart={fetchCart} cart={cart} setCart={setCart} /> } /> 
                <Route path="/product/:productId" element={<ProductDetail fetchCart={fetchCart} setCart={setCart} /> } />
                <Route path="/checkout" element={<CheckoutPage fetchCart={fetchCart} cart={cart} setCart={setCart} /> } /> 
                
                <Route path="/success" element={<Success />} /> 
                <Route path="/cancel" element={<CancelPay />} /> 
            </Routes>
        </BrowserRouter>
    );
}

export default App;