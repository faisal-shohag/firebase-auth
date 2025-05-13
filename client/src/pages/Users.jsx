import { useEffect, useState } from "react";

const Users = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        fetch('http://localhost:5000/users')
        .then(res=> res.json())
        .then(data=> {
            console.log(data)
            setUsers(data)
        })
        .catch((err) => {
            console.log(err)
        })
    }, [])


    return (
        <div>
         {
            users.map(user => <div>{user.username} - {user.email}</div>)
         }
        </div>
    );
};

export default Users;