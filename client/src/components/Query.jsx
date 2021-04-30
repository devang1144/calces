import React, { Component } from 'react'
import Editor from '../common/Editor'
import Navbar from '../components/Navbar';
import Footer from './Footer';
import Cookies from 'js-cookie';
import { Redirect } from 'react-router-dom';

class Query extends Component {
    render() {
        if(!Cookies.get('calcesSSID')){
            return <Redirect to='/'></Redirect>
        }
        return (
            <div>
                <Navbar/>
            <div className="add-query-container">
                <Editor user={this.props.user}/>
            </div>
            <div className="container-fluid mt-5"></div>
            <Footer />
            </div>
        );
    }
}

export default Query;