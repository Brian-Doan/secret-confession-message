var mongoose = require('mongoose');

// Page Schema
var confessionSchema = mongoose.Schema({
    username: {
        type: String,
        //required: true
    },
    userID: {
        type: String,
        //required: true
    },
    confession: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Confession', confessionSchema);