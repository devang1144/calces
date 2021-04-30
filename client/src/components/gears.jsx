import React, { Component } from 'react'
import Input from '../common/Input'
import Dropdown from '../common/dropdown'
import Table from '../common/Table'

import { Link, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
import axios, {base} from '../axios-cls'
import Chart from './Chart'
import { motion } from 'framer-motion';
import Cookies from 'js-cookie';

import GFuncs from '../containers/gearFunctions'
class Gears extends GFuncs {

    state = {
        defaultRadio : "",
        dropdown : false,
        result : [],
        showForm : true,
        analysisSaved : false,
        snackBarPosition : {
            vertical : "top",
            horizontal : "center"
        },
        data : {
            fwidth1:"0.6",
            fwidth2:"1",
            ko:"1.25",
            Q:"11",
            L:"400",
            rpm:"3451.251",
            torque:"185.44",
            power:"37500",
            cvt:"",
            hardness:"363",
            modulus:"200",
            module:"3",
            module1:"",
            module2:"",
            grade:"2",
            process:"2",
            material:"0",
            poisson:"0.29",
            gearbox : "",
            npinioni : "30",
            npinionf : "70",
            ngeari : "70",
            ngearf : "100",
            minFOSp : "1.4",
            minFOSg : "1.6"
        }
    }
    
    initialState = {...this.state.data}

    componentDidMount = async() => {
        window.scrollTo(0, 0)
    }

    change = (field, material) => {
        console.log(material)
        this.state.data[`${field}`] = material
        this.setState(this.state)
    }

    handleSumbit = async e => {
        e.preventDefault()
        const data = this.state.data
        const payload = {
            fwidth1:data.fwidth1,
            fwidth2:data.fwidth2,
            ko:data.ko,
            Q:data.Q,
            L:data.L,
            rpm:data.rpm,
            torque:data.torque,
            power:data.power,
            cvt:data.cvt,
            hardness:data.hardness,
            modulus:data.modulus,
            module:data.module,
            module1:data.module1,
            module2:data.module2,
            grade:data.grade,
            process:data.process,
            material:data.material,
            poisson:data.poisson,
            gearbox : data.gearbox,
            npinioni : data.npinioni,
            npinionf : data.npinionf,
            ngeari : data.ngeari,
            ngearf : data.ngearf,
            minFOSp : data.minFOSp,
            minFOSg : data.minFOSg,
            redi : data.redi,
            redf : data.redf
        }

        const { data : result } = await axios.post('/solve', payload)
        this.setState({ result }, () => window.scrollTo(0, 400))
    }

    saveAnalysis = async() => {
        const payload = {...this.state.data}
        const {data : res} = await axios.post(`/analysis/save/${Cookies.get("calcesSSID")}`, payload)
        this.setState({ analysisSaved : true })
    }
    topRef = React.createRef()
    toEndOfPage = React.createRef()

    executeTopScroll = () => this.topRef.current.scrollIntoView()
    executeToEndScroll = () => this.toEndOfPage.current.scrollIntoView()
    snackPosition = this.state.snackBarPosition
    render() {

        let val = this.state.defaultRadio
        const data = this.state.data
        const gearbox = this.state.data.gearbox
        console.log(data)

        return (
            <motion.div initial={{y:-25}} animate={{y:0}} transition={{ type: "spring", stiffness: 160 }} ref={this.topRef} className="gears-page container-fluid p-0">
                        {this.state.showForm && <form className="p-3 row m-0">
                            <div className="col-md-6">
                                <div className="qwx-sae-form-field-wrapper">
                                    <h3>Loading</h3>
                                    <div className="row m-0">
                                        <Input onChange={this.handleChange} value={data.rpm} required name="rpm" label="Motor/Engine RPM" placeholder="max rpm" size="col-md-6"/>
                                        <Input onChange={this.handleChange} value={data.torque} required name="torque" label="Motor/Engine torque" placeholder="max torque in N-m" size="col-md-6"/>
                                        <Input onChange={this.handleChange} value={data.power} required name="power" label="Motor/Engine Power" placeholder="max power in Kw" size="col-md-6"/>
                                        <Input onChange={this.handleChange} value={data.cvt} name="cvt" label="Motor/Engine CVT" placeholder="cvt ratio" size="col-md-6" text="If a CVT is used for primary reduction then CVT ratio is required, else not"/>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 p-0">
                                <div className="qwx-sae-form-field-wrapper">
                                    <h3>Material</h3>
                                    <div className="row m-0">
                                        <Input onChange={this.handleChange} value={data.hardness} required name="hardness" label="Hardness" placeholder="hardness in brinell" size="col-md-4"/>
                                        <Input onChange={this.handleChange} value={data.poisson} name="poisson" label="Poisson ratio" placeholder="possion ratio" size="col-md-4"/>
                                        <Input onChange={this.handleChange} value={data.modulus} name="modulus" label="Elastic Modulus" placeholder="Elastic modulus in Mpa" size="col-md-4"/>
                                        <p className="material-field-text-content">
                                        According to AGMA specification Allowable bending and contact stress 
                                        depends on manufacturing process. 
                                        Some of the common gear processes are listed below.
                                        </p>
                                        <Dropdown changeCallback={this.change} title="material" width="200px" array={this.materials}/>
                                        <Dropdown changeCallback={this.change} title="process" width="200px" array={this.process}/>
                                        <div className="steel-grade wrapper">
                                            <h6>Steel grade</h6>
                                            {/*Radio button*/}
                                            <div className="toggle_radio">
                                                <input onChange={this.handleChange} onClick={this.changeRadio} type="radio" value="1" checked={ val===1 ? true : false } className="toggle_option" id="first_toggle"  name="grade" />
                                                <input onChange={this.handleChange} onClick={this.changeRadio} type="radio" value="2" checked={ val===2 ? true : false } className="toggle_option" id="second_toggle" name="grade" />
                                                <label htmlFor="first_toggle"><p>1</p></label>
                                                <label htmlFor="second_toggle"><p>2</p></label>
                                                <div className="toggle_option_slider"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="qwx-sae-form-field-wrapper">
                                    <h3>Gear data</h3>
                                    <Dropdown id="dropdown" changeCallback={this.change} title="gearbox" width="200px" array={this.gearbox}/>
                                    {gearbox === "0" && <div className="row m-0">
                                        <Input onChange={this.handleChange} value={data.module} name="module" label="module" placeholder="module" size="col-md-6" text="for eg. 1.25, 1.5, 2, 2.5, 3, 4"/>
                                        <Input onChange={this.handleChange} value={data.minFOSp} name="minFOSp" label="min FOS pinion" placeholder="module" size="col-md-6" text="min value of FOS pinion required"/>
                                        <Input onChange={this.handleChange} value={data.minFOSg} name="minFOSg" label="min FOS gear" placeholder="module" size="col-md-6" text="min value of FOS gear required"/>
                                        {this.faceWidthRange("pinion teeth", "npinioni", "npinionf")}
                                        {this.faceWidthRange("Gear teeth", "ngeari", "ngearf")}
                                        {this.faceWidthRange("Reduction range", "redi", "redf")}
                                        {this.faceWidthRange("Face width range(in inch)", "fwidth1", "fwidth2")}
                                    </div>}

                                    {/*Double reduction gearbox*/}
                                    {gearbox === "1" && <div className="row m-0">
                                        <Input onChange={this.handleChange} value={data.module1} name="module1" label="module1" placeholder="module1" size="col-md-6" text="for eg. 1.25, 1.5, 2, 2.5, 3, 4"/>
                                        <Input onChange={this.handleChange} value={data.module2} name="module2" label="module2" placeholder="module2" size="col-md-6" text="for eg. 1.25, 1.5, 2, 2.5, 3, 4"/>
                                        {this.faceWidthRange("Face width range(in inch) for first pair", "fwidthpair1", "fwidthpair1")}
                                        {this.faceWidthRange("Face width range(in inch) for second pair", "fwidthpair2", "fwidthpair2")}
                                        {this.faceWidthRange("First reduction range R1", "R1", "R1")}
                                        {this.faceWidthRange("Second reduction range R2", "R2", "R2")}
                                    </div>}
                                </div>
                            </div>
                            <div className="col-md-6 p-0">
                                <div className="qwx-sae-form-field-wrapper">
                                    <h3>Constraints</h3>
                                    <div className="row m-0">
                                        <Input onChange={this.handleChange} value={data.ko} name="ko" label="Overload Factor" placeholder="Ko" size="col-md-4" textToShow="If value of overload factor is not provided then default value will be 1.25"/>
                                        <Input onChange={this.handleChange} value={data.Q} name="Q" label="Quality Number" placeholder="Q" size="col-md-4" textToShow="If value of Ouality Number is not provided then default value will be 11"/>
                                        <Input onChange={this.handleChange} value={data.L} name="L" label="Max length of Gearbox" placeholder="max length in mm" size="col-md-4"/>
                                    </div>
                                </div>
                            </div>
                            <div className="qwx-button">
                                <button onClick={this.resetState}>Reset</button>
                                <button onClick={this.handleSumbit}>Proceed</button>
                            </div>
                        </form>}
                        <div className="container">
                        {this.state.result.length !== 0 && 
                            <div>
                                <Link to="chart-1"><button className="show-hide-btn mb-4" onClick={() => this.setState({ showForm : !this.state.showForm })}>{this.state.showForm === false ? 'Show' : 'Hide'} form</button></Link>
                                <button className="s-a" onClick={this.saveAnalysis}>Save this analysis</button>
                            </div>
                        }
                        </div>
                        {this.renderToolitpAndSnackbar()}
                        {this.state.result.length !== 0 &&
                        <div>    
                            <Chart 
                            id="chart-1"
                            page="gear"
                            data1={this.state.result[1] === undefined ? [] : this.state.result[1]}
                            data2={this.state.result[2] === undefined ? [] : this.state.result[2]}
                            />
                        </div>
                        }
                        
                        {this.state.result.length !== 0 && 
                        <Table 
                            headings={this.resultTableHaedings} 
                            result={this.state.result[0] === undefined ? [] : this.state.result[0]} 
                            stats={this.state.result[3] === undefined ? [] : this.state.result[3]}
                            page="gear"
                            />}
                            
                        <div className="end-of-page" ref={this.toEndOfPage} />
            </motion.div>
        );
    }
}

export default Gears;