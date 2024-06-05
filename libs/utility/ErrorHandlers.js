function handleServerError(err, res) {
    console.error(err);
    res.statusCode = 500;
    res.end(JSON.stringify({ error: 'Internal server error' }));
}

module.exports = handleServerError;