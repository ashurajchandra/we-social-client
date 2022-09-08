import{
    ADD_POST,
    EDIT_POST,
    DELETE_POST,
    GET_POSTS,
    IS_LOADING,
    REFETCH_POST,
    TOTAL_COUNT,
} from './actionType';

export const setTotalCount =(payload)=>{
    return{
        type:TOTAL_COUNT,
        payload
    }
}
export const setRefetchPost=(payload)=>{
    return{
        type:REFETCH_POST,
        payload
    }
}
export const setIsLoading =(payload)=>{
return{
    type:IS_LOADING,
    payload
}
}

// export const setAddPost = (payload)=>{
//     return{
//         type:ADD_POST,
//         payload
//     }
// }
export const setGetPosts = (payload)=>{
    return{
        type:GET_POSTS,
        payload
    };

};

export const setEditPost = (payload)=>{
    return {
        type:EDIT_POST,
        payload
    }
}
export const setDeletePost = ()=>{
    return {
        type:DELETE_POST
    }
}