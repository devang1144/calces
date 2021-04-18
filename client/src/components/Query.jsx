import React, { Component } from 'react'
import Editor from '../common/Editor'
import Navbar from '../components/Navbar'

class Query extends Component {
    render() {
        return (
            <div>
                <Navbar/>
            <div className="add-query-container">
                <Editor user={this.props.user}/>
            </div>
            </div>
        );
    }
}

export default Query;