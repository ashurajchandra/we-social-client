import{
    ADD_POST,
    EDIT_POST,
    DELETE_POST,
    GET_POSTS,
    IS_LOADING,
    REFETCH_POST,
    TOTAL_COUNT
} from './actionType';

export const initialPostState = {
    posts:[],
    isLoading:false,
    isReFetching:false,
    totalCount:0,
}

export const postReducder = (state=initialPostState , action)=>{
    switch (action.type){
        case IS_LOADING:{
            return{
                ...state,
                isLoading:action.payload
            };
        };
        case GET_POSTS:{
            return{
                ...state,
                posts:action.payload
            };
        };
        case TOTAL_COUNT:{
            return{
                ...state,
                totalCount:action.payload
            }
        };
        case REFETCH_POST:{
            return{
                ...state,
                isReFetching:action.payload
            }
        }
        default: return state;
    }
}