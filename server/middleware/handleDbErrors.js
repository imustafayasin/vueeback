function handleErrors(errors) {
    if (!errors) return;
    let error_messages = "";
    
    Object.values(errors).forEach(er => {
        error_messages += er?.properties?.message + '\n';
    });
    
    return error_messages
}

module.exports = handleErrors
