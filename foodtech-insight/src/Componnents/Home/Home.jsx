import { useReveal } from '../../hooks/useReveal.js'
import Navbar from '../Navbar/Navbar.jsx'
import Hero from '../Hero/Hero.jsx'
import Contents from '../Contents/Contents.jsx'
import About from '../About/About.jsx'
import Team from '../Team/Team.jsx'
import Footer from '../Footer/Footer.jsx'
import './Home.css'

function Home() {
  useReveal()

  return (
    <div className="site">
      <Navbar />
      <main>
        <Hero />
        <Contents />
        <About />
        <Team />
      </main>
      <Footer />
    </div>
  )
}

export default Home
