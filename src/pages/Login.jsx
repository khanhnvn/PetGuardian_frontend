//Login.jsx
import {
    Box,
    Button,
    Container,
    Input, Link,
    Stack,
    Text, Image, useToast, Flex
} from "@chakra-ui/react";

import {useNavigate} from "react-router-dom";
import {useState} from "react";
import PasswordInput from "./components/PasswordInput";

const Login = () => {
    const toast = useToast();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await
                fetch('https://aqueous-island-09657-d7724403d9f8.herokuapp.com/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                    body: JSON.stringify({ email: email, password: password
                    }),
                });

            if (response.ok) {
                const data = await response.json();
                const token = data.token;
                const roleId = data.role_id;

                toast({
                    title: 'Đăng nhập thành công!',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });

                // Lưu token vào localStorage
                localStorage.setItem('token', token);
                // console.log("Token đã lưu:", localStorage.getItem('token'));
                console.log("role id:", roleId);
                
                if (roleId === 1) {
                    console.log("role id:", roleId);
                    navigate('/homepage');
                } else if (roleId === 3) {
                    navigate('/customerhomepage');
                } else if (roleId === 2) {
                    navigate('/adminhomepage')
                }

            } else {
                // Xử lý lỗi đăng nhập, ví dụ: sai email hoặc mật khẩu
                const errorData = await response.json();
                toast({
                    title: 'Lỗi đăng nhập!',
                    description: errorData.message || 'Email hoặc mật khẩu không đúng.',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            }
        } catch (error) {
            console.error('Lỗi đăng nhập:', error);
            toast({
                title: 'Lỗi!',
                description: 'Đã có lỗi xảy ra.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <Flex
            width="100vw"
            height="100vh"
            bg="#FAA42D"
            justifyContent="center"
            alignItems="center"
        >
            <Flex bg="#FFF3E1" // Background màu #FFF3E1 cho box
                  borderRadius="48px" // Border radius 48px
                  p="90px" // Padding cho box
                  width="80vw" // Điều chỉnh chiều rộng của box
                  justifyContent="space-between" // Căn chỉnh các element con
                  alignItems="center"
            >
                <form onSubmit={handleSubmit}>
                    <Stack spacing={7} width="100%" minWidth="300px" // Center the text
                    >

                        <Text
                            fontSize="48" fontFamily="Poppins"
                            color="#1A4742"
                            fontStyle={"normal"} fontWeight={"500"}
                            lineHeight={"48px"} letterSpacing={"-1.44px"}
                        >
                            Welcome Back!
                        </Text>

                        <Input placeholder="Email" size="lg" variant="outline"
                               bg={"white"} borderRadius={58} border="1px"
                               value={email}
                               onChange={(e) => setEmail(e.target.value)}
                        />

                        <PasswordInput value={password}
                                       onChange={(e) => setPassword(e.target.value)}/>

                        <Button bg={"#F4BC43"} size="lg" borderRadius={58}
                                variant='link'
                                type="submit"
                        >
                            Log In
                        </Button>

                        <Text fontSize="larger" fontFamily="Poppins"
                              color="#1A4742"
                              fontStyle={"normal"} fontWeight={"500"}
                              lineHeight={"37px"} letterSpacing={"-1.44px"}
                        >
                            Don't have an account?
                        </Text>

                        <Button bg={"#F4BC43"} size="lg" borderRadius={58}
                                variant='link'
                                onClick={() => navigate('/register')}
                        >
                            Sign Up
                        </Button>

                        <Link fontSize="larger" onClick={() => navigate('/forgotpassword')}> Forgot password?</Link>

                    </Stack>
                </form>

                <Flex direction="row" gap="20px">
                    <Box w="300px" h="300px">
                        <Image src='/logo.png' alt='logo'/>
                    </Box>
                    <Box w="300px" h="300px">
                        <Image src='/word_logo.png' alt='word_logo'/>
                    </Box>
                </Flex>
            </Flex>
        </Flex>

    )
}
export default Login



