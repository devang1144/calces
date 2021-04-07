import React, { Component } from 'react';
import Navbar from './Navbar';
import banner from '../assets/faq-banner.svg';

class FAQ extends Component {
    render() {
        return (
            <div>
                <Navbar  />
                <div className="row banner-wrapper">
                    <div className="col-md-6">
                       <h1 className="banner-text">FAQs</h1> 
                    </div>
                    <div className="col-md-6">
                        <img className="img banner_img" src={banner} />
                    </div>
                    
                    

                </div>

            </div>
        );
    }
}

export default FAQ;