import axios from 'axios';
import { useContext, useReducer } from 'react';
import { AuthContext } from '../context/authentication/authContext';
import { setGetPosts, setIsLoading } from '../context/postContext/action';
import { PostContext } from '../context/postContext/postContext';
import { APIUrls } from '../helpers/url';


    // const {postsState, postsDispatch} = useContext(PostContext);
    // const [state, dispatch] = useContext(AuthContext);

    const {signupUrl, loginUrl,getPosts, deletePost,updatePostUrl} = APIUrls

const token = localStorage.getItem('token')
export const signUp = async(requesBody)=>{
try{
   const response = await axios.post(signupUrl(), requesBody)
   return response; 

}catch(err){
    console.log("error ocurred during signup",err.message)
}
};

export const login = async(requesBody)=>{
    try{
       const response = await axios.post(loginUrl(), requesBody)
       return response; 
    
    }catch(err){
        console.log("error ocurred during signup",err.message)
    }
    };

    //Get API METHOD
    export const fetchPosts = async(page)=>{
        try{
             const response = await axios.get(getPosts(page),
             {
                headers:{
                    Authorization: `Bearer ${token}`
                }
             });
             
             return response
            // if(response?.data.success){
            //     console.log("response",response.data.data)
            //     postsDispatch(setGetPosts(response.data.data))
            //     postsDispatch(setIsLoading(false))
            //   }
        }catch(err){
            // postsDispatch(setIsLoading(false))
            console.log("error in fetching posts,",err.message)
        }
         
    }

        //DELETE POST API

    export  const deletePostItem = async(id)=>{
            try{
                 const response = await axios.delete(deletePost(id),
                 {
                        headers:{
                            Authorization: `Bearer ${token}`
                        }
                    
                 });
                 return response;
            }catch(err){
                console.log("err in dleteing post",err.message)
            }
        }
// }

export const updatePost = async(id, reqestBody)=>{
    try{
        const response = await axios.put(updatePostUrl(id), reqestBody,
        {
            headers:{
                Authorization: `Bearer ${token}`
            }
        });
        return response
    }catch(err){
        console.log('error in updating post',err.message)
    }
}

 




