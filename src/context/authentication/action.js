import{
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    IS_AUTHONTICATED,
    USERNAME,
    LOGOUT,
    IS_FETCHING,
    SIGNUP_START,
    SIGNUP_SUCCESS,
    SIGNUP_FAILED,
    AUTHENTICATE_USER
} from './actionType';

export const setAuthenticateUser =(payload)=>{
    return{
        type:AUTHENTICATE_USER,
        payload
    }
}
export const setSignupStart = ()=>{
    return{
         type:SIGNUP_START
    }
}
export const setSignupSuccess = (payload)=>{
    return{
        type:SIGNUP_SUCCESS,
        payload
    };
};
export const setSignupFailed = (payload)=>{
    return{
        type:SIGNUP_FAILED,
        payload
    };
};

export const setIsAuthenticated = (payload)=>{
    return{
        type:IS_AUTHONTICATED,
        payload
    };
    };

export const setUserName = (payload)=>{
    return{
        type:USERNAME,
        payload,
    };
}  ;  

export const setIsFetching=(payload)=>{
    return{
        type:IS_FETCHING,
        payload,
    };
};


// const setLoginStart = (payload)=>{
//     return{
//         type:LOGIN_START,
//         payload
//     }
// };

export const setLoginStart = ()=>{
    return{
        type:LOGIN_START,
    }
};
export const setLoginSuccess = (payload)=>{
    console.log("inside login success action",payload)
    return{
        type:LOGIN_SUCCESS,
        payload
    }
};
export const setLoginFailed = (payload)=>{
    return{
        type:LOGIN_START,
        payload
    }
};

export const setLogout = () => {
    return {
      type: LOGOUT,
      payload: "",
    };
  };