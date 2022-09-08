import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CreatePost from '../createPost/CreatePost';
import "./share.css";
import {PermMedia, Label,Room, EmojiEmotions} from "@mui/icons-material"
import { useContext, useState,useEffect } from "react";
import { AuthContext } from "../../context/authentication/authContext";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  height:600,
};

export default function Share() {
  const {state, dispatch} = useContext(AuthContext)
  const [currentUserName,setCurrentUserName] = useState("")
  const [isModelOpen, setModelOpen] = useState(false)
  const [isModelClose, setModelClose] = useState(false)
  useEffect(()=>{
    if(state.user.username !== ""){
      //MAKING FIRST LETTER CAPITAL
      console.log("state user",state.user)
      const name = state.user?.username.charAt(0).toUpperCase() + state.user.username.slice(1)
      setCurrentUserName(name)
    }
  },[])
console.log("state",state)
console.log("currentUserName",currentUserName)

const handleOpen = ()=>{
  setModelOpen(true)
}
const handleClose = ()=>{
  setModelOpen(false)
}

  return (
    <>
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img className="shareProfileImg" src="/assets/person/1.jpeg" alt="" />
          <input
            // placeholder="What's in your mind Safak?"
            placeholder={`What's in your mind ${currentUserName}?`}
            className="shareInput"
          />
        </div>
        <hr className="shareHr"/>
        <div className="shareBottom">
            <div className="shareOptions">
                <div className="shareOption">
                <Button onClick={handleOpen}>
                    <PermMedia htmlColor="tomato" className="shareIcon"/>
                    <span className="shareOptionText">Photo or Video</span>
                    </Button>
                </div>
                <div className="shareOption">
                    <Label htmlColor="blue" className="shareIcon"/>
                    <span className="shareOptionText">Tag</span>
                </div>
                <div className="shareOption">
                    <Room htmlColor="green" className="shareIcon"/>
                    <span className="shareOptionText">Location</span>
                </div>
                <div className="shareOption">
                    <EmojiEmotions htmlColor="goldenrod" className="shareIcon"/>
                    <span className="shareOptionText">Feelings</span>
                </div>
            </div>
            <button className="shareButton">Share</button>
        </div>
      </div>
    </div>

    <Modal
    open={isModelOpen}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
      <CreatePost/>
      </Box>
      
    </Modal>
    </>
  );
}
