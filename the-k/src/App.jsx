import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import 'index.scss';

import Navbar from 'components/Navbar/Navbar';
import Footer from 'components/Footer/Footer';

const App = () => {
  return (
    <div className="App">
        <div className="App__block">
          <Router>
            <Navbar />
            <main>
              <Switch>
                <Route path="/" exact>
                  <p>coucou from home</p>
                </Route>
                <Route path="/register">
                  <p>coucou from register</p>
                </Route>
              </Switch>
            </main>
            <Footer />
          </Router>
        </div>
      </div>
  );
}

export default App;
