import { IconButton, useToast } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

const DeleteVaccine = ({ petId, vaccineId, setPet }) => {
    const toast = useToast();

    const handleDelete = async () => {
        const account_id = localStorage.getItem('account_id'); // Get account ID
        try {
            const response = await fetch(`https://aqueous-island-09657-d7724403d9f8.herokuapp.com/api/pets/${petId}/vaccines/${vaccineId}`, {
                method: 'DELETE',
                headers: {
                    'X-Account-ID': account_id  // Send account ID in header
                }
            });

            if (response.ok) {
                const updatedPet = await response.json();
                setPet(updatedPet);

                toast({
                    title: 'Xóa vắc xin thành công!',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
            } else {
                const errorData = await response.json();
                toast({
                    title: 'Lỗi!',
                    description: errorData.message || 'Lỗi khi xóa vắc xin',
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
            aria-label="Delete Vaccine"
            icon={<DeleteIcon />}
            onClick={handleDelete}
            colorScheme="red"
            size="sm"
        />
    );
};

export default DeleteVaccine;