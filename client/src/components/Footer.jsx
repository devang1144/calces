import React, { Component } from 'react';
import Logo from '../assets/logo.svg';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

class Footer extends Component {
    render() {
        return (
            <div className="container-fluid footer-wrapper row m-0">
                <div className="footer-logo-wrapper">
                  <img src={Logo} className="img img-fluid"></img>  
                </div>
               
                <div className="footer-links-wrapper">
                    <Link to="/faq"><span className="footer-links">FAQs</span></Link>
                    <Link to="/queries"><span className="footer-links">Queries</span></Link>
                    {!Cookies.get('calcesSSID') && <a href="#signup"><span className="footer-links">Signup</span></a>}
                </div>
                {Cookies.get('calcesSSID') && <div className="footer-links-wrapper">
                    <Link to='/analysis/saved'><span className="footer-links">Saved Analysis</span></Link>
                    <Link to="/d"><span className="footer-links">Dashboard</span></Link>
                </div>
                } 
                
                
                
            </div>
        );
    }
}

export default Footer;