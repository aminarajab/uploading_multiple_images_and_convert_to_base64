import { useState } from "react";
import './UploadImage.css'

const MAX_COUNT = 100;
let allFiles = []
let allFilesBinary = []

function UploadImage(){
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [fileLimit, setFileLimit] = useState(false);
    const [myBinary, setMyBinary] = useState('');

    
    const handleUploadFiles = files =>{
        allFiles.push(files);
        const uploaded = [...uploadedFiles];
        let limitExceeded =false;
        files.some((file) =>{
            if(uploaded.findIndex((f)=> f.name ===file.name)=== -1){
                uploaded.push(file);
                if(uploaded.length ===MAX_COUNT) setFileLimit(true);
                if(uploaded.length>MAX_COUNT){
                    alert(`add max of ${MAX_COUNT}`);
                    setFileLimit(false);
                    limitExceeded = true;
                    return true;
                }
            }
        });
        if (!limitExceeded) setUploadedFiles(uploaded)
    }
    const handleFileEvent = (e) =>{
        const chosenFiles = Array.prototype.slice.call(e.target.files)
        handleUploadFiles(chosenFiles);
        showFile();
    }
    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    //convert to Base 64
    async function showFile() {
        const file = document.querySelector('#fileUpload').files[0];
        try {
           const result = await toBase64(file);
           var str = result;
           var arr = str.split(',');
           arr.splice(0, 1);
           let assetImages = {
                       "fileName": `${file.name}`,
                       "fileData" : `${arr.join(',')}`
                   }
           allFilesBinary.push(assetImages);

           console.log(allFilesBinary, "allFilesBinary");

           //set to session if you want to use it on another page
        //    sessionStorage.setItem("allImagesBinary", JSON.stringify(allFilesBinary));
        } 
        catch(error) {
           console.error(error);
           return;
        }
     }
    return(
    <div>
        <h4 style={{marginTop:"100px"}}>How to upload multiple files, display the images and convert to binary</h4>
        <input id='fileUpload' type='file' multiple onChange={handleFileEvent} disabled={fileLimit} accept='image/png'></input>
        <label htmlFor="fileUpload" style={{margin:"10px"}}>
            <span className={`btn btn-dark ${!fileLimit? '': 'disabled'}`}>
                <svg style={{paddingRight:"3px"}} xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-upload" viewBox="0 0 16 16">
                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                    <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"/>
                </svg>
                Upload Images</span>
        </label>
        <div className="uploaded-files-list">
            {uploadedFiles.map((file, index) =>(
                <span key={index} className="m-2">
                    <img  className="uploadedImages" src={URL.createObjectURL(file)} alt={file.name}/>
                </span>
            ))} 
        </div>
    </div>
    );
}
export default UploadImage