import { getDownloadURL, ref } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import storage from '../../Firebase/firebaseImage';
import { booksApi } from '../../store/services';

// CSS Module
import styles from './UserCard.module.css';

function UserCard(props) {
    const {user} = props
    const theme = useSelector((state) => state.theme.currentTheme);
    const getCartItems = booksApi.useGetCartQuery()
    const [cartCount,setCartCount] = useState()
    const getWishListItems = booksApi.useGetWishListQuery()
    const [wishListCount,setWishListCount] = useState()
    const [profileImg,setProfileImg] = useState()
    useEffect(()=>{
        if(getCartItems.data){
            setCartCount(getCartItems.data.cart.bookItems.length + getCartItems.data.cart.collectionItems.length)
        }
        if(getWishListItems.data){
            setWishListCount(getWishListItems.data.wishList.bookItems.length + getWishListItems.data.wishList.collectionItems.length)
        }
        const starsRef = ref(storage, `/uploads/users/${user.image}`);
         getDownloadURL(starsRef).then( (url)=>{
  
            
          setProfileImg(url)
          
        }).catch((error) => {console.log(error)});

    },[getCartItems.data,getWishListItems.data])
    return (
        <div className={`${styles.profileCard4} ${styles.zDepth3}`}>
            <div className={`card ${theme === "night" ? "bg-dark" : ""}`}>
                <div className={`${styles.cardBody} rounded-top ${styles.mov}`}>

                    <div className={styles.userBox}>
                        <img src={profileImg} alt="user avatar" />
                    </div>
                    <h5 className={`mb-1 text-lg-center text-white ${styles.wrong} ${styles.h5} `}>{user.fName}</h5>
                    <h5 className={`text-light  text-lg-center ${styles.h5} ${styles.username}`}>@{user.userName}</h5>
                </div>

                <div className={styles.cardBody}>
                    <ul className={`list-group shadow-none rounded-0`}>
                        <li className={`list-group-item ${theme === "night" ? "list-group-item-dark" : ""} ${styles.content}`}>
                            <div className={styles.listIcon}>
                                <i className="fa fa-phone-square"></i>
                            </div>
                            <div className={styles.listDetails}>
                                <span>{user.phone}</span>
                                <small>Mobile Number</small>
                            </div>
                        </li>

                        <li className={`list-group-item ${theme === "night" ? "list-group-item-dark" : ""} ${styles.content}`}>
                            <div className={styles.listicon}>
                                <i className="fa fa-envelope"></i>
                            </div>
                            <div className={styles.listDetails}>
                                <span>{user.email}</span>
                                <small>Email Address</small>
                            </div>
                        </li>

                        <li className={`list-group-item ${theme === "night" ? "list-group-item-dark" : ""} ${styles.content}`}>
                            <div className={styles.listicon}>
                                <i className="fa fa-globe"></i>
                            </div>
                            <div className={styles.listDetails}>
                                <span>{user.city}</span>
                                <small>City</small>
                            </div>
                        </li>
                    </ul>

                    <div className="row text-center mt-4 rounded-0">
                        <div className="col p-2">
                            <h4 className={`mb-1 line-height-5 ${theme === "night" ? styles.lightTxt : ""}`}>40</h4>
                            <small className={`mb-0 font-weight-bold ${styles.mov2}`}>Books</small>
                        </div>

                        <div className="col p-2">
                            <h4 className={`mb-1 line-height-5 ${theme === "night" ? styles.lightTxt : ""}`}>{wishListCount}</h4>
                            <small className={`mb-0 font-weight-bold ${styles.mov2}`}>WishList</small>
                        </div>
                        
                        <div className="col p-2">
                            <h4 className={`mb-1 line-height-5 ${theme === "night" ? styles.lightTxt : ""}`}>{cartCount}</h4>
                            <small className={`mb-0 font-weight-bold ${styles.mov2}`}>Cart</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserCard