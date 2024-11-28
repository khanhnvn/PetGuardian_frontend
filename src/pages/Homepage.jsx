import {
    Box,
    Container,
    Heading,
    Text,
    VStack,
    Image,
    HStack,
} from '@chakra-ui/react';
import Navbar from './components/NavBar.jsx';
import Footer from "./components/Footer.jsx";

const HomePage = ({ }) => {
    return (
        <Box bg="#FFFCF8" minHeight="100vh" display="flex" flexDirection="column">
            <Navbar />
            <Box flex={1} display="flex" flexDirection="column" alignItems="center"> {/* Center content vertically */}
                <Container maxW="container.lg" p={4} textAlign="center"> {/* Center text */}
                    <VStack spacing={0.5} alignItems="center" mt={1}> {/* Add margin top */}
                        <Text fontSize="36px" fontWeight="semibold" color="#1A4742" fontFamily="Poppins">Too busy?</Text>
                        <Text fontSize="36px" fontWeight="semibold" color="#1A4742" fontFamily="Poppins">Find a home?</Text>
                        <Text fontSize="36px" fontWeight="semibold" color="#1A4742" fontFamily="Poppins">Let us help</Text>
                    </VStack>

                    <HStack spacing={4} mt={10} justifyContent="center"> {/* Center the images */}
                        <Image src="/image1.png" alt="Mèo" h="400px" objectFit="cover" borderRadius="30px" /> {/* Adjusted height and border radius */}
                        <Image src="/image.png" alt="Chó" h="400px" objectFit="cover" borderRadius="30px" /> {/* Adjusted height and border radius */}
                    </HStack>
                </Container>
            </Box>
            <Footer />
        </Box>
    );
};

export default HomePage;