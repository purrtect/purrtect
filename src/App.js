import React from 'react'
import './App.css';
import Navbar from './Components/Navbar';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import Home from './Components/pages/HomePage/Home'
import Footer from './Components/pages/Footer/Footer'
import EditCatPage from "./Components/pages/EditCatPage/EditCatPage"
import MyCatPage from "./Components/pages/MyCatPage/MyCatPage"
import DonatePage from "./Components/pages/DonatePage/DonatePage"
import HistoryPage from "./Components/pages/HistoryPage/HistoryPage"

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/edit-cat' exact component={EditCatPage} />
        <Route path='/my-cat' exact component={MyCatPage} />
        <Route path='/donate' exact component={DonatePage} />
        <Route path='/history' exact component={HistoryPage} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
