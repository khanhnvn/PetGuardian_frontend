//NavBar.jsx
import { useState, useEffect } from 'react';
import {
    Flex,
    Image,
    Spacer,
    Tabs,
    TabList,
    Tab,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem, IconButton,
} from '@chakra-ui/react';
import { NavLink, useNavigate } from 'react-router-dom';

const Navbar = ({}) => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [roleId, setRoleId] = useState(null);

    useEffect(() => {
        const account_id = localStorage.getItem('account_id'); // Get account_id from localStorage
        const role_id = localStorage.getItem('role_id'); // Get role_id from localStorage

        if (account_id && role_id) {
            setIsLoggedIn(true);
            setRoleId(parseInt(role_id, 10)); // Parse role_id to an integer
        }
    }, []);

    const handleLogout = async () => {
        localStorage.removeItem('account_id'); // Remove account_id from localStorage
        localStorage.removeItem('role_id'); // Remove role_id from localStorage
        navigate('/login');
    };

    return (
        <Flex bg="white" p={4} alignItems="center" justifyContent="space-between">
            <NavLink to="/homepage"> {/* Thay đổi đường dẫn mặc định */}
                <Image src="/logo.png" alt="Logo" boxSize="50px" />
            </NavLink>
            <Spacer />

            {isLoggedIn ? (
                <>
                    {roleId === 1 && ( // User
                        <Tabs variant="unstyled">
                            <TabList>
                                <NavLink to="/homepage">
                                    <Tab _selected={{ color: 'blue.500' }}>Home</Tab>
                                </NavLink>
                                <NavLink to="/pet">
                                    <Tab _selected={{ color: 'blue.500' }}>Pet</Tab>
                                </NavLink>
                                <NavLink to="/vet">
                                    <Tab _selected={{ color: 'blue.500' }}>Veterinarian Contact</Tab>
                                </NavLink>
                                <NavLink to="/product">
                                    <Tab _selected={{ color: 'blue.500' }}>Product</Tab>
                                </NavLink>
                                {/* <NavLink to="/service">
                                    <Tab _selected={{ color: 'blue.500' }}>Service</Tab>
                                </NavLink> */}
                                {/*<NavLink to="/reminder">
                                    <Tab _selected={{ color: 'blue.500' }}>Reminder</Tab>
                                </NavLink>*/}
                                <NavLink to="/cart">
                                    <Tab _selected={{ color: 'blue.500' }}>Cart</Tab>
                                </NavLink>
                            </TabList>
                        </Tabs>
                    )}
                    {roleId === 3 && ( // Customer
                        <Tabs variant="unstyled">
                            <TabList>
                                <NavLink to="/customerhomepage">
                                    <Tab _selected={{ color: 'blue.500' }}>Dashboard</Tab>
                                </NavLink>
                                {/* Thêm các tab khác cho customer */}
                                <NavLink to="/product">
                                    <Tab _selected={{ color: 'blue.500' }}>Product</Tab>
                                </NavLink>
                                {/* <NavLink to="/service">
                                    <Tab _selected={{ color: 'blue.500' }}>Service</Tab>
                                </NavLink> */}
                                <NavLink to="/myproduct">
                                    <Tab _selected={{ color: 'blue.500' }}>My Product</Tab>
                                </NavLink>
                                {/* <NavLink to="/myservice">
                                    <Tab _selected={{ color: 'blue.500' }}>My Service</Tab>
                                </NavLink> */}
                            </TabList>
                        </Tabs>
                    )}
                    {roleId === 2 && ( // Admin
                        <Tabs variant="unstyled">
                            <TabList>
                                <NavLink to="/adminhomepage">
                                    <Tab _selected={{ color: 'blue.500' }}>Dashboard</Tab>
                                </NavLink>
                                {/* Thêm các tab khác cho admin */}
                                <NavLink to="/admin/users">
                                    <Tab _selected={{ color: 'blue.500' }}>Users</Tab>
                                </NavLink>
                                <NavLink to="/admin/customers">
                                    <Tab _selected={{ color: 'blue.500' }}>Shops</Tab>
                                </NavLink>
                                <NavLink to="/admin/allproducts">
                                    <Tab _selected={{ color: 'blue.500' }}>All Products</Tab>
                                </NavLink>
                                {/* <NavLink to="/admin/allservices">
                                    <Tab _selected={{ color: 'blue.500' }}>All Services</Tab>
                                </NavLink> */}
                            </TabList>
                        </Tabs>
                    )}
                    <Spacer />
                    <Menu>
                        <MenuButton as={Button}>Setting</MenuButton>
                        <MenuList>
                            <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
                        </MenuList>
                    </Menu>
                </>
            ) : (
                <Tabs variant="unstyled">
                    <TabList>
                        <NavLink to="/login">
                            <Tab _selected={{ color: 'blue.500' }}>Đăng nhập</Tab>
                        </NavLink>
                        <NavLink to="/register">
                            <Tab _selected={{ color: 'blue.500' }}>Đăng ký</Tab>
                        </NavLink>
                    </TabList>
                </Tabs>
            )}
        </Flex>
    );
};

export default Navbar;