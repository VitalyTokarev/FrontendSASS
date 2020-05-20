const handleResponse = response => {
    if (!response.ok) {
        return Promise.reject('HTTP error: ' + response.status);
    }

    return response.json().then(data => {
        return data;
    });
};

const handleResponseWithEmptyBody = response => {
    if (!response.ok) {
        return Promise.reject('HTTP error: ' + response.status);
    }

    return Promise.resolve();
};

const createEntityAtServer = async (path, entity) => {
    const request_options = { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(entity),
    };

    return fetch(path, request_options)
    .then(handleResponse);
};

const getEntityFromServer = async path => {
   return fetch(path)
   .then(handleResponse);
};

const editEntityAtServer = async (path, entity) => {
    const request_options = { 
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(entity),
    };

    return fetch(path, request_options)
    .then(handleResponseWithEmptyBody);
};

const deleteEntityFromServer = async (path, id) => {
    const request_options = { 
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({id}),
    };

    return fetch(path, request_options)
    .then(handleResponseWithEmptyBody);
};

export const entityService = {
    createEntityAtServer,
    getEntityFromServer,
    editEntityAtServer,
    deleteEntityFromServer,
};