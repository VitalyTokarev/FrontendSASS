export const getLoggedIn = state => {
    if (state && state.auth) {
      return state.auth.loggedIn;
    }
    return false;
};

export const getCurrUser = state => {
    if ( state && state.auth && state.auth.name ) {
        return { 
            name: state.auth.name,
            role: state.auth.role,
        };
    }

    return false;
};

export const getToken = state => {
    if ( state && state.auth) {
        return state.auth.token;
    }

    return false;
};

export const getAlertMessage = state => {
    if ( state && state.alert ) {
        return state.alert.message;
    }

    return false;
};


export const getAlertMessageType = state => {
    if ( state && state.alert ) {
        return state.alert.type;
    }

    return false;
};
