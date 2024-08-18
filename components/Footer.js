import Link from "next/link"

const Footer = () => {
    return (
        <>
            <footer className='footer'>
                <section className="m-auto footersec">
                    <div className="fcontent">
                    <div className="flogo">
                        <h1> <Link href="/">Flpmovies</Link> </h1>
                    </div>
                    <div className="quicklink">
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="/movies">Movies</Link></li>
                        <li><Link href="/series">Series</Link></li>

                        </div>

                    </div>
                    <div className="copyright">
                        <p>Copyright &copy; 2024 All rights reserved | by&nbsp;<Link href='/'>Parvez</Link> </p>
                    </div>
                    <div className="fperasec">
                        <p>Disclaimer :- we Does not host any files in this servers.All files or content hosted on third party website. We Just index those links which are already available in internet.</p>
                    </div>
                </section>
            </footer>
        </>
    )
}

export default Footer