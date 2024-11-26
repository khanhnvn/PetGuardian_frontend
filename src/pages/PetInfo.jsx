//PetInfo.jsx
import {
    Box, Container
} from '@chakra-ui/react';
import AddPet from "./components/AddPet.jsx";
import ShowPet from "./components/ShowPet.jsx";
import {useState} from "react";

const PetInfo = ({ isLoggedIn }) => { // Nhận props isLoggedIn từ App.jsx
    if (!isLoggedIn) {
        return <Navigate to="/login" />; // Chuyển hướng nếu chưa đăng nhập
    }
    
    const [pets, setPets] = useState([]);
    return (
        <Box bg="#FFFCF8" minHeight="100vh"
             display="flex" flexDirection="column"
        > {/* Đặt màu nền cho trang */}

            {/* Body */}
            <Box flex={1}>
                <Container maxW="container.lg" p={4}>
                    <AddPet /> {/* Component thêm thú cưng */}
                    <ShowPet pets={pets} setPets={setPets} /> {/* Component hiển thị danh sách thú cưng */}
                </Container>
            </Box>


        </Box>
    );
};

export default PetInfo;