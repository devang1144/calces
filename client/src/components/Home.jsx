import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import axios, {base} from '../axios-cls';
import {Link, Redirect} from 'react-router-dom';
import Cookies from 'js-cookie';

import Footer from './Footer';
import Navbar from './Navbar'
import homeImg from '../assets/home-top-img.svg'
import homeImg2 from '../assets/home-img-2.svg'
import homeImg3 from '../assets/home-img-3.svg'

import AnalysisTemp from '../common/analysisTemp.jsx'
class Home extends Component {
    render() {
        if(Cookies.get("calcesSSID")!=undefined){
            return <Redirect to='/d'></Redirect>
        }
        return (
            <div className="container-fluid p-0">
                <Navbar/>
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
                <div className="row no-gutters h-2 d-flex justify-content-center">
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
                <div className="row no-gutters d-flex justify-content-center h-3">
                    <div className="col-md-5 h-3-s-1">
                        <h3>Visualize gear involutes in a better way</h3>
                        <h4>Detailed step by step explanation of involute formation, focusing on how they are formed.</h4>
                        <button>Learn more</button>
                    </div>
                    <div className="col-md-4 h-3-s-2">
                        <img src={homeImg3} className="img img-fluid h-3-i" alt=""/>
                    </div>
                </div>
                <div className="analysis-container_temp">
                    <h3 className="text-center h-4-heading">A comfortable interface for your needs</h3>
                    <AnalysisTemp/>
                </div>
                    
                    <div className="login-buttons d-flex justify-content-center align-items-center" id="signup">
                        <a href={base + 'google/login'} ><Button variant="contained"  className="mt-5 l-b" >Countinue with Google</Button></a>
                        <a href={base + 'facebook/login'}><Button variant="contained" className="ml-5 mt-5 l-b" >Countinue with Facebook</Button></a>
                    </div>
                    <Footer />
            </div>
            
        );
    }
}

export default Home;