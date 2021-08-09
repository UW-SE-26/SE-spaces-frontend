import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";

import Booked from "./pages/Booked"
import Explore from "./pages/Explore"
import Landing from "./pages/Landing"

import Navbar from "./components/Navbar"

function App() {
  return (
    <div className="App">
      <Navbar />
      <Router>
        <Route exact path="/" component={Landing} />
        <Route exact path="/explore" component={Explore} />
        <Route exact path="/booked" component={Booked} />
      </Router>
    </div>
  );
}

export default App;
