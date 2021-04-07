import React, { Component } from 'react';
import axios from 'axios'

class Admin extends Component {

    state = {
        data : {
            image : null
        }
    }

    componentDidMount = async() => {
        
    }

    handleChange = ({ currentTarget : input }) => {
        const data = {...this.state.data}
        data[input.name] = input.files[0]
        this.setState({ data })
    }

    handleSubmit = async e => {
        e.preventDefault()

        const payload = new FormData()

        payload.append('image', this.state.data.image)
        
        const config = { headers: { 'Authorization': 'Client-ID ee79e79680e3395' } }
        const { data:res } = await axios.post('https://api.imgur.com/3/image/', payload, config)
        console.log(res);
    }
    

    render() {
        console.log(this.state.data)
        return (
            <div>
                <input type="file" name="image" id="image" onChange={this.handleChange}/>
                <button onClick={this.handleSubmit}>Upload</button>
            </div>
        );
    }
}

export default Admin;