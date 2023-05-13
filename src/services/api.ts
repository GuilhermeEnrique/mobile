import axios from "axios";

const api = axios.create({
    // baseURL: 'htpp://localhost:3333',
    baseURL: 'http://192.168.100.74:3333',
})

export { api }