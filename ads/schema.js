var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var AdSchema = new Schema({

    adId: {
        type: String,
        required: true
    },

    dateAdded: {
        type: String,
        required: true
    },

    species: {
        type: String,
        required: true
    },

    breed: {
        type: String,
        required: true
    },

    name: {
        type: String,
        required: true
    },

    birthday: {
        type: String,
        required: true
    },

    sex: {
        type: String,
        required: true
    },

    location: {
        type: String,
        required: true
    },

    owner: {
        type: String,
        required: true
    },

    info: {
        type: String,
        required: true
    },

    price: {
        type: String,
        required: true
    },

    available: {
        type: String,
        required: true
    },

    favorite: {
        type: String,
        required: true
    },
	
	photo: {
        type: Array,
        required: true
    },
	
	coments: {
        type: Array,
        required: true
    },
});

module.exports = AdSchema;
