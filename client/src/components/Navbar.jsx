import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Logo from "../assets/logo.svg"

class Navbar extends Component {

    state = {

    }

    componentDidMount = async() => {
        
    }
    

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-md">
                    <div className="mr-auto position-absolute" style={{ left:"-3rem" }} >
                        <img src={Logo} className="img img-fluid nav-logo" alt=""/>
                    </div>
                    
                    <div className="collapse navbar-collapse" id="nav__links">
                        <div className="ml-auto navbar-nav" style={{backgroundColor:"", justifyContent:"end", marginLeft:"0"}}>
                            <span className="p-2">Product</span>
                            <span className="p-2">contact</span>
                            {/* <span className="p-2">pricing</span> */}
                            <span className="p-2">Signup</span>
                        </div>
                        
                    </div>
                    
                    <button onClick={this.toggleSideBar} className="ml-auto navbar-toggler" type="button"
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
}

export default Navbar;