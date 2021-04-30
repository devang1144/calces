import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios, {base} from '../axios-cls';
import Loading from './loading';
import Navbar from './Navbar';
import Footer from './Footer';
import Cookies from 'js-cookie';

class Analysis extends Component {

    state = {
        savedAnalysis : [],
        loading : false
    }

    componentDidMount = async() => {
        const { data : savedAnalysis } = await axios.get(`/analysis/saved/${Cookies.get("calcesSSID")}`)
        console.log(savedAnalysis);
        this.setState({ savedAnalysis, loading:false })
        
    }
    

    render() {
        const a = this.state.savedAnalysis === undefined ? null : this.state.savedAnalysis
        const el = this.state.loading === true ? <Loading/> : 
        <div className="container" style ={{"minHeight":"80vh"}}>
            
            <div className="row m-0 s-r">
                {<div className="col-md-3 saved-analysis-card">
                    <div className="position-relative s-wrapper">
                        <div className="saved-c" style={{ zIndex:"10000", position:"relative" }}>
                            <h4>File 1</h4>
                            <div className="content">
                                <h5>material : steel</h5>
                                <h5>grade : 2</h5>
                                <h5>FOS bending(max) = 1.45</h5>
                                <h5>FOS contact(max) = 1.32</h5>
                            </div>
                        </div>
                        <span className="back-rect" style={{ zIndex:"0" }}></span>
                        <button className="s-button">Open file&nbsp;<i className="fa fa-external-link"></i></button>
                    </div>
                </div>}
            </div>
        </div>
        return (
            <div className="main-container container-fluid p-0">
                <Navbar user={this.props.user} />
                {el}
                <Footer />
            </div>
            )
    }
}

export default Analysis;