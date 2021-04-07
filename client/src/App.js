
import React, { useEffect } from 'react';
import {BrowserRouter as Router, Switch, Route, withRouter } from 'react-router-dom';
import ReactGA, { initialize } from 'react-ga';

//import scss
import './sass/main.scss'

import Home from './components/Home'
import Dash from './containers/Dash'
import Admin from './admin/Admin'
import FAQ from './components/faq';

import Faq from './components/Faq'

import Navbar from './components/Navbar'
import EachFaq from './containers/eachFaq';


function App() {

//google analytics api
useEffect(() => {
  ReactGA.initialize(process.env.REACT_APP_TRACKING_ID)
  ReactGA.pageview(window.location.pathname + window.location.search)
}, [])

  return (
    <div>
      <Navbar/>
      <Router>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/d" component={Dash} />
            <Route path="/faq" component={FAQ} />
            <Route path="/admin" component={Admin} />
            <Route path="/faq" exact component={Faq} />
            <Route path="/faq/:slug" render={(props) => <EachFaq  {...props} key={props.location.key} />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
