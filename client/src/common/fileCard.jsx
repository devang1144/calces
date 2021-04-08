import React, { Component } from 'react';

class FileCard extends Component {
    render() {
        const p = this.props
        return (
            <div className="position-relative s-wrapper">
                <div className="saved-c" style={{ zIndex:"10000", position:"relative" }}>
                    <h4>File 1</h4>
                    <div className="content">
                        <h5>material : {p.material}</h5>
                        <h5>grade : {p.grade}</h5>
                        <h5>FOS bending(max) = {p.fosb}</h5>
                        <h5>FOS contact(max) = {p.fosc}</h5>
                    </div>
                </div>
                <span className="back-rect" style={{ zIndex:"0" }}></span>
                <button className="s-button">Open file&nbsp;<i className="fa fa-external-link"></i></button>
            </div>
        );
    }
}

export default FileCard;