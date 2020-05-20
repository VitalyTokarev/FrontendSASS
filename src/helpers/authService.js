const logout = () => {
    localStorage.removeItem('user');
};

const handleResponse = response => {
    if (!response.ok) {
        if ( response.status === 401 ) {
            return response.json().then( error => {
                return Promise.reject(error.message);
            });
        }

        return Promise.reject('HTTP error: ' + response.status);
    }

    return response.json().then(data => {
        return data;
    });
};

const handleResponseRefreshTokens = response => {
    if (!response.ok) {
        if(response.status === 401) { 
            logout();
        }

        return Promise.reject('HTTP error: ' + response.status);
    }

    return response.json().then(data => {
        return data;
    });
};

const setUser = token => {
    if( !token ) { return false; }
    let user = {};

    try{
        user = JSON.parse(atob(token.split('.')[1])).data;
    } catch(e) { }
    
    user.token = token;
    localStorage.setItem('user', JSON.stringify(user));

    return user;
};

const login = async (email, password) => {
    const user = btoa(email) + ':' + btoa(password);

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            authorization: JSON.stringify( { user }),
        },
    };

    return fetch('/login', requestOptions)
    .then(handleResponse)
    .then(setUser);   
};

const signup = async (name, email, password) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name,
            email,
            password,
        }),
    };
    
    return fetch('/signup', requestOptions)
    .then(handleResponse)
    .then(setUser);
};


const refreshToken = async token => {
    if ( !token )  { return Promise.reject(401); }
    const requestOptons = {
        method: 'POST',
        headers: {
            authorization: JSON.stringify( { token } ),
        },
    };

    return fetch('/update_token', requestOptons)
    .then(handleResponseRefreshTokens)
    .then(setUser);
};

export const authService = {
    login,
    logout,
    signup,
    refreshToken,
};