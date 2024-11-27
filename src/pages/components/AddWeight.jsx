//AddWeight.jsx
import { useState } from 'react';
import {
    FormControl,
    FormLabel,
    Input,
    Button,
    useToast,
} from '@chakra-ui/react';

const AddWeight = ({ petId, setPet, onRefresh }) => {
    const toast = useToast();
    const [weight, setWeight] = useState('');
    const [dateRecorded, setDateRecorded] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('weight', weight);
        formData.append('date_recorded', dateRecorded);

        try {
            const response = await fetch(`https://aqueous-island-09657-d7724403d9f8.herokuapp.com/api/pets/${petId}/weight`, {
                method: 'POST',
                body: formData,
                credentials: 'include'
            });

            if (response.ok) {
                // Cập nhật danh sách cân nặng sau khi thêm thành công
                const updatedPet = await response.json();
                setPet(updatedPet);

                onRefresh();
                // Reset form
                setWeight('');
                setDateRecorded('');

                toast({
                    title: 'Thêm cân nặng thành công!',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
            } else {
                // Xử lý lỗi
                const errorData = await response.json();
                toast({
                    title: 'Lỗi!',
                    description: errorData.message || 'Lỗi khi thêm cân nặng',
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
        <form onSubmit={handleSubmit}>
            <FormControl>
                <FormLabel>Weight (kg)</FormLabel>
                <Input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                />
            </FormControl>
            <FormControl>
                <FormLabel>Date Recorded</FormLabel>
                <Input
                    type="date"
                    value={dateRecorded}
                    onChange={(e) => setDateRecorded(e.target.value)}
                />
            </FormControl>
            <Button type="submit" mt={4} colorScheme="blue">
                Add Weight Record
            </Button>
        </form>
    );
};

export default AddWeight;