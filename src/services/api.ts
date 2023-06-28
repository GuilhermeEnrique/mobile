import axios from "axios";

const api = axios.create({
    // baseURL: 'http://192.168.100.74:3333', //maquina de casa
    // baseURL: 'http://192.168.233.145:3333', //ROTEADOR CELULAR
    baseURL: 'http://192.168.10.191:3333', //maquina do crea
})

export { api }