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

const AdminUsers = () => {
    const toast = useToast();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const account_id = localStorage.getItem('account_id');
            const role_id = localStorage.getItem('role_id');
            try {
                const response = await fetch('https://aqueous-island-09657-d7724403d9f8.herokuapp.com/api/admin/users', {
                    method: 'GET',
                    headers: {
                        'X-Account-ID': account_id,
                        'X-Role-ID': role_id
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setUsers(data);
                } else {
                    const errorData = await response.json();
                    toast({
                        title: 'Lỗi!',
                        description: errorData.message || 'Lỗi khi lấy danh sách người dùng',
                        status: 'error',
                        duration: 3000,
                        isClosable: true,
                    });
                }
            } catch (error) {
                console.error('Lỗi khi lấy danh sách người dùng:', error);
                toast({
                    title: 'Lỗi!',
                    description: 'Đã có lỗi xảy ra.',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            }
        };

        fetchUsers();
    }, [toast]);

    return (
        <Box bg="#FFFCF8" minHeight="100vh" display="flex" flexDirection="column">
            <Navbar />
            <Box flex={1}>
                <Container maxW="container.lg" p={10}>
                    <Heading as="h1" size="xl" mb={4}>
                        Quản lý người dùng
                    </Heading>

                    <Heading as="h2" size="lg" mb={2}>
                        Tổng người dùng: {users.length}
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
                            {users.slice().reverse().map((user) => (
                                <Tr key={user.id}>
                                    <Td>{user.id}</Td>
                                    <Td>{user.username}</Td>
                                    <Td>{user.email}</Td>
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

export default AdminUsers;