
import UserList from "./components/UserList";
import CreateUser from "./components/CreateUser";
import React, { useRef , useReducer} from 'react';
import useInputs from "./hooks/useInputs";

const initialState = {
  users: [
    {id:1, username: "정우성", age: 30, member:false},
    {id:2, username: "김고은", age: 28, member:false},
    {id:3, username: "공유", age: 22, member:false},
    {id:4, username: "서유정", age: 34, member:false},
    {id:5, username: "정우", age: 26, member:false},
  ]
}
function reducer(state,action){
  switch(action.type){
    case 'CREATE_USER':
      return {
        users:[
          ...state.users,
          action.user
        ]
      }
    case 'MEMBER_TOGGLE':
    return {
      users: state.users.map(user=>
        user.id === action.id ? {...user, member:!user.member } : user  
      )
    }
    case 'MEMBER_DELETE':
    return {
      users: state.users.filter(user=> user.id !== action.id )
    }
    default:
    return state;
  }
 
}
//UserDispatch라는 Context를 생성하고 내보내기
export const UserDispatch = React.createContext(null);
function App() {
  const [ { username, userage } , onChange, reset ] = useInputs({
    username:'',
    userage:''
  })
  const [ state, dispatch ] = useReducer(reducer, initialState);
  const { users } = state;
  const nextId = useRef(6);
  function onCreate(){
    dispatch({
      type:'CREATE_USER',
      user: {
        id:nextId.current,
        username: username,
        age: userage,
        member: false
      }
    })
    nextId.current = nextId.current+1;
  }
  
  
  return (
    <UserDispatch.Provider value={dispatch}>
    <div className="App">
      <CreateUser username={username} userage={userage} onChange={onChange} onCreate={onCreate}/>
      <UserList users={users} />
    </div>
    </UserDispatch.Provider>
  );
}

export default App;