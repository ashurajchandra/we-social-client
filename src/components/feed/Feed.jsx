import { useContext, useEffect,useState } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import { Posts } from "../../dummyData";
import { PostContext } from "../../context/postContext/postContext";

export default function Feed({setPage}) {
  const {postsState, postsDispatch} = useContext(PostContext)
  // const[posts, setPosts] = useState([]);
  
  // useEffect(()=>{
  //   setPosts(postsState?.posts)
  // },[postsState?.posts])


  return (
    <div className="feed">
      <div className="feedWrapper" id="scrollable_list" style={{ height: 600, overflow: "auto" }}>
      {/* <div className="feedWrapper"> */}
        <Share />
        {/* {Posts.map((p) => (
          <Post key={p.id} post={p} />
        ))} */}
        {/* {posts.length>0 && posts.map((post)=>(
           <Post key={post.id} post={post}  totalPosts = {posts.length} setPage={setPage}/>
        ))} */}
        <Post setPage={setPage}/>
      </div>
    </div>
  );
}
