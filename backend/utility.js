function createErr(message, errBody) {
    return {
        message,
        ...errBody,
    };
}

function reqWrapper(res, callback) {
    try {
        callback();
    } catch (error) {
        res.status(405).json(
            createErr("Failed to make call to Twitter API", error)
        );
    }
}

module.exports = {
    createErr: createErr,
    reqWrapper: reqWrapper,
};
