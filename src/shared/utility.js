export const checkValidity = (value, identifier) => {
    let isValid = true;
    if(identifier.required) {
        isValid = value.trim() !== '' && isValid;
    }
    return isValid;
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