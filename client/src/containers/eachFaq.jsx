import React, { Component } from 'react'
import axios, {base} from '../axios-cls'
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
            <div>
                {faq.q}
                {faq.ans}
            </div>
        );
    }
}

export default EachFaq;