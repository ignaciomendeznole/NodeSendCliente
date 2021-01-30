import axios from 'axios';

const clienteAxios = axios.create({
    baseURL: process.env.backendUrl
});

export default clienteAxios;