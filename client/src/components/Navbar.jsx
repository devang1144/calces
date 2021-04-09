import React, { useEffect, useRef , useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { base } from '../base';

import Logo from "../assets/logo.svg";

const Navbar = props => {
    const history = useHistory();


    const handlelogout= async() =>{
        await axios.get(base + '/logout');
        await Cookies.remove("user");
        history.push('/');
    }
    

    
        return (
            <div style={{width:"100%"}}>
                <nav className="navbar navbar-expand-md">
                    <div className="mr-auto position-absolute" style={{ left:"-3rem" }} >
                        <Link to='/'><img src={Logo} className="img img-fluid nav-logo" alt=""/></Link>
                    </div>
                    
                    <div className="collapse navbar-collapse" id="nav__links">
                        <div className="ml-auto navbar-nav" style={{backgroundColor:"", justifyContent:"end", marginLeft:"0"}}>
                            <span className="p-2">Product</span>
                            <span className="p-2">contact</span>
                            {/* <span className="p-2">pricing</span> */}
                            {!Cookies.get('user') && <a href="#signup" style={{textDecoration:"none", paddingTop:"0.5rem"}}><span className="p-2">Signup</span></a>}    
                            {Cookies.get('user') && <span className="ml-0 p-2" onClick={handlelogout}>Logout</span>}
                        </div>
                        
                    </div>
                    
                    <button className="ml-auto navbar-toggler" type="button"
                            data-toggle="collapse"
                            aria-controls="nav__links" aria-expanded="false"
                            aria-label="Toggle navigation">
                            <span className="icon-bar top-bar" style={{ height: "0.4rem" }}></span>
                            <span className="icon-bar middle-bar" style={{ height: "0.4rem" }}></span>
                            <span className="icon-bar bottom-bar" style={{ height: "0.4rem" }}></span>
                        </button>
                </nav>
            </div>
        );
}

export default Navbar;