import { alertConstants } from '../helpers/constants';

const error = message => {
    return { type: alertConstants.ERROR, message };
}

const clear = () => {
    return { type: alertConstants.CLEAR };
}

export const alertActions = {
    error,
    clear
};