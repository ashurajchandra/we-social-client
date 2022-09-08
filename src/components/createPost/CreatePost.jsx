import { useState,useRef,useEffect } from "react";
import Dropzone from 'react-dropzone';
import "./CreatePost.css";


export default function CreatePost() {
    const dropZoneRef = useRef(null);
    const [postDescription, setPostDescription] = useState("")
    const [acceptedFilesList, setAcceptedFilesList] = useState("")
    const [dropZone, setDropZone] = useState(false)
console.log("acceptedFilesList",acceptedFilesList)
    // const {getRootProps, getInputProps, open, acceptedFiles} = useDropzone({
    //     // Disable click and keydown behavior
    //     noClick: true,
    //     noKeyboard: true
    //   });

    // useEffect(() => {
    //     window.addEventListener('click', handler)
    //     return () => window.removeEventListener('click', handler)
    // }, []);

    // const handler = (event) => {
    //     if (!dropZoneRef.current?.contains(event.target) && event.target.innerText !== 'Upload') {
    //         // props.closeFileZone();
    //     }
    // }
    const handleInputChange = (e)=>{
        setPostDescription(e.tareget.value)
    }

    const acceptedIncomingFiles = (acceptedFiles,rejectedFiles)=>{
     setAcceptedFilesList(acceptedFiles);

     if (rejectedFiles && rejectedFiles.length > 0) {
        if (rejectedFiles.length > 1) {
            alert("Maximum 1 file can be uploaded at a time");
        }
    }
}

//     const renderDropZone = ()=>{
//         <Dropzone onDrop={(files, rejectedFiles )=>{acceptedIncomingFiles(files, rejectedFiles)} }
//         disabled={false}
//         maxFiles={1}
//         maxSize={50*1024*1024} //50mb
//         accept="image/*"
//         minSize={1024}
//         >
//      {({ getRootProps, getInputProps }) => (
//           <div {...getRootProps({ className: "dropzone" })}>
//             <input {...getInputProps()} />
//             <p>Drag'n'drop images, or click to select files</p>
//           </div>
//         )}
// </Dropzone>
//     }
const handleUpload=()=>{
    
}

    return ( <>
    <div>
     <div>   
        <input 
          value={postDescription} 
          onChange={handleInputChange} 
          placeholder="What's in your mind username" 
          name="postDescription"
          />
          <div>
          <button onClick={(e)=>setDropZone(true)}>
            Add photos
          </button>
          <Dropzone onDrop={(files, rejectedFiles )=>{acceptedIncomingFiles(files, rejectedFiles)} }
        disabled={false}
        maxFiles={1}
        maxSize={50*1024*1024} //50mb
        accept="image/*"
        minSize={1024}
        >
     {({ getRootProps, getInputProps }) => (
          <div {...getRootProps({ className: "dropzone" })}>
            <input {...getInputProps()} />
            <p>Drag'n'drop images, or click to select files</p>
          </div>
        )}
</Dropzone>
          </div>
          </div>
          <button onClick={handleUpload}>
             Post
          </button>
 
    </div> 
    {/* {dropZone?renderDropZone():null} */}
    {/* {renderDropZone()} */}
    </>
    );
}

