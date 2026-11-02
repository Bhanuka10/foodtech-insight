import Home from './Componnents/Home/Home.jsx'

const routeTable = {
  '/': Home,
  '/home': Home,
}

function App() {
  const Page = routeTable[window.location.pathname] ?? Home
  return <Page />
}

export default App
