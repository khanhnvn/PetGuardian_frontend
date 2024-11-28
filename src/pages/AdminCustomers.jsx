import { useState, useEffect } from 'react';
import {
    Box,
    Heading,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Container,
    useToast,
} from '@chakra-ui/react';
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";

const AdminCustomers = () => {
    const toast = useToast();
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        const fetchCustomers = async () => {
            const account_id = localStorage.getItem('account_id');
            const role_id = localStorage.getItem('role_id');
            try {
                const response = await fetch('https://aqueous-island-09657-d7724403d9f8.herokuapp.com/api/admin/customers', {
                    method: 'GET',
                    headers: {
                        'X-Account-ID': account_id,
                        'X-Role-ID': role_id
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setCustomers(data);
                } else {
                    const errorData = await response.json();
                    toast({
                        title: 'Lỗi!',
                        description: errorData.message || 'Lỗi khi lấy danh sách khách hàng',
                        status: 'error',
                        duration: 3000,
                        isClosable: true,
                    });
                }
            } catch (error) {
                console.error('Lỗi khi lấy danh sách khách hàng:', error);
                toast({
                    title: 'Lỗi!',
                    description: 'Đã có lỗi xảy ra.',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            }
        };

        fetchCustomers();
    }, [toast]);

    return (
        <Box bg="#FFFCF8" minHeight="100vh" display="flex" flexDirection="column">
            <Navbar />
            <Box flex={1}>
                <Container maxW="container.lg" p={10}>
                    <Heading as="h1" size="xl" mb={4}>
                        Quản lý shop 
                    </Heading>

                    <Heading as="h2" size="lg" mb={2}>
                        Tổng : {customers.length}
                    </Heading>

                    <Table variant="simple">
                        <Thead>
                            <Tr>
                                <Th>ID</Th>
                                <Th>Tên</Th>
                                <Th>Email</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {customers.slice().reverse().map((customer) => (
                                <Tr key={customer.id}>
                                    <Td>{customer.id}</Td>
                                    <Td>{customer.username}</Td>
                                    <Td>{customer.email}</Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </Container>
            </Box>
            <Footer />
        </Box>
    );
};

export default AdminCustomers;