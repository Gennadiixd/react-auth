import {LOG_IN, LOG_OUT} from './actionTypes'

export const loginAC = (user) => ({
    type: LOG_IN,
    payload: {
        user
    }
})

export const logoutAC = () => ({
    type: LOG_OUT,    
})