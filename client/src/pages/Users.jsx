import { useQuery } from "@tanstack/react-query";

const getUsers = async () => {
    const response = await fetch('http://localhost:3000/users',)
    const data = await response.json()
    return data
}


const Users = () => {
    const {isError, isSuccess, data, isLoading} = useQuery({queryKey: ['users'], queryFn: getUsers})
    console.log(isLoading, isError, isSuccess, data)

    if(isLoading) return <div>Loading...</div>
    if(isError) return <div>Error</div>
    return (
        <div>
         {
            data.map(user => <div key={user._id}>{user.displayName} - {user.email}</div>)
         }
        </div>
    );
};

export default Users;