import { IconButton, useToast } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

const DeleteMedication = ({ petId, medicationId, setPet }) => {
    const toast = useToast();

    const handleDelete = async () => {
        try {
            const token = JSON.parse(localStorage.getItem('user')).token;
            const response = await fetch(`https://aqueous-island-09657-d7724403d9f8.herokuapp.com/api/pets/${petId}/medications/${medicationId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + token // Thêm token vào header
                },
                credentials: 'include'
            });

            if (response.ok) {
                const updatedPet = await response.json();
                setPet(updatedPet);

                toast({
                    title: 'Xóa thuốc thành công!',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
            } else {
                const errorData = await response.json();
                toast({
                    title: 'Lỗi!',
                    description: errorData.message || 'Lỗi khi xóa thuốc',
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
        <IconButton
            aria-label="Delete Medication"
            icon={<DeleteIcon />}
            onClick={handleDelete}
            colorScheme="red"
            size="sm"
        />
    );
};

export default DeleteMedication;