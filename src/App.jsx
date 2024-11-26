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
import Navbar from './pages/components/NavBar.jsx'; // Import Navbar component
import Footer from "./pages/components/Footer.jsx";

function App() {
    const [cart, setCart] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const checkLogin = async () => {
            const token = localStorage.getItem('token'); 
            if (token) {
                try {
                    const response = await fetch('https://aqueous-island-09657-d7724403d9f8.herokuapp.com/api/check_login', { 
                        headers: {
                            'Authorization': 'Bearer ' + token
                        },
                        credentials: 'include'
                    });
                    if (response.ok) {
                        setIsLoggedIn(true);
                    } else {
                        localStorage.removeItem('token'); 
                        setIsLoggedIn(false);
                    }
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
            const token = localStorage.getItem('token'); 
            const response = await fetch('https://aqueous-island-09657-d7724403d9f8.herokuapp.com/api/cart', {
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                credentials: 'include'
            });
            if (!response.ok) {
                throw new Error('Lỗi khi lấy giỏ hàng');
            }
            const data = await response.json();
            setCart(data);
        } catch (error) {
            console.error('Lỗi:', error);
        }
    };

    return (
        <BrowserRouter basename="/">
            {isLoggedIn && <Navbar />} {/* Sử dụng Navbar component */}
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} /> 
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/homepage" element={isLoggedIn ? <HomePage /> : <Navigate to="/login" />} />
                <Route path="/pet" element={isLoggedIn ? <PetInfo /> : <Navigate to="/login" />} />
                <Route path="/reminder" element={isLoggedIn ? <Reminder /> : <Navigate to="/login" />} />
                <Route path="/vet" element={isLoggedIn ? <VetInfo /> : <Navigate to="/login" />} />
                <Route path="/myservice" element={isLoggedIn ? <MyService /> : <Navigate to="/login" />} />
                <Route path="/service" element={isLoggedIn ? <Service /> : <Navigate to="/login" />} />
                <Route path="/forgotpassword" element={<ForgotPassword />} />
                <Route path="/changepassword" element={<ChangePassword />} />
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
            {isLoggedIn && <Footer />}
        </BrowserRouter>
    );
}

export default App;