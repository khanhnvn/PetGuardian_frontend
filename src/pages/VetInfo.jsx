//VetInfo.jsx
import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Spinner,
  useToast,
} from '@chakra-ui/react';
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import AddVeterinarianContact from "./components/AddVeterinarianContact"; // Component để thêm bác sĩ thú y
import ShowVeterinarianContact from "./components/ShowVeterinarianContact"; // Component để hiển thị danh sách bác sĩ thú y

const VetInfo = () => {
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    const fetchContacts = async () => {
      const account_id = localStorage.getItem('account_id'); // Get account ID
      setIsLoading(true);
      try {
        const response = await fetch('https://aqueous-island-09657-d7724403d9f8.herokuapp.com/api/veterinarian_contacts', {
                    headers: {
                        'X-Account-ID': account_id  // Send account ID in header
                    }
                });
        if (!response.ok) {
          throw new Error('Lỗi khi lấy danh sách liên lạc bác sĩ thú y');
        }
        const data = await response.json();
        setContacts(data);
      } catch (error) {
        console.error('Lỗi:', error);
        toast({
          title: 'Lỗi!',
          description: error.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchContacts();
  }, []);

  return (
    <Box bg="#FFFCF8" minHeight="100vh" display="flex" flexDirection="column">
      <Navbar />
      <Box flex={1}>
        <Container maxW="container.lg" p={4}>
          <AddVeterinarianContact /> {/* Nút "Add New Veterinarian" */}
          {isLoading ? (
            <Spinner size="xl" />
          ) : (
            <ShowVeterinarianContact contacts={contacts} setContacts={setContacts} />
          )}
        </Container>
      </Box>
      <Footer />
    </Box>
  );
};

export default VetInfo;