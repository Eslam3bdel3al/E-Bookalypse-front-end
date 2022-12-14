import React,{useEffect,useState} from 'react'
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import { Swiper, SwiperSlide } from "swiper/react";
import {AiOutlineArrowRight,AiOutlineArrowLeft} from 'react-icons/ai'

import styles from './TrendingBooksUp.module.css';
import { useSelector } from 'react-redux';

import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper";
import { booksApi } from '../../store/services';
import SingleBook from './SingleBook/SingleBook';


const TrendingBooksUp1 = () => {


  const theme = useSelector((state) => state.theme.currentTheme)
  SwiperCore.use([Autoplay])
  // eslint-disable-next-line
  const { data, error, isLoading } = booksApi.useGetAllBooksQuery({salesSort:'htl'})
  const [books,setBooks] = useState()
  const [ images,setImages] = useState([])

  let imagesArr = [...images];

  useEffect(() => {
    if(data){      
      setBooks(data.data)
      data.data.forEach((bookImg)=>{
        imagesArr.push(bookImg.poster)
        setImages(imagesArr)
      })
      
    }            
  }, [data])
    


  return (
    <div className={`container-fluid ${theme === "night" ? "bg-dark" : ""}`}>
    <div className={`container p-5`}>
      <div className={styles.head + " mb-5 "}>
      {/* eslint-disable-next-line */}
        <h5 className={`text-center ${styles.h5}`}>Trending This Week🚀</h5>
      </div>
      <div className={styles.sliderContainer +" container d-flex justify-content-center align-items-center mb-5 "} >
      
        <div  className={" row d-flex justify-content-center align-items-center"} style={{width:"65%"}}>
          
          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={3}
            spaceBetween={50}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 2,
              slideShadows: false,
            }}
            breakpoints={
              {
                  // when window width is >= 320px
                  320: {
                    slidesPerView: 1,
                    spaceBetween: 20
                  },
                  // when window width is >= 480px
                  480: {
                    slidesPerView: 1,
                    spaceBetween: 30
                  },
                  // when window width is >= 640px
                  640: {
                    slidesPerView: 3,
                    spaceBetween: 40
                  }
              }
              
            }
            
            loop={true}
            navigation={{
              nextEl:'.nextTrendBook',
              prevEl: '.prevTrendBook',
            }}
            autoplay={{delay:1000}}
            className={styles.mySwiper}
            >
          {books ? books.map((b,index)=>{
            return(
              <SwiperSlide className='SwiperClasstest' key={index}>    
                    <SingleBook
                            key={b._id}
                            book={b}/>
              </SwiperSlide>
            )
          }): null}

          </Swiper>
          <div className={styles.navControllers}>
                <div className={styles.prevContainer}  >
                  <div className={styles.prevTrendBook + " prevTrendBook "}>
                    <AiOutlineArrowLeft />
                  </div>
                </div>
                <div className={styles.nextContainer} >
                  <div className={styles.nextTrendBook + " nextTrendBook "} >
                    <AiOutlineArrowRight />
                  </div>
                </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default TrendingBooksUp1