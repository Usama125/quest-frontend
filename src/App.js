import Login from './pages/shared/Login'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom"
import RootContext from "./contextApi/index"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './assets/css/style.css'
import PublicRoute from './ProtectedRoutes/PublicRoute'
import AdminRouter from './pages/Admin'

function App() {
  return (
    <>
      <RootContext>
        <Router>
          <Switch>
            <Route path="/admin" component={AdminRouter} />
            <PublicRoute exact path="/login" component={Login} />
            <Route path="/">
              <Redirect to="/login" />
            </Route>
          </Switch>
        </Router>
        <ToastContainer />
      </RootContext>
    </>
  )
}

export default App
