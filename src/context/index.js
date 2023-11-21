import { createContext, useReducer } from 'react';


const UserContext = createContext({
    isLogin: '',
    setIsLogin: () => { },
    statusLogin: '',
    setStatusLogin: () => { },

});


export default UserContext;