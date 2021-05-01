import React, { Component } from 'react';
import axios from '../axios-cls'
import Loading from '../components/loading'

class EachQuery extends Component {

    state = {
        query : [],
        loading : true
    }

    componentDidMount = async() => {
        const { match : { params } } = this.props
        const { data : query } = await axios.get(`/query/eachquery/${params.slug}`)
        this.setState({ query, loading:false })
    }
    

    render() {
        const query = this.state.query
        const el = this.state.loading === true ? <Loading/> : 
        <div className="container each-query-page">
            <h2>{query.title}</h2>
            <p dangerouslySetInnerHTML={{ __html:`${query.content}` }}></p>
            <button>Back</button>   
        </div>
        return (el);
    }
}

export default EachQuery;