import { SET_ALERT, REMOVE_ALERT} from './types';
const uuid = require('uuid');
export const setAlert = (msg, alerType) => dispatch => {
    const id = uuid.v4();
    dispatch({
        type: SET_ALERT,
        payload : {msg, alerType, id}
    })
    setTimeout(()=>dispatch({ type : REMOVE_ALERT, payload: id}), 5000)
}
