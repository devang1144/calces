import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { base } from '../base';

class NavbarDash extends Component {

    state = {
        showUtils : false
    }

    componentDidMount () {
        document.addEventListener('click', this.handleClickOutside, true);
    }

    componentWillUnmount = () => {
        document.removeEventListener('click', this.handleClickOutside, true);
    }
    
    handleClickOutside = e => {
        if ( this.userUtilRef.current && !this.userUtilRef.current.contains(e.target) ) {
            this.setState({ showUtils : false })
        }
    }

    handlelogout= async() =>{
        await axios.get(base + '/logout');
        await Cookies.remove("user");
        if (Cookies.get('calcesSSID') === undefined) return <Redirect to="/" />
    }

    triggerUserUtils = () => {
        this.setState({ showUtils : !this.state.showUtils })
    }

    userUtilRef = React.createRef()
    
    render() {
        const name = this.props.user.data === undefined ? null : this.props.user.data.name
        console.log(this.props.user)
        return (
            <div style={{width:"100%"}}>
                <nav className="navbar navbar-expand-md">
                    <div className="collapse navbar-collapse" id="nav__links">
                        <div className="ml-auto navbar-nav" style={{backgroundColor:"", justifyContent:"end", marginLeft:"0"}}>
                            <span className="p-2" onClick={this.triggerUserUtils}>{name}</span>
                            {this.state.showUtils && <div ref={this.userUtilRef} className="user-utils">
                                <ul className="user-utils-ul">
                                    <Link to="/"><li>View saved analysis</li></Link>
                                    <Link to="/ask-a-query"><li>Ask a query</li></Link>
                                    <Link to="/faq"><li>FAQ</li></Link>
                                    <li onClick={this.handlelogout}>logout</li>
                                </ul>
                            </div>  } 
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
}

export default NavbarDash;