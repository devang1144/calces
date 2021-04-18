
import React, { useEffect, useState } from 'react';
import {BrowserRouter as Router, Switch, Route, withRouter } from 'react-router-dom';
import ReactGA, { initialize } from 'react-ga';
import Cookie from 'js-cookie'

//import scss
import './sass/main.scss'

import Home from './components/Home'
import Dash from './containers/Dash'
import Admin from './admin/Admin'

import Faq from './components/faq'
import EachFaq from './containers/eachFaq';
import Analysis from './components/Analysis'

import axios from './axios-cls'
import { UsbOutlined } from '@material-ui/icons';


function App() {

  const [user, setUser] = useState([])

//google analytics api
useEffect(async() => {
  ReactGA.initialize(process.env.REACT_APP_TRACKING_ID)
  ReactGA.pageview(window.location.pathname + window.location.search)
  const uid = Cookie.get('user') === undefined ? "" : Cookie.get('user')
  const user = await axios.get(`/user/${uid}`)
  setUser(user)

}, [])

  return (
    <div>
      <Router>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route user={user} path="/d" render={(props) => <Dash user={user} {...props} />} />
            <Route path="/admin" component={Admin} />
            <Route path="/faq" exact component={Faq} />
            <Route path="/faq/:slug" render={(props) => <EachFaq  {...props} key={props.location.key} />} />
            <Route path="/analysis/saved" exact component={Analysis} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
