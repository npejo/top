var mongoose = require('mongoose');

module.exports = function(config) {
    // Connect to mongodb
    var db = null;

    var connect = function () {
        var options = { server: { socketOptions: { keepAlive: 1 } } };
        db = mongoose.connect(config.db, options);
    }
    connect();

// Error handler
    mongoose.connection.on('error', function (err) {
        console.log(err);
    });

// Reconnect when closed
    mongoose.connection.on('disconnected', function () {
        connect();
    });

    return db;
}