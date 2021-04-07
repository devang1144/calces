import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { base } from '../base';
import {Link} from 'react-router-dom'
import homeImg from '../assets/home-top-img.svg'
import homeImg2 from '../assets/home-img-2.svg'

class Home extends Component {
    render() {
        return (
            <div className="container-fluid p-0">
                <div className="row no-gutters h-1 d-flex justify-content-center">
                    <div className="col-md-5 d-flex justify-content-center flex-column h-s-1">
                        <h1>One solution for all messy gear calculations</h1>
                        <h3>The ultimate tool to help you out in your messy calculations, 
                            with everything you need in a streamlined web platform
                        </h3>
                        <button className="h-1-b">Learn more</button>
                    </div>
                    <div className="col-md-5 h-s-2">
                        <img src={homeImg} className="h-1-i img img-fluid" alt=""/>
                    </div>
                </div>
                <div className="row m-0 h-2 d-flex justify-content-center">
                    <div className="col-md-5 ">
                        <img src={homeImg2} className="h-2-i img img-fluid" alt=""/>
                    </div>
                    <div className="col-md-5 d-flex justify-content-center flex-column h-2-s">
                        <h2>START DESIGNING YOUR SHAFTS</h2>
                        <h3>Shaft design is one of the most tedious task :(</h3>
                        <h4>Start with scratch with our embedded solver</h4>
                        <button className="h-2-b">Learn more</button>
                    </div>
                </div>
            </div>
            // <div className="d-flex justify-content-center align-items-center">
            //      <a href={base + 'google/login'} ><Button variant="contained" className="mt-5" >Countinue with Google</Button></a>
            //      <a href={base + 'facebook/login'}><Button variant="contained" className="ml-5 mt-5" >Countinue with Facebook</Button></a>
            // </div>
        );
    }
}

export default Home;