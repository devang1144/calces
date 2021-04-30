import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import FileCard from './fileCard'

class AnalysisTemp extends Component {
    render() {
        return (
            <div className="container-fluid p-0 a-temp-home">
                <div className="row m-0 w-100" style={{ backgroundColor:"#00242F", position:"relative" }}>
                    <svg className="mr-auto"width="39" height="49" viewBox="0 0 39 49" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.84552 7.24731C8.20009 8.76954 10.6154 25.1399 10.6399 37.2145C10.6435 38.9958 11.8711 40.5873 13.6136 40.9747V40.9747C15.6075 41.418 17.5309 40.1333 17.9513 38.1494C19.8106 29.3771 23.153 18.9042 25.3116 13.7156C26.0013 12.0577 27.7725 11.2974 29.544 11.6959V11.6959C31.1215 12.0508 32.4157 13.2462 32.6982 14.8414C33.6704 20.3323 33.6442 29.0027 32.633 45.9094" stroke="#627884" stroke-width="2"/>
                        <path d="M32.2053 13.1868C27.0508 8.37761 19.4879 4.67795 18.3691 4.46533" stroke="#627884" stroke-width="2"/>
                        <path d="M25.6195 12.0241C20.8439 7.66193 14.21 4.43586 12.7921 4.12231" stroke="#627884" stroke-width="2"/>
                        <path d="M10.9753 10.7694C13.2535 26.41 16.5423 40.2125 17.0242 40.4155" stroke="#627884" stroke-width="2"/>
                        <path d="M13.7057 4.02641C11.3535 7.40979 11.0806 10.8808 11.0973 11.9441" stroke="#627884" stroke-width="2"/>
                        <path d="M18.3691 4.46535C16.8531 3.99987 13.9858 3.84582 13.7058 4.02656" stroke="#627884" stroke-width="1.7"/>
                    </svg>
                    <div className="ml-auto">
                        <span style={{ color:"white" }} className="user-button-a-temp">User</span>
                        <i className="ml-auto fa fa-caret-down fa-temp-c"></i>
                    </div>
                </div>
                <div className="row m-0 w-100">
                    <div className="col-md-2">
                        <Button style={{ backgroundColor:"#204956", color:"white" }} className="btn-a-temp">Create project +</Button>
                        <hr/>
                        <ul className="a-temp-list">
                            <li>Gears</li>
                            <li>Shafts</li>
                            <li>Docs</li>
                        </ul>
                        <hr/>
                    </div>
                    <div className="col-md-10 _background_analysis_temp">
                        <div className="row m-0 d-flex justify-content-start">
                        <div className="col-md-3">
                            <FileCard material="steel" grade="1" fosb="1.43" fosc="1.67"/>
                        </div>
                        <div className="col-md-3">
                            <FileCard material="steel" grade="2" fosb="1.55" fosc="1.23"/>
                        </div>
                        <div className="col-md-3">
                            <FileCard material="steel" grade="2" fosb="1.89" fosc="1.44"/>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AnalysisTemp;