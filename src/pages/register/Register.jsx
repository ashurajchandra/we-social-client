import { Link, useNavigate } from "react-router-dom";
import "./register.css";
import {signUp} from "../../services/api";
import { useEffect, useContext, useState } from "react";
import { AuthContext } from "../../context/authentication/authContext";
import { setIsFetching, setSignupStart, setSignupSuccess, setSignupFailed } from "../../context/authentication/action";

export default function Register() {
const {state, dispatch} = useContext(AuthContext);
const navigate = useNavigate();
const [registerDetails, setRegisterDetails] = useState({
  email:"",
  username:"",
  password:"",
  confirmPassword:""
})

  // useEffect(()=>{
  //   const register= async()=>{
  //  try{
  //   const payload={

  //   }
  //   dispatch(setIsFetching(true));
  //   const registerResponse = await signUp(registerDetails);
  //   console.log("registerResponse",registerResponse)
  //   dispatch(setIsFetching(false));
  //  }catch(err){
  //   alert(`error in register user ${err.message}`)
  //   dispatch(setIsFetching(false));
  //  }
  //   }
   
  //   // const register = await signUp()
  // })

  const handleChange = (e)=>{
   setRegisterDetails((prevState)=>({...prevState, [e.target.name]:e.target.value}))
  }

  const handleFormSubmit=(e)=>{
   e.preventDefault();
   handleUserRegisteration()

  }

  const handleUserRegisteration= async()=>{
    try{

      const {username,email,password,confirmPassword} = registerDetails;
   if(username && email && password && confirmPassword){
    const payload={
      email:email,
      username:username,
      password:password,
      confirmPassword:confirmPassword
    }
    dispatch(setSignupStart());
    dispatch(setIsFetching(true));
    const registerResponse = await signUp(registerDetails);
    console.log("registerResponse",registerResponse)
    if(registerResponse.status===200){
      dispatch(setSignupSuccess(registerResponse.data.data))
      navigate("/login")
    }
    dispatch(setIsFetching(false));
    // dispatch(setSignupSuccess())
   }
     

    }catch(err){
     alert(`error in register user ${err.message}`)
     
     dispatch(setIsFetching(false));
     dispatch(setSignupFailed(err))
    }
     }

console.log("registerDetails",registerDetails)
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Wesocial</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Lamasocial.
          </span>
        </div>
        <div className="loginRight">
          <div className="loginBox">
           <form onSubmit={handleFormSubmit}>
           <input onChange={handleChange} value={registerDetails.username} required placeholder="Username" type="text" className="loginInput"  name="name"/>
            <input onChange={handleChange} value={registerDetails.email} required placeholder="Email" type="email" className="loginInput"  name="email"/>
            <input onChange={handleChange} value={registerDetails.password} required placeholder="Password" type="password" className="loginInput"  name="password"/>
            <input onChange={handleChange} value={registerDetails.confirmPassword} required placeholder="Password Again" type="password" className="loginInput" name="confirmPassword" />
            <button type="submit" className="loginButton">Sign Up</button>
           </form>
            <button className="loginRegisterButton">
              <Link to="/login">
              Log into Account
              </Link>
             
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
