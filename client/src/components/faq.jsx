import React, { Component } from 'react';
import Loading from './loading';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Navbar from './Navbar';
import Footer from './Footer';

import faqBanner from '../assets/faq-banner.png'
import faqBannerImg from '../assets/faq-banner-img.png'
import FBI from '../assets/f-b-i.svg'
import axios, {base} from '../axios-cls'

import { Link as scrollLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

import {Link} from 'react-router-dom'

class Faq extends Component {

    state = {
        q : "",
        faq : [],
        loadingFaq : false,
        expanded : "panel1",
        isExpanded : false,
        showResult : true,
        searchRes : []
    }

    openAccordion = e => {
        this.setState({ isExpanded : !this.state.isExpanded })
      };

    useStyles = makeStyles((theme) => ({
        root: {
          width: '100%',
        },
        heading: {
          fontSize: theme.typography.pxToRem(15),
          flexBasis: '33.33%',
          flexShrink: 0,
        },
        secondaryHeading: {
          fontSize: theme.typography.pxToRem(15),
          color: theme.palette.text.secondary,
        },
      }));


    onSearch = async e => {
        e.preventDefault()

        const {data : res} = await axios.post('/faq/search', { q : this.state.q })
        this.setState({ searchRes:res })
    }

    componentDidMount = async() => {
        const {data:faq} = await axios.get('/faq')
        this.setState({ faq, loadingFaq:false })
    }

    handleChange = async e => {
        const value = e.target.value
        this.setState({ q:value })
        this.onSearch(e)
    }
    
    inputRef = React.createRef()
    
    render() {
        const {faq, q} = this.state

        const el = this.state.loadingFaq === true ? <Loading/> :
        <div className="container-fluid faq-container p-0">
            <Navbar user={this.props.user} />
            <div className="f-b" >
            <h3>FAQs</h3>
            <img src={FBI} className="f-b-i" alt=""/>
            </div>
            <div className="search-faq">
                <div className="position-relative col-md-8">
                    <input ref={this.inputRef} type="text" className="faq-search" placeholder="Search FAQ" onChange={this.handleChange} name="q" id="q" />
                    { this.state.showResult && this.state.q.length != 0 && this.state.showResult.length !=0 &&
                    <div className="search-results">
                        <ul>
                            {this.state.searchRes.map(m => 
                            <Link to={'/faq/' + m.slug}><li>
                                <Link to={"/faq/" + m.slug}><h3>{m.q}</h3></Link>
                                <h5>{m.ans.split(" ").slice(0, 6).join(" ")}</h5>
                            </li>
                            </Link>
                            )}
                        </ul>    
                    </div>}
                    {q.length === 0 ? <i className="fa fa-search" aria-hidden="true" /> : <i className="fa fa-arrow-right" aria-hidden="true" />}
                </div>
            </div>
            <hr/>
            <div className="row m-0">
                <div className="col-md-4 position-sticky sticky-top">
                    <ul className="faq-links position-sticky sticky-top">
                        <a href="#what-is-calces"><li>What is calces ?</li></a>
                        <a href="#how-to-save-your-analysis"><li>How to save your analysis ?</li></a>
                        <a href="#how-to-get-saved-analysis"><li>How to get saved analysis ?</li></a>
                    </ul>
                </div>
                <div className="col-md-8">
                    {faq.map(m => 
                    <div name={m.slug} id={m.slug} className="faq-section">
                        <Link to={"/faq/" + m.slug}>
                            <h3>{m.q}</h3>
                        </Link>
                        <h4>{m.ans}</h4>
                        <hr/>
                    </div>    
                    )}
                </div>
            </div>
            {false && <Accordion expanded={this.state.isExpanded} onClick={e => this.openAccordion(e)}>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
                >
                </AccordionSummary>
            </Accordion>}
            <Footer />
        </div>

        return (el)
    }
}

export default Faq;