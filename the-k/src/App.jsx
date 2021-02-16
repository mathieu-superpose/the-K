import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import 'index.scss';

import Navbar from 'components/Navbar/Navbar';
import Footer from 'components/Footer/Footer';

import Home from 'pages/Home/Home';
import Register from 'pages/Register/Register';
import Login from 'pages/Login/Login';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <main>
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
          </Switch>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
