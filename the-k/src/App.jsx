import { BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import 'index.scss';

import Navbar from 'components/Navbar/Navbar';
import Footer from 'components/Footer/Footer';

import Home from 'pages/Home/Home';
import Register from 'pages/Register/Register';
import Login from 'pages/Login/Login';
import Profile from 'pages/Profile/Profile';



const App = () => {
  const hasID = useSelector(state => state);

  const checkAuth = () => {
    return hasID==='' ? false :  true
  }

  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
      checkAuth() ? (
        <Component {...props} />
      ) : (
          <Redirect to={{ pathname: '/login' }} />
        )
    )} />
  )

  return (
    <div className="App">
      <Router>
        <Navbar />
        <main>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <PrivateRoute path="/profile" component={Profile} />
          </Switch>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
