import React, { useState } from 'react'
import classes from './CustomerReviews.module.css'
import { AiFillStar } from 'react-icons/ai'
import Comment from './Comment/Comment'
import { useSelector } from 'react-redux'


const CustomerReviews = props => {
    const {reviews} = props
    console.log(reviews)
    const theme = useSelector((state) => state.theme.currentTheme);
    const [profileImage,setProfileImage] = useState()
    return (
        <div className={`col-12`}>
            <div className={classes.CustomerReview}>
                {/*here will lie the comment input component*/}
                <h2 className={classes.title}>Customer Reviews</h2>
                <div className={`row`}>
                    <div className={`col-12 ${theme === "night" ? classes.ReviewBriefNight : classes.ReviewBrief}`}>
                        <div className={`row`}>
                           
                            <div className={`col-md-3 col-sm-12 ${classes.FullRate}`}>
                                <h3><span className={classes.RateResult}>{props.rate}</span>out of 5</h3>
                                <div className={classes.stars}>
                                        {((x) => {
                                        let starsArr = [];
                                        for (var i = 1; i <= 5; i++)
                                        {
                                            if (i <= x)
                                            {
                                                starsArr.push(<span style={{ color: "#FBAC04" }}><AiFillStar /></span>);
                                            }
                                            else
                                            {
                                                starsArr.push(<span style={{ color: "#D0CBCB" }}><AiFillStar /></span>);
                                            }
                                        }
                                        return (starsArr);
                                    })(Math.floor(props.rate))}
                                </div>
                            </div>

                            
                            <div className={`col-md-5 col-sm-12 ${classes.RateDesc}`}>
                                <p>{props.rateDesc}</p>
                            </div>


                            <div className={`col-md-4 col-sm-12 ${classes.RateDetails}`}>
                                <div className={classes.RateDetInfo} style={{ width: "100%",display:"flex" }}>
                                    <span style={{ display: "inline-block" }} className="sr-only"><AiFillStar/></span>
                                    <span style={{display:"inline-block"}} className={`sr-only ${theme === "night" ? "text-light" : "text-dark"}`}>5</span>
                                    <div className="progress" style={{width:"80%",height:"10px"}}>
                                        <div className="progress-bar" role="progressbar" aria-valuenow={props.fivePerc}
                                        aria-valuemin="0" aria-valuemax="100" style={{width:props.fivePerc+"%",backgroundColor:"#8D27AE"}}>  
                                        </div>
                                    </div>
                                    <span style={{display:"inline-block"}} className={`sr-only ${theme === "night" ? "text-light" : "text-dark"}`}>{props.fivePerc}%</span>
                                </div>
                                <div className={classes.RateDetInfo} style={{ width: "100%",display:"flex" }}>
                                    <span style={{ display: "inline-block" }} className="sr-only"><AiFillStar/></span>
                                    <span style={{display:"inline-block"}} className={`sr-only ${theme === "night" ? "text-light" : "text-dark"}`}>4</span>
                                    <div className="progress" style={{width:"80%",height:"10px"}}>
                                        <div className="progress-bar" role="progressbar" aria-valuenow={props.fourPerc}
                                        aria-valuemin="0" aria-valuemax="100" style={{width:props.fourPerc+"%",backgroundColor:"#8D27AE"}}>  
                                        </div>
                                    </div>
                                    <span style={{display:"inline-block"}} className={`sr-only ${theme === "night" ? "text-light" : "text-dark"}`}>{props.fourPerc}%</span>
                                </div>
                                <div className={classes.RateDetInfo} style={{ width: "100%",display:"flex" }}>
                                    <span style={{ display: "inline-block" }} className="sr-only"><AiFillStar/></span>
                                    <span style={{display:"inline-block"}} className={`sr-only ${theme === "night" ? "text-light" : "text-dark"}`}>3</span>
                                    <div className="progress" style={{width:"80%",height:"10px"}}>
                                        <div className="progress-bar" role="progressbar" aria-valuenow={props.threePerc}
                                        aria-valuemin="0" aria-valuemax="100" style={{width:props.threePerc+"%",backgroundColor:"#8D27AE"}}>  
                                        </div>
                                    </div>
                                    <span style={{display:"inline-block"}} className={`sr-only ${theme === "night" ? "text-light" : "text-dark"}`}>{props.threePerc}%</span>
                                </div>
                                <div className={classes.RateDetInfo} style={{ width: "100%",display:"flex" }}>
                                    <span style={{ display: "inline-block" }} className="sr-only"><AiFillStar/></span>
                                    <span style={{display:"inline-block"}} className={`sr-only ${theme === "night" ? "text-light" : "text-dark"}`}>2</span>
                                    <div className="progress" style={{width:"80%",height:"10px"}}>
                                        <div className="progress-bar" role="progressbar" aria-valuenow={props.twoPerc}
                                        aria-valuemin="0" aria-valuemax="100" style={{width:props.twoPerc+"%",backgroundColor:"#8D27AE"}}>  
                                        </div>
                                    </div>
                                    <span style={{display:"inline-block"}} className={`sr-only ${theme === "night" ? "text-light" : "text-dark"}`}>{props.twoPerc}%</span>
                                </div>
                                <div className={classes.RateDetInfo} style={{ width: "100%",display:"flex" }}>
                                    <span style={{ display: "inline-block" }} className="sr-only"><AiFillStar/></span>
                                    <span style={{display:"inline-block"}} className={`sr-only ${theme === "night" ? "text-light" : "text-dark"}`}>1</span>
                                    <div className="progress" style={{width:"80%",height:"10px"}}>
                                        <div className="progress-bar" role="progressbar" aria-valuenow={props.onePerc}
                                        aria-valuemin="0" aria-valuemax="100" style={{width:props.onePerc+"%",backgroundColor:"#8D27AE"}}>  
                                        </div>
                                    </div>
                                    <span style={{display:"inline-block"}} className={`sr-only ${theme === "night" ? "text-light" : "text-dark"}`}>{props.onePerc}%</span>
                                </div>
                            </div>


                        </div>
                    </div>
                    {reviews ? reviews.map((review)=>{
                      
                                return(
                                    
                                    <div className={`col-12`}  key={review._id}>
                                        <div className={`row`}>
                                            
                                            <Comment 
                                             key={review._id}
                                             reviewID={review._id}
                                            commentDesc={review.comment ? review.comment : null} 
                                            commentRate={review.vote ? review.vote : null} 
                                            commentDate={review.review_date.split('T')[0]}
                                            userCommenterID = {review.user_id._id}
                                            userCommenterName = {review.user_id.userName}
                                            userImage={review.user_id.image}
                                            loggedInUser={props.user}
                                            />
                                        
                                        </div>
                                    </div>
                                )
                            }
                            ): null}
                </div>
            </div>
        </div>
    )
}
export default CustomerReviews;