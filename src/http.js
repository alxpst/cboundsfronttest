import axios from 'axios'

const config = {}
config.baseURL = 'http://cbondstest.test/api/'
export const HTTP = axios.create(config)