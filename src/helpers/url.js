const API_BASE_URL = process.env["REACT_APP_API_BASE_URL"];

export const APIUrls = {
    signupUrl: ()=> `${API_BASE_URL}/auth/register`,
    loginUrl: ()=> `${API_BASE_URL}/auth/login`,
    getPosts: (page)=> `${API_BASE_URL}/post/allPosts?page=${page}`,
    deletePost:(id)=> `${API_BASE_URL}/post/postId/${id}`,
    updatePostUrl:(id)=>`${API_BASE_URL}/post/${id}`
}