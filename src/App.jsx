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

    useEffect(() => {
        const checkLogin = async () => {
            const user = JSON.parse(localStorage.getItem('user')); // Lấy user từ localStorage
            if (user) { // Kiểm tra xem user có tồn tại không
                try {
                    setIsLoggedIn(true); // Nếu có, cập nhật isLoggedIn thành true
                } catch (error) {
                    console.error('Lỗi khi kiểm tra đăng nhập:', error);
                    setIsLoggedIn(false);
                }
            }
        };
        checkLogin();
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

                <Route path="/homepage" element={isLoggedIn ? <HomePage /> : <Navigate to="/login" />} />
                <Route path="/pet" element={isLoggedIn ? <PetInfo /> : <Navigate to="/login" />} />
                <Route path="/reminder" element={isLoggedIn ? <Reminder /> : <Navigate to="/login" />} />
                <Route path="/vet" element={isLoggedIn ? <VetInfo /> : <Navigate to="/login" />} />
                <Route path="/myservice" element={isLoggedIn ? <MyService /> : <Navigate to="/login" />} />
                <Route path="/service" element={isLoggedIn ? <Service /> : <Navigate to="/login" />} />
                <Route path="/pet/:petId/health" element={isLoggedIn ? <PetHealthDetail /> : <Navigate to="/login" />} />
                <Route path="/customerhomepage" element={isLoggedIn ? <CustomerHomePage /> : <Navigate to="/login" />} />
                <Route path="/adminhomepage" element={isLoggedIn ? <AdminHomePage /> : <Navigate to="/login" />} />
                <Route path="/myproduct" element={isLoggedIn ? <MyProduct /> : <Navigate to="/login" />} /> 
                <Route path="/admin/allproducts" element={isLoggedIn ? <AllProducts /> : <Navigate to="/login" />} />
                <Route path="/admin/allservices" element={isLoggedIn ? <AdminServices /> : <Navigate to="/login" />} />
                <Route path="/cart" element={isLoggedIn ? <Cart fetchCart={fetchCart} cart={cart} setCart={setCart} /> : <Navigate to="/login" />} /> 
                <Route path="/product" element={isLoggedIn ? <Product fetchCart={fetchCart} cart={cart} setCart={setCart} /> : <Navigate to="/login" />} /> 
                <Route path="/product/:productId" element={isLoggedIn ? <ProductDetail fetchCart={fetchCart} setCart={setCart} /> : <Navigate to="/login" />} />
                <Route path="/checkout" element={isLoggedIn ? <CheckoutPage fetchCart={fetchCart} cart={cart} setCart={setCart} /> : <Navigate to="/login" />} /> 
                
                <Route path="/success" element={<Success />} /> 
                <Route path="/cancel" element={<CancelPay />} /> 
            </Routes>
        </BrowserRouter>
    );
}

export default App;