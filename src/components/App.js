import Signup from "./Signup";
import {Container} from 'react-bootstrap';
import {AuthProvider} from '../contexts/AuthContext';
import Dashboard from "./Dashboard";
import PrivateRoute from "./PrivateRoute";
import LogIn from './Login';
import ForgotPassword from "./ForgotPassword";
import UpdatePassword from "./UpdateAccount";
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom'

function App() {
  return(
     <Container className="d-flex align-items-center justify-content-center mt-2" style={{minHeight:"100vh"}}>
     <div className="w-100" style={{maxWidth:"400px"}}>
      <Router>
        <AuthProvider>
          <Switch>
            <PrivateRoute exact path="/" component={Dashboard}/>
            <Route path="/signup" component={Signup}/>
            <Route path="/login" component={LogIn}/>
            <Route path="/forgotpassword" component={ForgotPassword}/>
            <PrivateRoute path="/updateaccount" component={UpdatePassword}/>
          </Switch>
        </AuthProvider>
      </Router>
     </div>
    </Container>
  )
}

export default App;
