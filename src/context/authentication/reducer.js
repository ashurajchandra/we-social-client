import { getAuthTokenFromLocalStorage,decodeToken ,isAuthenticated} from '../../helpers/utils';
import{
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    IS_AUTHONTICATED,
   // IS_SIGNEDUP,
    USERNAME,
    LOGOUT,
    IS_FETCHING,
    SIGNUP_START,
    SIGNUP_SUCCESS,
    SIGNUP_FAILED,
    AUTHENTICATE_USER
} from './actionType';


// const isAuthenticated =()=>{
//     const token =decodeToken();
//     const current = new Date().getTime()/1000;
//     console.log("token",token);
//     console.log("current",current)

// }

export const initialState = {
    isAuthenticated:isAuthenticated(),
    isFetching:false,
    isLogedOut:false,
    username:"",
    profilePicture:"",
    loginFailed:false,
    errorInFetching:false,
    user:{
        username:"",
        email:"",
        userId:""
    },
    error:null,
    isRegistered:false,
};

export const stateReducer = (state=initialState, action)=>{
    switch(action.type){
        case IS_AUTHONTICATED:{
            return {
                ...state,
                isFetching:action.payload
            };
         };
        case IS_FETCHING:{
        return {
            ...state,
            isFetching:action.payload
        };
    }
    case USERNAME:{
        return{
            ...state,
            username:action.payload
        };
    }
    case LOGIN_START:{
       return{
        ...state,
         isFetching:true
       // isFetching:action.payload
       };
    };
    case SIGNUP_START:{
        return{
         ...state,
          isFetching:true
        // isFetching:action.payload
        };
     }
    case LOGIN_SUCCESS:{
        return{
            ...state,
            isFetching:false,
            // errorInFetching:false,
            isAuthenticated:action.payload,
            error:null
           // isAuthenticated:action.payload.isAuthenticated,
           // username: action.payload
        };
    };
    case AUTHENTICATE_USER:{
        return{
            ...state,
            isAuthenticated:true,
            user:action.payload
        };
    };
    case SIGNUP_SUCCESS:{
        return{
            ...state,
            isFetching:false,
            // errorInFetching:false,
           // isAuthenticated:true,
           isRegistered:true,
            error:null,
            user:action.payload
           // isAuthenticated:action.payload.isAuthenticated,
           // username: action.payload
        };
    };
    case LOGIN_FAILED:{
        return{
            ...state,
            isFetching:false,
            isAuthenticated:false,
            // errorInFetching:true,
            error:action.payload

        }
    }
    case SIGNUP_FAILED:{
        return{
            ...state,
            isFetching:false,
           // isAuthenticated:false,
           isRegistered:false,
            // errorInFetching:true,
            error:action.payload

        }
    }
    case LOGOUT:{
        return{
            ...initialState
        }
    }
        default: return state;
    }
}