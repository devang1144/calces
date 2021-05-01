import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';
import Gears from '../components/gears';
import Shaft from '../components/Shafts';
import Docs from '../components/Docs';
import NavbarDash from '../components/NavbarDash';
import Footer from '../components/Footer';
import sicon from '../assets/shaft.svg';
import logo from '../assets/logo.svg';

import { motion } from 'framer-motion';

import {Link} from 'react-router-dom';
import axios, {base} from '../axios-cls';

// import Curve from '../sae/Curve'
class Dash extends Component {
    
    state = {
        page : "Gears",
        user : this.props.user
    }

    changePage = e => {
        const name = e.target.getAttribute("name")
        this.setState({ page : name })
    }

    links = [
        {
            name : "Docs",
            icon:'file'
        },
        {
            name : "Gears",
            icon:'cog'
        },
        {
            name : "shaft",
            icon : 'shaft'
        },
        {
            name : "FAQ",
            icon : "question-circle",
            link : "/faq"
        },
        {
            name : "View saved analysis",
            icon : "save",
            link : "/analysis/saved"
        }
    ]
    handlelogout= async() =>{
        await axios.get(base + '/logout');
        Cookies.remove("calcesSSID");

    }
    render() {
        const page = this.state.page
        if(Cookies.get("calcesSSID")==undefined){
            return (<Redirect to="/"></Redirect>)
        }
        return (
            <div style={{ backgroundColor:"#001015" }} className="row m-0">
                {/* <Navbar /> */}
                <motion.div initial={{ left:-100 }} animate={{ left:0 }} transition={{ duration: 0.3 }} className="col-md-2 qwx-sae-left-side-panel p-0">
                        <div className="d-flex justify-content-center align-items-center">
                            <img src={logo} className="qwx-sae-left-side-logo" alt=""/> 
                        </div>                       
                        <hr/>
                        <ul>
                            {this.links.map(m => 
                                m.link === undefined ? 
                                <li style={{ backgroundColor:m.name===this.state.page ? "rgba(6, 51, 65, 0.5)" : null, borderRight:m.name===this.state.page ? "2px solid rgba(33, 120, 94, 1)" : null }} name={m.name} onClick={e => this.changePage(e)}>
                                {m.name != "shaft" ? <i className={"fa fa-" + m.icon}/> : <img src={sicon} />} {m.name}
                                </li>
                                : m.link.length != 0 ? 
                                <Link style={{ textDecoration:"none" }} to={m.link}><li style={{ backgroundColor:m.name===this.state.page ? "rgba(6, 51, 65, 0.5)" : null, borderRight:m.name===this.state.page ? "2px solid rgba(33, 120, 94, 1)" : null }} name={m.name} onClick={e => this.changePage(e)}>
                                {m.name != "shaft" ? <i className={"fa fa-" + m.icon}/> : <img src={sicon} />} {m.name}
                                </li></Link> 
                                :null
                                    
                            )}
                        </ul>
                </motion.div>
                <div className="col-md-10 offset-md-2 qwx-sae-right-side-panel">
                    <NavbarDash user={this.props.user}/>
                    {page === "Gears" ? <Gears/> : page === "shaft" ? <Shaft/> : page === "Docs" ? <Docs user={this.props.user}/> : null}
                </div>
                {/* <div className="container-fluid" style={{"zIndex":"1000000"}}>
                    <Footer />
                </div>
                 */}
            </div>
        );
    }
}

export default Dash;