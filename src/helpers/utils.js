import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
//const navigate= useNavigate();

export const decodeToken =(token="")=>{
   try{
    const tkn = token?token:getAuthTokenFromLocalStorage();
    const decodedToken = jwt_decode(tkn);
    return decodedToken;
   }catch(err){
    console.log("err in token decode",err)
   }
}

export const isAuthenticated =()=>{
   
    const token =decodeToken();
    const current = new Date().getTime()/1000;
    console.log("token",token);
    console.log("current",current)
    // if(current<token.exp){
    //     return true;
    // };
    // if(!token){
    //     window.location.replace("/login")
    // }
    console.log("window location isAuth",window.location)
    if(!window.location.href.includes("login") && window.location.pathname !=="/" && window.location.pathname !=="/signup"){
        console.log("window location inside if condtn",window.location)
        localStorage.setItem("redirectUrl",window.location.href)
    }
    if(token){
        return true
    }
    return false;

}

export const getAuthTokenFromLocalStorage=()=>{

    return localStorage.getItem('token');
};

const REMEMBER_ME_KEY = "remember-me-email-id";

export const setRememberMeValue = (value)=>{
    if (value === "null" || value === "undefined") return;
    if(value){
        localStorage.setItem(REMEMBER_ME_KEY, value)
    }
};

export const getRememberMeValue = ()=>{
    const value = localStorage.getItem(REMEMBER_ME_KEY);
    if(value) return value;
    return "";
}

//USER LOGOUT

export const logout = () =>{
    const rememberMeValue = getRememberMeValue();
    localStorage.clear();
    sessionStorage.clear();
    setRememberMeValue(rememberMeValue);
    window.location.reload();
}