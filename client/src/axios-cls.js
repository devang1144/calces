import axios from 'axios'

const instance = axios.create({

    //base Domain name
    baseUrl : "https://calces.org.in/",
    // baseURL : "http://localhost:9000/"

})

export let base = "https://calces.org.in/"
// export let base = "http://localhost:9000/"

export default instance