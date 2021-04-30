import React, { Component } from 'react'
import axios from '../axios-cls'
import Loading from '../components/loading'
import {Link} from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

class AllQuery extends Component {

    state = {
        allquery : [],
        loading : true
    }

    componentDidMount = async() => {
        const {data:allquery} = await axios.get('/query')
        console.log(allquery)
        this.setState({ allquery, loading:false })

    }
    

    render() {
        const allquery = this.state.loading === true ? 
        <Loading/> : 
        <div className="row m-0">
            <Navbar />
            <div className="col-md-2 a-q-s-m">
                <ul>
                    <li><Link to="/d">Dashboard</Link></li>
                    <li><Link to="/analysis/saved">View saved analysis</Link></li>
                    <li></li>
                </ul>
            </div>
            <div className="col-md-8 a-q-c">
            <div className="row pt-1 m-0">
                <div className="col-md-8">
                    <h2 className="main-head">All queries</h2>
                </div>
                <div className="col-md-4 d-flex">
                    <span className="a-a-q-query"><Link to="/ask-a-query">Ask a query</Link></span>
                </div>
            </div>
            {/* <hr /> */}
            <ul className="main-list">
                {this.state.allquery.map((m, key) => 
                    <div key={key}>
                        <li className="row m-0">
                            <div className="col-md-9">
                                <Link className="main-query-link" to={'/query/'+m.slug}><span>{m.title}</span></Link>
                            </div>
                            <div className="col-md-9 d-flex justify-content-end query-date">
                                <span>asked on :{m.date}</span>
                            </div>
                        </li>
                        <hr className="e-q-hr-line"/>
                    </div>   
                )}
            </ul>
        </div>
        <Footer />
        </div>
        return (allquery);
    }
}

export default AllQuery;