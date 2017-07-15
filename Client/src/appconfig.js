import { createBrowserHistory } from 'history'
import axios from 'axios'

/**
 * Global application configuration
 */
export const APPCONFIG = {
    SERVER: 'http://localhost:3003'
}

/**
 * This will set the axios proxy to the server baseline address
 */
export var requestProxy = axios.create({
    baseURL: APPCONFIG.SERVER
})

/**
 * This will create global history object!
 */
export default createBrowserHistory({
    /* pass a configuration object here if needed */
})
