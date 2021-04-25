
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
import Query from './components/Query';
import AllQuery from './containers/AllQuery';
import EachQuery from './components/EachQuery';


function App() {

  const [user, setUser] = useState([])

//google analytics api
useEffect(async() => {
  ReactGA.initialize(process.env.REACT_APP_TRACKING_ID)
  ReactGA.pageview(window.location.pathname + window.location.search)
  const uid = Cookie.get('calcesSSID') === undefined ? "" : Cookie.get('calcesSSID')
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
            <Route path="/faq" exact render={(props) => <Faq user={user} {...props} />} />
            <Route path="/faq/:slug" render={(props) => <EachFaq  {...props} user={user} key={props.location.key} />} />
            <Route path="/analysis/saved" exact render={(props) => <Analysis user={user} {...props} />} />
            <Route user={user} path="/ask-a-query" render={(props) => <Query user={user} {...props} />}/>
            <Route path="/all-query" component={AllQuery}/>
            <Route path="/query/:slug" render={props => <EachQuery {...props} key={props.location.key} />}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
