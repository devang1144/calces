import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Navbar extends Component {

    state = {

    }

    componentDidMount = async() => {
        
    }
    

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-md d-flex">
                    <div className="menu-button-container" style={{backgroundColor:"", flexGrow:"1", position:"absolute"}}>
                        <h1 onClick={this.toggleHamBurger} className="navbar-menu-button">FAQ</h1>
                    </div>
                    
                    <div className="collapse navbar-collapse" id="nav__links"style={{display:"absolute"}}>
                        <div className="navbar-nav" style={{backgroundColor:"", justifyContent:"end", marginLeft:"0"}}>
                            <div className="d-flex navbar-brand float-right dropdowns-container">
                            </div>
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