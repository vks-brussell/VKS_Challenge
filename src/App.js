import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//Components
import Header from "./components/Header";
import Random from "./pages/generateImage";
import ByBreed from "./pages/generateImageByBreed";

function App() {
  return (
    <div className="App">
      <Router>
        <div className="container">
          <Header />
          <Switch>
            <Route exact path="/" component={Random} />
            <Route exact path="/by-breed" component={ByBreed} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
