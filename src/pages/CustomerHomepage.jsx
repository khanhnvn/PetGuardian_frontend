import { useState, useEffect } from 'react';
import {
    Box,
    Heading,
    Text,
    VStack,
    Container,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
} from '@chakra-ui/react';
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";

const CustomerHomePage = () => {
    const [revenue, setRevenue] = useState(0);
    const [salesHistory, setSalesHistory] = useState([]); // State for sales history

    useEffect(() => {
        const fetchRevenue = async () => {
            const account_id = localStorage.getItem('account_id');
            try {
                const response = await fetch('https://aqueous-island-09657-d7724403d9f8.herokuapp.com/api/customers/revenue', {
                    method: 'GET',
                    headers: {
                        'X-Account-ID': account_id  // Send account ID in header
                    }
                });
                if (!response.ok) {
                    throw new Error('Lỗi khi lấy doanh số');
                }
                const data = await response.json();
                setRevenue(data.total_revenue);
                setSalesHistory(data.sales_history); // Update sales history state
            } catch (error) {
                console.error('Lỗi:', error);
                // Xử lý lỗi (ví dụ: hiển thị thông báo lỗi)
            }
        };

        fetchRevenue();
    }, []);

    return (
        <Box bg="#FFFCF8" minHeight="100vh" display="flex" flexDirection="column">
            <Navbar />
            <Box flex={1}>
                <Container maxW="container.lg" p={10}>
                    <VStack spacing={4} alignItems="flex-start">
                        <Heading as="h1" size="xl">
                            Tổng doanh thu (không tính phí ship)
                        </Heading>
                        <Text fontSize="2xl">
                            {revenue}
                        </Text>

                        {/* Check if salesHistory is an array and not empty */}
                        {Array.isArray(salesHistory) && salesHistory.length > 0 ? (
                            <Table variant="simple">
                                <Thead>
                                    <Tr>
                                        <Th>Tên món hàng</Th>
                                        <Th>Ngày, giờ mua</Th>
                                        <Th>Số lượng</Th>
                                        <Th>Đơn giá</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {salesHistory.slice().reverse().map((item) => (
                                        <Tr key={item.id}> {/* Make sure each item has a unique 'id' */}
                                            <Td>{item.name}</Td>
                                            {/* <Td>{item.order_date}</Td> */}
                                            <Td>{new Date(item.order_date).toLocaleDateString()}</Td>
                                            <Td>{item.quantity}</Td>
											<Td>{item.price}</Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>
                        ) : (
                            <Text>Không có lịch sử bán hàng.</Text> // Display a message if no sales history
                        )}

                    </VStack>
                </Container>
            </Box>
            <Footer />
        </Box>
    );
};

export default CustomerHomePage;