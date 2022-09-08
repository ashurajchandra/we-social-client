import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import {login} from "../../services/api";
import { useEffect, useContext, useState } from "react";
import { AuthContext } from "../../context/authentication/authContext";
import { setIsFetching, setSignupStart, setSignupSuccess, setSignupFailed, setLoginStart, setLoginSuccess, setIsAuthenticated, setAuthenticateUser } from "../../context/authentication/action";
import { setRememberMeValue, getRememberMeValue, decodeToken ,getAuthTokenFromLocalStorage} from "../../helpers/utils";
import "./login.css";

export default function Login() {
  const rememberMeValue = getRememberMeValue()
  const {state, dispatch} = useContext(AuthContext);
  const [userLoginInfo, setUserLoginInfo] = useState({
    email:"",
    password:""
  });
  const [rememberMe, setRememberMe] = useState(rememberMeValue? true : false)
  const navigate = useNavigate();

  useEffect(()=>{
   // const decodeToken= decodeToken();
    // console.log("decodeToken", decodeToken)
  })

  const handleOnChange=(e)=>{
      setUserLoginInfo((prevState)=>({...prevState ,[e.target.name]:e.target.value}))
  };

  const handleFormSubmit=(e)=>{
    e.preventDefault();
    handleUserLogin()
  }

  const handleUserLogin = async()=>{
    const redirectUrl = localStorage.getItem("redirectUrl")
    const {email,password} = userLoginInfo;
    if(email && password){
      const payload = {
        email:email,
        password:password
      }
        dispatch(setIsFetching(true))
        dispatch(setLoginStart(true))
        const loginInfoResponse = await login(payload);
        if(rememberMe){
          console.log("rememberMe in localstorage",payload.email)
          setRememberMeValue(payload.email)
        }else{
          setRememberMeValue("")
        }
        if(redirectUrl){
          localStorage.removeItem("redirectUrl");
          window.location.replace(redirectUrl)
        }else{
          dispatch(setIsAuthenticated(true));
          navigate("/")
        }
       // console.log("loginInfoResponse",loginInfoResponse)
        if(loginInfoResponse.status===200){
          console.log("setting token to localstorage",loginInfoResponse.data.data)
          localStorage.setItem('token', loginInfoResponse.data.data);
          dispatch(setIsAuthenticated(true))
             dispatch(setLoginSuccess(true))

            //decoding token after getting it from localstorage
            // const token=getAuthTokenFromLocalStorage();
            // if(token){
            //   const decodedToken = jwt_decode(token);
            //   console.log("decodedToken",decodedToken)
            //   dispatch(setAuthenticateUser({
            //     username:decodedToken.username,
            //     userId:decodedToken.userId,
            //     email:decodedToken.email
            //   }))

            // }
             navigate("/")
        }
    }
  }

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Wesocial</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Wesocial.
          </span>
        </div>
        <div className="loginRight">
          <div className="loginBox">
           <form onSubmit={handleFormSubmit}>
           <input placeholder="Email" type="email" name="email" value={userLoginInfo.email} required onChange={handleOnChange} className="loginInput" />
            <input placeholder="Password" type="password" name="password" value={userLoginInfo.password} required onChange={handleOnChange} className="loginInput" />
            <button className="loginButton" type="sybmit">Log In</button>
           </form>
           <div>
            <div>
              <input
              id="rememberMeCheckBox"
              type="checkbox"
              name="rememberMe"
              checked={rememberMe}
              onChange={(e)=>setRememberMe(e.target.checked)}
              />
              <label htmlFor="rememberMeCheckBox">
                Remember Me
              </label>
            </div>
           </div>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton">
              Create a New Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
