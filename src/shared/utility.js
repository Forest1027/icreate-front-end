export const checkValidity = (value, identifier, password) => {
    let error = [];
    if(identifier.required) {
        if(value.trim() === '') {
            error.push('Cannot be empty');
        }
    }
    if(identifier.isEmail) {
        if(!(new RegExp('[A-Za-z0-9]+@[A-Za-z0-9.]+\\.[A-Za-z]{2,}')).test(value)) {
            error.push('Should have email format');
        }
    }

    if(identifier.sameAsPassword) {
        if(value !== password) {
            error.push('Should be the same as password');
        }
    }
    return error;
};

export const isNull = (value) => {
    return value === null || value === "" || value === undefined;
}

export const isNotNull = (value) => {
    return value !== null && value !== "" && value !== undefined;
}

export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    }
};