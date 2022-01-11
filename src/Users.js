import axios from "axios";
import { useState, useEffect } from "react";
function Users(){
    //상태관리
    const [users, SetUsers ] = useState(null);
    const [loading, setLoading] =useState(false);
    const [error, setError] = useState(null);
    const fetchUsers = async () => {
        try{
            SetUsers(null);
            setError(null);
            setLoading(true);
            const response = await axios.get(
                `https://jsonplaceholder.typicode.com/users/`
            );
            //response.data는 결과값
            SetUsers(response.data);
        }catch(e){
            setError(e);
        }
        setLoading(false);
    }
    //컴포넌트가 처음 그려질때  useEffect 호출 하겠다.
    useEffect(()=>{
       
        fetchUsers();
    },[])
    if(loading) return <div>로딩중...</div>
    if(error) return <div>에러가 발생했습니다.</div>
    if(!users) return null;
    return (
        <>
        <ul>
            {users.map(user=> (
                <li key = {user.id}>
                    {user.username}({user.name})
                </li>
            ))}
        </ul>
        <button onClick={fetchUsers}>
            다시 불러오기 
        </button>
        </>
    )
}
export default Users;