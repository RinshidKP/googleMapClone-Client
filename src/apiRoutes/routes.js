import axios from 'axios'
import apiURL from '../config/apiURL'

export const userAPI = axios.create({
baseURL: apiURL.userAPI
})
export const adminAPI = axios.create({
baseURL: apiURL.adminAPI
})
