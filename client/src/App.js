import './App.css';
import Quotes from "./components/Quotes";
import {
  BrowserRouter as Router
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header className="App-header">

        <Router>
          {/* loads only for the base url */}
          {/* <Route exact path="/" component={MainPage} /> */}

          {/* loads anytime App() is laded */}
          <Quotes />
        </Router>

          
      </header>
    </div>
    
  );
}

export default App;
