import './App.css'
import useRouterElement from './routes/useRouterElement'

function App() {
  const routeElements = useRouterElement()
  return <>{routeElements}</>
}

export default App
