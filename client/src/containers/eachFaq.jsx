import React, { Component } from 'react'
import axios, {base} from '../axios-cls';
import { Link } from 'react-router-dom'

class EachFaq extends Component {

    state = {
        thisFaq : []
    }

    componentDidMount = async() => {
        const { match : { params } } = this.props
        const { data : thisFaq } = await axios.get(`/faq/${params.slug}`)
        this.setState({ thisFaq })
        console.log(this.state.thisFaq)
    }
    

    render() {
        const faq = this.state.thisFaq === undefined ? null : this.state.thisFaq
        return (
            <div className="e-f-a-q container mt-4">
                <h3>{faq.q}</h3>
                <h4>{faq.ans}</h4>
                <Link to="/faq"><button>Back</button></Link>
            </div>
        );
    }
}

export default EachFaq;