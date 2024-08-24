import Footer from "@/components/Footer";
import Header from "@/components/Header";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return <>
  <Header/>
  <script type='text/javascript' src='//pl24143983.cpmrevenuegate.com/61/6b/9f/616b9f5885029a7898d8928637a1ecd0.js'></script>
    <main>
      <Component {...pageProps} />
    </main>
    <Footer/>
  </>
}
