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
                <p>coucou from app switch</p>
              </Switch>
            </main>
            <Footer />
          </Router>
        </div>
      </div>
  );
}

export default App;
