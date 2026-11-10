import { useReveal } from '../../hooks/useReveal.js'
import Navbar from '../Navbar/Navbar.jsx'
import Hero from '../Hero/Hero.jsx'
import Contents from '../Contents/Contents.jsx'
import About from '../About/About.jsx'
import Team from '../Team/Team.jsx'
import Support from '../Support/Support.jsx'
import Footer from '../Footer/Footer.jsx'
import { ReaderProvider } from '../../reader/ReaderContext.jsx'
import Reader from '../../reader/Reader.jsx'
import './Home.css'

function Home() {
  useReveal()

  return (
    <ReaderProvider>
      <div className="site">
        <Navbar />
        <main>
          <Hero />
          <Contents />
          <About />
          <Team />
          <Support />
        </main>
        <Footer />
      </div>
      <Reader />
    </ReaderProvider>
  )
}

export default Home
