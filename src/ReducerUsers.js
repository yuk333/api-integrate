import { useEffect, useReducer} from "react";
import axios from "axios";

//리듀서 함수 생성하기 type:Loading,Success,Error설정
function reducer(state, action) {
    switch (action.type) {
        case 'LOADING':
            return {
                loading: true,
                data: null,
                error: null,
            }
        case 'SUCCESS' : 
            return {
                loading: false,
                data: action.data,
                error: null,
            }
        case 'ERROR' :
            return {
                loading: false,
                data: null,
                error: action.error,
            }
        default : 
            throw new Error(`없는 action.type입니다. ${action.type}`);
    }
}
function ReducerUser(){
    const [state, dispatch] = useReducer(reducer, {
        loading: false,
        data: null,
        error: null,
    })
    const fetchUsers = async () => {
      //type:'LOADING'이 담겨있는 액션 객체를 dispatch
      //reducer를 실행
      dispatch({ type: 'LOADING'});
      try{
          const response =  await axios.get(
              `https://jsonplaceholder.typicode.com/users/`
          );
          dispatch({ type: 'SUCCESS', data: response.data});
      }
      catch (e){
          console.log(e.response.status);
          dispatch({ type: 'ERROR',error: e});
      }
    }
    useEffect(()=>{
        fetchUsers();
    },[])
    const { loading, data, error } = state; 
    if(loading) return <div>로딩중...</div>;
    if(error) return <div>에러가 발생했습니다.</div>;
    if(!data) return null;
    return(
        <>
        <ul>
            {data.map(user=> (
                <li key = {user.id}>
                    {user.username}({user.name})
                </li>
            ))}
        </ul>
        <button onClick={fetchUsers}>
            다시 불러오기 
        </button>
        </>
    );
}
export default ReducerUser;