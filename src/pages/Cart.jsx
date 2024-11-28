//Cart.jsx
import { useState, useEffect, useMemo } from 'react';
import {
    Box,
    Heading,
    Text,
    VStack,
    HStack,
    Image,
    Button,
    Container,
    useToast,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Spacer,
    Checkbox,
} from '@chakra-ui/react';
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
    const toast = useToast();
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        const account_id = localStorage.getItem('account_id'); // Get account ID
        try {
            const response = await fetch('https://aqueous-island-09657-d7724403d9f8.herokuapp.com/api/cart', {
                headers: {
                    'X-Account-ID': account_id  // Send account ID in header
                }
            });
            if (!response.ok) {
                throw new Error('Lỗi khi lấy giỏ hàng');
            }
            const data = await response.json();
            setCart(data);
        } catch (error) {
            console.error('Lỗi:', error);
            toast({
                title: 'Lỗi!',
                description: error.message,
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const handleRemoveFromCart = async (cartItemId) => {
        const account_id = localStorage.getItem('account_id'); // Get account ID
        try {
            const response = await fetch(`https://aqueous-island-09657-d7724403d9f8.herokuapp.com/api/cart/remove/${cartItemId}`, {
                method: 'DELETE',
                headers: {
                    'X-Account-ID': account_id  // Send account ID in header
                },
            });
            if (response.ok) {
                fetchCart();
                toast({
                    title: 'Xóa sản phẩm khỏi giỏ hàng thành công!',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
            } else {
                const errorData = await response.json();
                toast({
                    title: 'Lỗi!',
                    description: errorData.message || 'Lỗi khi xóa sản phẩm khỏi giỏ hàng.',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            }
        } catch (error) {
            console.error('Lỗi:', error);
            toast({
                title: 'Lỗi!',
                description: 'Đã có lỗi xảy ra.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const handleQuantityChange = async (cartItemId, newQuantity) => {
        const account_id = localStorage.getItem('account_id'); // Get account ID
        try {
            const response = await fetch('https://aqueous-island-09657-d7724403d9f8.herokuapp.com/api/cart/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Account-ID': account_id  // Send account ID in header
                },
                body: JSON.stringify({ cart_item_id: cartItemId, quantity: newQuantity }),
            });

            if (response.ok) {
                fetchCart();
            } else {
                const errorData = await response.json();
                toast({
                    title: 'Lỗi!',
                    description: errorData.message || 'Lỗi khi cập nhật số lượng sản phẩm.',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            }
        } catch (error) {
            console.error('Lỗi:', error);
            toast({
                title: 'Lỗi!',
                description: 'Đã có lỗi xảy ra.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };
      
    // Tính toán tổng tiền của các sản phẩm được chọn
    const totalPrice = useMemo(() => {
        return cart.reduce((total, item) => {
            const price = typeof item.price === 'string' ? parseFloat(item.price.replace(/[^0-9.-]+/g, "")) : item.price;
                return total + price * item.quantity;
        }, 0);
    }, [cart]);

    const handleCheckout = () => {
        navigate(`/checkout`); 
        
    };


    return (
        <Box bg="#FFFCF8" minHeight="100vh" display="flex" flexDirection="column">
            <Navbar />
            <Box flex={1}>
                <Container maxW="container.lg" p={10}>
                    <Heading as="h1" size="xl" mb={4}>
                        Giỏ hàng
                    </Heading>
                    {cart.length === 0 ? (
                        <Text>Giỏ hàng trống</Text>
                    ) : (
                        <VStack spacing={4} align="stretch">
                            {cart.map((item) => (
                                <Box key={item.id} borderWidth="1px" borderRadius="lg" p={4}>
                                    <HStack>  
                                        {item.image ? (
                                            <Image 
                                                src={`https://aqueous-island-09657-d7724403d9f8.herokuapp.com/uploads/${item.image}`} 
                                                alt={item.name} 
                                                boxSize="100px" 
                                                objectFit="cover" 
                                                fallbackSrc="/uploads/default_image.jpg" 
                                            />
                                        ) : (
                                            <Image 
                                                src="/uploads/default_image.jpg" 
                                                alt="Default Image" 
                                                boxSize="100px" 
                                                objectFit="cover" 
                                            />
                                        )}

                                        <VStack align="start">
                                            <Heading as="h3" size="md">
                                                {item.name}
                                            </Heading>
                                            <Text>Giá: {item.price} VND</Text>
                                            <NumberInput 
                                                value={item.quantity} 
                                                min={1} 
                                                max={item.quantity} 
                                                onChange={(valueString) => handleQuantityChange(item.cart_item_id, parseInt(valueString || '1', 10))}
                                            >
                                                <NumberInputField />
                                                <NumberInputStepper>
                                                    <NumberIncrementStepper />
                                                    <NumberDecrementStepper />
                                                </NumberInputStepper>
                                            </NumberInput>
                                        </VStack>
                                        <Spacer />
                                        <Button colorScheme="red" size="sm" onClick={() => handleRemoveFromCart(item.cart_item_id)}>
                                            Xóa
                                        </Button>
                                    </HStack>
                                </Box>
                            ))}
                            <Box>
                                <Text fontSize="xl" fontWeight="bold">Tổng tiền: {totalPrice} VND</Text> {/* Hiển thị tổng tiền */}
                                
                                <Button colorScheme="blue" mt={4} onClick={handleCheckout}>
                                    Tiến hành thanh toán
                                </Button>
                                
                            </Box>
                        </VStack>
                    )}
                </Container>
            </Box>
            <Footer />
        </Box>
    );
};

export default Cart;