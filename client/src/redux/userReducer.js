import { LOG_IN, LOG_OUT } from './actions/actionTypes'

const initialState = {
    isAuth: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOG_IN: {
            return ({ isAuth: true })
        }
        case LOG_OUT: {
            return ({ isAuth: false })
        }
        default: {
            return state;
        }
    }
}