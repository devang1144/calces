import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { base } from '../base';

class Home extends Component {
    render() {
        return (
            <div className="d-flex justify-content-center align-items-center">
                 <a href={base + 'google/login'} ><Button variant="contained" className="mt-5" >Countinue with Google</Button></a>
                 <a href={base + 'facebook/login'}><Button variant="contained" className="ml-5 mt-5" >Countinue with Facebook</Button></a>
                
            </div>
        );
    }
}

export default Home;