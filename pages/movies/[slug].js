import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import useFetchData from '@/hooks/useFetchData';
import { FaBookmark, FaCheck, FaImdb, FaThumbsDown, FaThumbsUp } from 'react-icons/fa';
import { FaShareFromSquare } from 'react-icons/fa6';

export default function moviesPost() {
const router = useRouter();
const {slug} =router.query;


// use hooks
const {alldata,loading} =useFetchData(`/api/getmovies?slug=${slug}`);
const {allmovie} = useFetchData(`/api/getmovies`);
 
// filter publish movies

const publishMovies = alldata.filter(ab => ab.status === 'publish');


    return <>
        <>
            <Head>
                <title>{alldata && alldata[0]?.slug.replaceAll('-',' ')}</title>
            </Head>
          <div>

            <div className="slideimagebx">
                <img src={alldata && alldata[0]?.bgposter} alt="Movie" loading='lazy' />
            </div>
            <div className="mainmoviebx">


                <div className="leftdata">
                    <div className="leftimgbx">
                    <img src={alldata && alldata[0]?.smposter} alt="movie" loading='lazy' />
                    <div className="seenonly">
                        <div className="seenwatch">
                            <button><FaBookmark className='sebtn' />Watchlist</button>
                            <button><FaCheck className='sebtn' />Seen</button>
                            <button><FaThumbsUp className='sebtn' />Like</button>
                            <button><FaThumbsDown className='sebtn' />Dislike</button>
                        </div>

                        <a target='_blank' href={`${alldata && alldata[0]?.watchonline}`}><button className='watchmoviebtn'>Click To Watch Online</button> </a>
                    </div>
                    </div>
                    <div className="rating">
                        <h3>Rating</h3>
                        <div className='rate'> <FaImdb className='faImdb' /> 
                        <h4>{alldata && alldata[0]?.rating}</h4>
                        
                        </div>
                    </div>
                     <div className="rating">
                        <h3>Genre</h3>
                       
                        <h4 className='uppercase'>{alldata && alldata[0]?.genre.join(', ')}</h4>
                        
                        
                        </div>
                   


                        <div className="rating">
                        <h3>Duration</h3>
                       
                        <h4 >{alldata && alldata[0]?.duration}</h4>
                        
                        
                        </div> 
                        
                         <div className="rating">
                        <h3>Quality</h3>
                       
                        <h4 >{alldata && alldata[0]?.quality}</h4>
                        
                        
                        </div>
                    </div>

    <div className="rightdata">
    <div className="movietitle">
        <h1>{alldata && alldata[0]?.slug.replaceAll('-',' ')}</h1>
        <button className='faShareFromSquare'><FaShareFromSquare /></button>
    </div>
    <p className="dpera">
        Download Free Now
    </p>
    <div className="moviedescription">
        <article className='movieinfo'>
            <h3 className='uppercase'>{alldata && alldata[0]?.titlecategory} info :</h3>
            <table>
                <tbody>
                    <tr>
                        <td className='uppercase'>&#9642; {alldata && alldata[0]?.titlecategory} Name :</td>
                        <td>{alldata && alldata[0]?.title}</td>
                    </tr>
                    <tr>
                        <td>&#9642; Release Year:</td>
                        <td>{alldata && alldata[0]?.year}</td>
                    </tr>
                    <tr>
                        <td>&#9642; Genre:</td>
                        <td className='uppercase'>{alldata && alldata[0]?.genre.join(', ')}</td>
                    </tr>

                   <tr>
                        <td>&#9642; Language:</td>
                        <td>{alldata && alldata[0]?.language}</td>
                    </tr>

                  <tr>
                        <td>&#9642; Subtitle:</td>
                        <td>{alldata && alldata[0]?.subtitle}</td>
                    </tr>

                 <tr>
                        <td>&#9642; Size:</td>
                        <td>{alldata && alldata[0]?.size}</td>
                    </tr>


                 <tr>
                        <td>&#9642; Quality:</td>
                        <td>{alldata && alldata[0]?.quality}</td>
                    </tr>


                </tbody>
            </table>
        </article>
        <article>
            <div className='storyline'>
                <h3>Sunopis / Storyline:</h3>
                <p>{alldata && alldata[0]?.description}</p>
            </div>
        </article>
        <section className='downloadsec'>
    <h2>Download Links</h2>
           <div className='downloadlinks'>
                <a target='_blank' href={alldata && alldata[0]?.downloadlink['480p']}>Terabox Download Link</a>
                <a target='_blank' href={alldata && alldata[0]?.downloadlink['720p']}>Direct Download</a>
                
                <Link href={alldata && alldata[0]?.downloadlink['1080p'] || '/fallback-url'}>
                  Direct Link 2
             </Link>
               
           </div>
        </section>
    </div>

    <div className='youtubeiframe'>
        <h3 id='movietrailer' className='uppercase'>{alldata && alldata[0]?.titlecategory} Trailer: </h3>
        <iframe width="100%" height="370" src={alldata && alldata[0]?.ytlink} frameBorder="0"></iframe>
    </div>

    </div>


                    </div>
                </div>
           
        
        </>
    </>
}