import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { base } from '../base';

const NavbarDash = (props)=> {
    const history = useHistory();
    const [showUtils,setshowUtils] = useState(false);

    useEffect(()=>{
        document.addEventListener('click', handleClickOutside, true);
    });

   
    const handleClickOutside = e => {
        if ( userUtilRef.current && !userUtilRef.current.contains(e.target) ) {
            setshowUtils( false );
        }
    }

    const handlelogout= async() =>{
        await axios.get(base + '/logout');
        await Cookies.remove("calcesSSID");
        if (Cookies.get('calcesSSID') === undefined) history.push('/');
    }

    const triggerUserUtils = () => {
        setshowUtils( !showUtils );
    }

    const userUtilRef = React.createRef();
    
  
        const name = props.user.data === undefined ? null : props.user.data.name
        // console.log(this.props.user)
        return (
            <div style={{width:"100%"}}>
                <nav className="navbar navbar-expand-md">
                    <div className="collapse navbar-collapse" id="nav__links">
                        <div className="ml-auto navbar-nav" style={{backgroundColor:"", justifyContent:"end", marginLeft:"0"}}>
                            {!Cookies.get('calcesSSID') && <a href="#signup" style={{textDecoration:"none", paddingTop:"0.5rem"}}><span className="p-2">Signup</span></a>}    
                            {Cookies.get('calcesSSID') && <span className="p-2" onClick={triggerUserUtils}>{name}</span>}
                            
                            <Link style={{textDecoration:"none"}} to="all-query" className="p-2"><span>Search queries</span></Link>
                            {showUtils && <div ref={userUtilRef} className="user-utils">
                                <ul className="user-utils-ul">
                                    <Link to="/"><li>View saved analysis</li></Link>
                                    <Link to="/ask-a-query"><li>Ask a query</li></Link>
                                    <Link to="/faq"><li>FAQ</li></Link>
                                    <li onClick={handlelogout}>logout</li>
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

export default NavbarDash;