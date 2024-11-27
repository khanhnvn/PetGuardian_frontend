//Homepage.jsx
import {
    Box,
    Container,
    Heading,
    Text,
    VStack, 
} from '@chakra-ui/react';
import { Navigate } from 'react-router-dom';
import Navbar from './components/NavBar.jsx'; // Import Navbar component
import Footer from "./components/Footer.jsx";

const HomePage = ({ isLoggedIn }) => {
    console.log("checkconsolelog");
    console.log("isLoggedIn:", isLoggedIn);
    if (!isLoggedIn) {
        return <Navigate to="/login" />; 
    }
    return (
        <Box bg="#FFFCF8" minHeight="100vh"
             display="flex" flexDirection="column"
        > {/* Đặt màu nền cho trang */}

            {/* Body */}
            <Box flex={1}>
                <Container maxW="container.lg" p={4} flex={1}>
                    <VStack spacing={4} alignItems="flex-start">
                        <Heading as="h1" size="xl">
                            Welcome to Pet Guardian!
                        </Heading>
                        {/* Thêm nội dung cho body ở đây */}
                        <Text>Đây là trang chủ của ứng dụng.</Text>
                    </VStack>
                </Container>
            </Box>

        </Box>
    );
};

export default HomePage;