
import Loader from "@/components/Loader";
import useFetchData from "@/hooks/useFetchData";
import Head from "next/head";
import Link from "next/link";
import { FaEye, FaHeart, FaStar } from "react-icons/fa";
import { SwiperSlide } from "swiper/react";

export default function movies() {
// fetch data
const {alldata,loading} = useFetchData('/api/getmovies');

// filter for publish movies required
const publishedMovies = alldata.filter(movie => movie.status === 'publish');
// filter data by movies
const moviesData = publishedMovies.filter(movie => movie.titlecategory === 'movies')
// console.log(moviesData)

    return <>
        <Head>
            <title>Movies | Flparvez</title>
            <meta name="description" content="All the movies" />
        </Head>
        <section className="genrenamesec">
            <div className="genrename">
                <h1>Movies</h1>
                <p>Exclusive movies Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit adipisci natus unde.</p>

            </div>
        </section>
        <section className="genremoviesec">
            <div className="genremovie">
            
                         {   loading ? <div className="scrollcardssec flex flex-center"> <Loader/> </div> : <>
                         
                         {moviesData.map((movie)=>{
                          return <SwiperSlide  key={movie._id}>
                            <div className="card">
                              <Link href={`/movies/${movie.slug}`}>
                                <div className="cardimg">
                                <img src={movie.smposter} alt={movie.title} loading="lazy" />
                                </div>
                            
                              <div className="contents">
                                <h5>{movie.title}</h5>
                                <h6>
                                  <span>{movie.year}</span>
                                  <div className="rate">
                                    <i className="cardfs"> <FaHeart /> </i>
                                    <i className="cardfs"> <FaEye /> </i>
                                    <i className="cardfs"> <FaStar /> </i>
                                    <h6>{movie.rating}</h6>
                                  </div>
                                </h6>
                                
                              </div>
                              
                              </Link>
                            </div>
                            

                          </SwiperSlide>
                         })}
                         </>}

            </div>
        </section>

    </>
}