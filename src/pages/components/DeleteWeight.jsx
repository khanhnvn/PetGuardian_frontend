//DeleteWeight.jsx
import {Button, useToast} from '@chakra-ui/react';

const DeleteWeight = ({ petId, weightId, setPet }) => {
    const toast = useToast();

    const handleDelete = async () => {
        try {
            const token = JSON.parse(localStorage.getItem('user')).token;
            const response = await fetch(`https://aqueous-island-09657-d7724403d9f8.herokuapp.com/api/pets/${petId}/weight/${weightId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + token // Thêm token vào header
                },
                credentials: 'include'
            });

            if (response.ok) {
                // Cập nhật danh sách cân nặng sau khi xóa thành công
                const updatedPet = await response.json();
                setPet(updatedPet);

                toast({
                    title: 'Xóa cân nặng thành công!',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
            } else {
                // Xử lý lỗi
                const errorData = await response.json();
                toast({
                    title: 'Lỗi!',
                    description: errorData.message || 'Lỗi khi xóa cân nặng',
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

    return (
        <Button onClick={handleDelete} ml={4} size="sm" colorScheme="red">
            Delete
        </Button>
    );
};

export default DeleteWeight;