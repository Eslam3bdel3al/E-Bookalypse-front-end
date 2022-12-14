import React from 'react';
import { FaRegUserCircle } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';
import { TbBooks } from 'react-icons/tb';
import { MdFavoriteBorder } from 'react-icons/md';
import { BiLogOut } from 'react-icons/bi';
import styles from './ProfileDropDown.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {  logOut } from "../../store/reducers/authReducer/authReducer";
import { AiOutlineDashboard } from 'react-icons/ai';

function ProfileDropDown(props) {

    const theme = useSelector((state) => state.theme.currentTheme);
    let dispatch = useDispatch();
    let navigate = useNavigate();

    const Logout = ()=>{
        dispatch(logOut())
        navigate('/login')
    }

    return (
        <div className='position-relative'>
            <ul className={theme === "night" ? `${styles.listGroupNight} border border-dark` : `${styles.listGroup} border`}>
                <Link to='/profile' className={`text-decoration-none`}><li className={theme === "night" ? `${styles.listItemNight} border-bottom border-dark` : `${styles.listItem} border-bottom`}><FaRegUserCircle className={styles.listIcon} /> Profile</li></Link>
                <Link to='/editprofile' className={`text-decoration-none`}><li className={theme === "night" ? `${styles.listItemNight} border-bottom border-dark` : `${styles.listItem} border-bottom`}><FiEdit className={styles.listIcon} /> Edit Profile</li></Link>
                {props.authState !== 'regUser' ? 
                    <Link to='/admin' className={`text-decoration-none`}><li className={theme === "night" ? `${styles.listItemNight} border-bottom border-dark` : `${styles.listItem} border-bottom`}><AiOutlineDashboard className={styles.listIcon} /> Dashboard</li></Link>

                : 
                <>
                    <Link to='/profile/bookshelf' className={`text-decoration-none`}><li className={theme === "night" ? `${styles.listItemNight} border-bottom border-dark` : `${styles.listItem} border-bottom`}><TbBooks className={styles.listIcon} /> Bookshelf</li></Link>
                    <Link to='/wishlist' className={`text-decoration-none`}><li className={theme === "night" ? `${styles.listItemNight} border-bottom border-dark` : `${styles.listItem} border-bottom`}><MdFavoriteBorder className={styles.listIcon} /> Wishlist</li></Link>
                
                </>
                }
                <li onClick={()=>Logout()}  className={theme === "night" ? styles.listItemNight : styles.listItem}><BiLogOut className={styles.listIcon} /> Logout</li>
            </ul>
        </div>
    )
}

export default ProfileDropDown