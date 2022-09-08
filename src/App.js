import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
  useNavigate 
} from "react-router-dom";
import jwt_decode from "jwt-decode";
import { createContext,useReducer, Dispatch, useState, useEffect,useContext } from "react";
//import { useNavigate } from 'react-router-dom';

import { initialState, stateReducer } from "./context/authentication/reducer";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";

import {AuthContextProvider, AuthContext} from "./context/authentication/authContext";
import { postReducder ,initialPostState} from "./context/postContext/reducer";
import { PostContext } from "./context/postContext/postContext";
import { setAuthenticateUser } from "./context/authentication/action";
import { getAuthTokenFromLocalStorage } from "./helpers/utils";




function App() {
  //const {AuthState, AuthDispatch} = useContext(AuthContext)
  const [state, dispatch] = useReducer(stateReducer,initialState)
  const [postsState, postsDispatch] = useReducer(postReducder, initialPostState);
  const [isAuthenticated,setIsAuthenticated] = useState(false);
// console.log("state",state)
// console.log("initialPostState",initialPostState)
  // useEffect(()=>{
  //   if(state.isAuthenticated){
  //     setIsAuthenticated(true)
  //   }
  // },[state.isAuthenticated])
  //let navigate = useNavigate()
 // console.log("state.isAuthenticated",state.isAuthenticated)
 const token=getAuthTokenFromLocalStorage();
useEffect(()=>{
  // const token=getAuthTokenFromLocalStorage();
  if(token){
    const decodedToken = jwt_decode(token);
    console.log("decodedToken",decodedToken)
    dispatch(setAuthenticateUser({
      username:decodedToken.username,
      userId:decodedToken.userId,
      email:decodedToken.email
    }))}
},[])
console.log("auth state",state)
 
  return (
  <AuthContext.Provider value={{state, dispatch}}>
    {/* {state.isRegistered?<Login/>:<Register/>} */}
    {state.isAuthenticated?
    <PostContext.Provider value={{postsState, postsDispatch}}>
         <Home/>
    </PostContext.Provider>
    :
    (
        <Router>
        <Routes>
          <Route exact path="/login" element={<Login/>}/>
          
          <Route path="/signup" element={<Register/>}/>
          <Route path="/" element={state.isRegistered?<Navigate to="/login" replace/>:<Navigate to="/signup" replace/>} />
          {/* <Route  path="/"   >
          {navigate("/login")}
          </Route> */}
        </Routes>
      </Router>
    )
    }

    {/* <Profile/> */}
  </AuthContext.Provider>
  )
  ;
}

export default App;
