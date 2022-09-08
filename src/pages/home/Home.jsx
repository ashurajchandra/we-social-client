import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import "./home.css"
import { useContext, useEffect,useState } from "react";
import { fetchPosts } from "../../services/api";
import { setGetPosts, setIsLoading, setTotalCount } from "../../context/postContext/action";
import { PostContext } from "../../context/postContext/postContext";

export default function Home() {
  const {postsState, postsDispatch} = useContext(PostContext)
  const [posts, setPosts] = useState([]);
  const [page,setPage] = useState(1)

  useEffect(()=>{
   const getAllPosts=async()=>{
    try{
      postsDispatch(setIsLoading(true))
      const postsResponse= await fetchPosts(page)
      console.log("postsResponse",postsResponse)
      if(postsResponse?.data.success){
        // console.log("postsResponse",postsResponse.data.data)
        let responseData = postsResponse.data.data
        const data = page>1? [...postsState?.posts, ...responseData]:[...responseData]
      
        postsDispatch(setGetPosts(data))
        postsDispatch(setTotalCount(postsResponse.data.totalCount))
        postsDispatch(setIsLoading(false))
      }
      // setPosts(posts.data.data)
      
    }catch(err){
      console.log("error in fetching post",err)
      postsDispatch(setIsLoading(false))
    }
  
   } 
   getAllPosts()
  // alert("fetching post for next page")
   //setPosts(getAllPosts)
  },[page])


  console.log("posts",posts)
  console.log("postsState",postsState)
  // useEffect(()=>{
  //   if(posts.length>0){
  //    const postItems= posts.map(post=>post);
  //    console.log("postItems",postItems)
  //   }
  // },[posts])

  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <Sidebar />
        <Feed setPage={setPage} />
        <Rightbar/>
      </div>
    </>
  );
}
