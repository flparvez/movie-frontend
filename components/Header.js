import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import {IoClose} from 'react-icons/io5'
import {BiSearch} from 'react-icons/bi'
import {FaBars, FaStar} from 'react-icons/fa'
import useFetchData from '@/hooks/useFetchData';
export default function Header() {


    // navbar header component scroll sticky
    useEffect(() => {
        const hadnleScroll =()=>{
            const header = document.querySelector('nav')
            header.classList.toggle('sticky', window.scrollY > 0);
        }
        window.addEventListener('scroll',hadnleScroll);

        return ()=>{
            window.removeEventListener('scroll',hadnleScroll);
        }
    }, []);

    const router = useRouter();
// function for navlist items page routing active status
    const [clicked,setClicked]=useState(false)
    const [navbar,setNavbar] =useState(false);
    const [searchbar,setSearchbar] =useState(false);
    const [activeLink,setActiveLink] =useState('/');

const hadnleClick = ()=>{
    setClicked(!clicked)
}
const handleLinkClick = (link)=>{
    setActiveLink(link)
    setClicked(false)
}

useEffect(() => {
    
    setActiveLink(router.pathname)
}, [router.pathname]);

// navbar
const handleNavbarOpen =()=>{
    setNavbar(!navbar)
}
const handleNavbarClose =()=>{
    setNavbar(false)
}

// searchbar
const handleSearchbarOpen =()=>{
    setSearchbar(!searchbar)
    
}
const handleSearchbarClose =()=>{
    setSearchbar(false)
}



            //  search function by title of the movie

            const [movieShortName,setMovieShortName] =useState('')
            const [searchResult,setSearchResult]=useState(null)

            const [error, setError] = useState(null);
            // fetch data from api

            const {alldata,loading} =useFetchData(`/api/getmovies`)

            // filter for published movies
            const publishedMovies = alldata.filter(movie => movie.status === 'publish')
            // function to handle search

            useEffect(() => {
            if (!movieShortName.trim()) {
                setSearchResult([]);
                return;
            }    
            const filteredMovie = publishedMovies.filter(movie => movie.title.toLowerCase().includes(movieShortName.toLowerCase()))

            setSearchResult(filteredMovie);
           

            }, [movieShortName]);
            
                // handle MovieCLick
                const handleMovieClick = () => {
                    setMovieShortName('');
                    setSearchbar(false)
                }

            // handle search bar

            const searchRef =useRef(null)
            // function for when click outside of search bar
            
            const handleOutsideClick = (event) => {
                if (searchRef.current &&!searchRef.current.contains(event.target)) {
                    setMovieShortName('')
                    setSearchbar(false)
                }
            }
            useEffect(() => {
                document.addEventListener('mousedown',handleOutsideClick);
                return () => {
                    document.removeEventListener('mousedown', handleOutsideClick);
                };
            }, []);




  return (
    <>
      <nav className="header">
           <Link href="/"> <h1 className="logo" data-text="&nbsp;Flpmovies&nbsp;" > &nbsp;Flpmovies&nbsp;</h1> </Link>
            <form className={searchbar ? "search_bar active" : "search_bar"}>
                <input type="text" placeholder="search movies" value={movieShortName} onChange={(e)=> setMovieShortName(e.target.value)} />
                <div className="searchclose" onClick={handleSearchbarClose}>
                    <IoClose />
                </div>
                {
                    movieShortName && (
                        <div className='search_results'>
                            <h2>---:Search Result:----</h2>
                            <ul>
                                {searchResult.length > 0 ?(
                                   searchResult.slice(0,20).map((movie)=>(
                                    <Link  key={movie._id} href={`/movies/${movie.slug}`} onClick={handleMovieClick} >
                                        
                                    <div className='moviesearchlist'>
                                    <div>
                                        <img src={movie.smposter} alt="image" width={80} height={110} />
                                    </div>
                                    <div className="searchbarinfo">
                                        <h5>{movie.title}</h5>
                                        <h4>Rating: <FaStar /><span>{movie.rating}</span> </h4>
                                        <h4>Release Year: {movie.year}</h4>
                                        <p>Category : {movie.category}</p>
                                    </div>
                                    </div>

                                 </Link> 
                                   ))
                                ) : (
                                    <p>No Movie Found </p>
                                )}
                            </ul>
                        </div>
                    )
                }

            </form>
            {/* for mobile device */}
            <div id={navbar ? "navbaractive" : "navbar"}>
                <div className="navlogomovie">
                <h1 className="logo" data-text="&nbsp;Makmovies&nbsp;" > <a href=""></a>&nbsp;Makmovies&nbsp;</h1>
            
            <div className="navclosesvg" onClick={handleNavbarClose} > <IoClose /> </div>
                </div>
                <ul className={clicked ? "navbar active" :"navbar"} onClick={handleNavbarClose}>
                    <li> <Link href='/' className={activeLink ==="/" ? 'active' : ''} onClick={() => hadnleClick('/')} >Home </Link> </li>
                    <li> <Link href='/movies' className={activeLink ==="/movies" ? 'active' : ''} onClick={() => hadnleClick('/movies')} >Movies </Link> </li>

                    <li> <Link href='/bollywood' className={activeLink ==="/bollywood" ? 'active' : ''} onClick={() => hadnleClick('/bollywood')} >Bollywood </Link>
                    
                     </li>  <li> <Link href='/bangla' className={activeLink ==="/bangla" ? 'active' : ''} onClick={() => hadnleClick('/bangla')} >Bangla </Link> </li>

  <li> <Link href='/series' className={activeLink ==="/series" ? 'active' : ''} onClick={() => hadnleClick('/series')} >Series </Link> </li>
  <li> <Link href='/contact' className={activeLink ==="/contact" ? 'active' : ''} onClick={() => hadnleClick('/contact')} >Contact </Link> </li>



                </ul>

            </div>
 
                <div className='mobile'>
                    <BiSearch className='opensearchsvg' onClick={handleSearchbarOpen} />
                    <FaBars onClick={handleNavbarOpen} />


                </div>
      </nav>
    </>
  );
}
