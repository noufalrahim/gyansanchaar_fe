import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import { ROUTE_URLS } from "./constants"
import { Layout } from "./layout"
import { HomePage } from "./pages/Home"
import { CollegesPage } from "./pages/Colleges"

function App() {
  return (
    <Router>
      <Routes>
        <Route path={ROUTE_URLS.HOME} element={<Layout><HomePage /></Layout>} />
        <Route path={ROUTE_URLS.COLLLEGES} element={<Layout><CollegesPage /></Layout>} />
      </Routes>
    </Router>

  )
}

export default App
