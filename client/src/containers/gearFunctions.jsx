import React, { Component } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import Snackbar from '@material-ui/core/Snackbar';
class GFuncs extends Component {

    materials = [
        {
            name : "Steel",
            value : "0"
        },
        {
            name : "Nitralloy 135M",
            value : "1"
        },
        {
            name : "Nitralloy N and 2.5% chrome",
            value : "2"
        },
    ]

    gearbox = [
        {
            name : "Single Reduction",
            value : "0"
        },
        {
            name : "Double Reduction",
            value : "1"
        },
        {
            name : "Epicyclic",
            value : "2"
        },
    ]

    process = [
        {
            name : "Carburized and hardened",
            value : "0"
        },
        {
            name : "Nitrided",
            value : "1"
        },
        {
            name : "Through Hardened",
            value : "2"
        },
        {
            name : "Nitrided and through hardened",
            value : "3"
        },
        {
            name : "Flame or Induction Hardened",
            value : "4"
        }

    ]

    resultTableHaedings = [
       "m", "Face Width(inch)", "npinion", "ngear", "reduction", "FOS_bending", "FOS_contact", "L", "Q", "ko",
    ]

    handleChange = ({currentTarget:input}) => {
        const data = {...this.state.data};
        data[input.name] = input.value;
        this.setState({ data });
        console.log(data)
    };

    changeRadio = e => {
        console.log(e.target.value)
        this.setState({ defaultRadio: e.target.value})
    }

    
    resetState = (e) => {
        e.preventDefault()
        this.setState({ data : this.initialState })
    }

    renderToolitpAndSnackbar = () => {
        const el = this.state.result.length === 0 ? false : true && 
            <div>
                <Snackbar 
                  open={this.state.analysisSaved} 
                  autoHideDuration={3000} 
                  anchorOrigin={{ vertical:this.snackPosition.vertical, horizontal:this.snackPosition.horizontal }}
                  key={this.snackPosition.vertical + this.snackPosition.horizontal}
                  onClose={this.closeNotification}>
                  <p onClose={this.handleClose} style={{ backgroundColor:"#FFF8BE", color:"#444", padding:"0.2rem", borderRadius:"0.1rem" }}>
                  Analysis saved !!
                  </p>
                 </Snackbar>
                <Tooltip title="back to top">
                    <div onClick={this.executeTopScroll} className="back-to-top-button">
                        <i className="d-flex justify-content-center align-items-center fa fa-angle-up"></i>
                    </div>
                </Tooltip>
                <Tooltip title="to end of page">
                    <div onClick={this.executeToEndScroll} className="to-end-of-page">
                        <i className="d-flex justify-content-center align-items-center fa fa-angle-down"></i>
                    </div>
                </Tooltip>
            </div>
        return el
    }

    faceWidthRange = (heading, n1, n2,  ) => {
        const data = this.state.data
        return (
            <div className="face-width-range col-md-6">
                <h5>{heading}</h5>
                <span>from&nbsp;</span>
                <input min="8" max="101" onChange={this.handleChange} value={data[`${n1}`]} name={n1} id={n1} type="number"/>&nbsp;
                <span>to&nbsp;</span>&nbsp;
                <input max="250" onChange={this.handleChange} value={data[`${n2}`]} name={n2} id={n2} type="number"/>
            </div>
        )
    }


    closeNotification = () => {
        this.setState({ analysisSaved : false })
    }

    render() {
        return (
            <div>
                
            </div>
        );
    }
}

export default GFuncs;