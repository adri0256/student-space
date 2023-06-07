import {
    TableContainer,
    Table,
    TableCaption,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
    useToast,
} from "@chakra-ui/react";
import { useGetUsersQuery } from "../../features/users/usersApiSlice";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const UserList = () => {
    const toast = useToast();
    const {
        data: users,
        isLoading,
        isSuccess,
        isError,
        error,
    } = useGetUsersQuery(undefined, {
        pollingInterval: 5000,
    });

    useEffect(() => {
        if (isError) {
            toast({
                title: "Error",
                description: (error as any)?.data,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top",
            });
        }
    }, [isError, error, toast]);

    return (
        <>
            <TableContainer>
                <Table variant="striped" colorScheme="teal">
                    <TableCaption>User Data</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>id</Th>
                            <Th>Username</Th>
                            <Th>Email</Th>
                            <Th>First Name</Th>
                            <Th>Last Name</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {users?.map((user: any) => {
                            return (
                                <Tr key={user._id}>
                                    <Td>{user._id}</Td>
                                    <Td>{user.username}</Td>
                                    <Td>{user.email}</Td>
                                    <Td>{user.firstName}</Td>
                                    <Td>{user.lastName}</Td>
                                </Tr>
                            );
                        })}
                    </Tbody>
                </Table>
            </TableContainer>
            <Link to="/home">Back to Home</Link>
        </>
    );
};

export default UserList;
