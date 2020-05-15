export const getLoggedIn = state => {
    if (state && state.autentication) {
      return state.autentication.loggedIn;
    }

    return false;
};

export const getCurrUser = state => {
    if ( state && state.autentication && state.autentication.user ) {
        return { 
            name: state.autentication.user.name,
            role: state.autentication.user.role,
        };
    }

    return false;
};

export const getToken = state => {
    if ( state && state.autentication && state.autentication.user ) {
        return state.autentication.user.token;
    }

    return false;
};

export const getAlertMessage = state => {
    if ( state && state.alert ) {
        return state.alert.message;
    }

    return false;
};
