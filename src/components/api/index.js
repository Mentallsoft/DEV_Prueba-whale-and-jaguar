import axios from "axios";

const url = 'https://restcountries.eu/'
const endpoint = 'rest/v2/all'

export const api = axios.create({
    baseURL: url + endpoint
});

export default api;