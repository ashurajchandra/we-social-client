import "./post.css";
import moment from 'moment';
import InfiniteScroll from 'react-infinite-scroll-component';
import { MoreVert } from "@mui/icons-material";
import { Users } from "../../dummyData";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authentication/authContext";
import { setIsLoading ,setRefetchPost} from "../../context/postContext/action";
import { deletePostItem, fetchPosts,updatePost } from "../../services/api";
import { PostContext } from "../../context/postContext/postContext";

export default function Post({  setPage }) {
  const {state, dispatch} = useContext(AuthContext)
  const {postsState, postsDispatch} = useContext(PostContext)
  //const [like,setLike] = useState(post?.like) //do later
  const [like,setLike] = useState("")
  const [isLiked,setIsLiked] = useState(false)
  const [username, SetUserName] = useState(null)
  const [editPostText,setEditPostText] = useState("");
  const [isEditing, setIsEditing]= useState(false);
  const[posts, setPosts] = useState([]);
const [isPopup,setIsPopup] = useState(false);
const [totalCount, setTotalCount] = useState(0)

console.log("posts",posts)
  const handlePostAction=(e,id)=>{
    setIsPopup(true)
  }


  
  useEffect(()=>{
    setPosts(postsState?.posts)
  },[postsState?.posts])

  useEffect(()=>{
    setTotalCount(postsState?.totalCount)
  })

  // useEffect(()=>{
  //   if(post.user ===state.user.userId){
  //     SetUserName(state.user.username)
  //   }
  // },[])
console.log("editPostText",editPostText)
  const likeHandler =()=>{
    setLike(isLiked ? like-1 : like+1)
    setIsLiked(!isLiked)
  }

  const handleEditPost =(e,post)=>{
    setIsEditing(true)
  const editPost = postsState.posts.filter(item=>item._id===post._id);
  console.log("editPost",editPost);
  console.log("post to edit with id",post._id)
  const postToEdit = editPost[0].desc;
  setEditPostText(postToEdit)

  }

  const handleDeletePost = (e,id)=>{
    //console.log("post with id to delete",id)
         deletingPost(e,id)
  }

  const deletingPost =async(e,id)=>{
    try{
      postsDispatch(setIsLoading(true))
      const response = await deletePostItem(id)
      //console.log("Response of delete post",response);
      if(response.status===200){
        postsDispatch(setRefetchPost(true))
        fetchPosts()
      }
      postsDispatch(setIsLoading(false))

    }catch(err){
      postsDispatch(setIsLoading(false))
      console.log("err while deleting",err.mesage)
    }
  }

  const handleEditPostInput =(e)=>{
    setEditPostText(e.target.value)
  }

  const handleSavePost=(e,post)=>{
    console.log("saving post with id",post)
    post.desc = editPostText
  callingUpdateApi(post._id,editPostText )
  setIsPopup(false)
  }
  const callingUpdateApi=async(id)=>{
    const payload={
      desc:editPostText
    }
    try{
      postsDispatch(setIsLoading(true))
      const responseUpdate= await updatePost(id,payload)
      console.log("responseUpdate",responseUpdate)
      if(responseUpdate.status===200){
       postsDispatch(setIsLoading(false))
       setIsEditing(false)
       fetchPosts()
      } 
    
    }catch(err){
        console.log("error in updating api",err.message)
    }
  }


  const fetchQuery=()=>{
    setPage(prevPage=>prevPage+1)
  }
  return (posts.length>0 ?
    <div>
    {/* <div id="scrollable_list" style={{ height: 600, overflow: "auto" }}> */}
    <div id="scrollable_list" style={{ height: 600, overflow: "auto" }}>
    <InfiniteScroll
      dataLength={posts?.length}
   next={fetchQuery}
   hasMore={posts?.length <= totalCount ? true : false}
   loader={posts?.length === totalCount ? "" : ""} // handle this later
   scrollableTarget="scrollable_list"
    >
      <div >
        {posts.map((post,index)=>{
          return(
            <div className="post" key={index}>
            <div className="postWrapper">
              <div className="postTop">
                <div className="postTopLeft">
                  <img
                    className="postProfileImg"
                    // src={Users.filter((u) => u.id === post?.userId)[0].profilePicture}
                    src={post?.user?.profilePicture}
                    alt=""
                  />
                  <span className="postUsername">
                    {/* {Users.filter((u) => u.id === post?.userId)[0].username} */}
                    {/* {username?username:"not found"} */}
                    {post?.user?.username}
                  </span>
                  <span className="postDate">{ moment(post.createdAt).format('MMMM Do YYYY, h:mm a')}</span>
                </div>
                <div className="postTopRight">
                  <MoreVert onClick = {(e)=>handlePostAction(e,post?.id)} />
                  {isPopup?(<div>
                  {isEditing? <button onClick={(e)=>handleSavePost(e,post)}>save Post</button>: <button onClick={(e)=>handleEditPost(e,post)}>Edit Post</button>} 
                    <button onClick={(e)=>handleDeletePost(e, post?._id)}>Delete Post</button>
                  </div>):null}
                </div>
              </div>
              <div className="postCenter">
                {isEditing? <input value={editPostText} onChange={handleEditPostInput}/>: <span className="postText">{post?.desc}</span>}
                
                <img className="postImg" src={post.image} alt="" />
              </div>
              <div className="postBottom">
                <div className="postBottomLeft">
                  <img className="likeIcon" src="assets/like.png" onClick={likeHandler} alt="" />
                  <img className="likeIcon" src="assets/heart.png" onClick={likeHandler} alt="" />
                  <span className="postLikeCounter">{like} people like it</span>
                </div>
                {/* <div className="postBottomRight">
                  <span className="postCommentText">{post.comment} comments</span>
                </div> */}
              </div>
            </div>
          </div>
          )
        })}
  
    </div>
     </InfiniteScroll>
     </div>
     </div>:"Loading Posts"
  );
}
