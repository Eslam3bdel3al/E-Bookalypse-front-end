import { getDownloadURL, ref } from 'firebase/storage'
import React, { useEffect, useState } from 'react'
import storage from '../../Firebase/firebaseImage'
import dashstyle from '../../assetsAdmin/css/style.module.css'

const AdminComponent = (props) => {
    const {admin}= props
    const [image,setImage] = useState()
    useEffect(()=>{
        const starsRef = ref(storage, `/uploads/users/${admin.image}`);
        getDownloadURL(starsRef).then( (url)=>{
            setImage(url)  
          // console.log(url)
        }).catch((error) => {console.log(error)});
        
           
    },[])
  return (
    <div className={`${dashstyle.previewItem} border-bottom`}>
    <div className={`${dashstyle.previewThumbnail}`}>
      {/* <div className="preview-icon bg-primary">
        <i className="mdi mdi-file-document"></i> */}
        <img src={image} alt="" />
      {/* </div> */}
    </div>
  <div className={`${dashstyle.previewItemContent} d-sm-flex flex-grow`}>
      <div className="flex-grow">
        <h6 className={`${dashstyle.previewSubject} text-white`}>{admin.fName + " " + admin.lName}</h6>
        <p className=" mb-0 text-success font-weight-bold">{admin.role}</p>
      </div>
      {/* <div className="mr-auto text-sm-right pt-2 pt-sm-0">
        <p className="text-muted">15 minutes ago</p>
        <p className="text-muted mb-0">30 tasks, 5 issues </p>
      </div> */}
    </div>
  </div>
  )
}

export default AdminComponent