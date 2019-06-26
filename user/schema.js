var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var UserSchema = new Schema({

    firstName: {
        type: String,
        required: true,
    },
	lastName: {
        type: String,
        required: true,
    },
	username: {
        type: String,
        required: true,
        unique: true
    },

    email: {
        type: String,
        required: true,
		unique: true
    },

    password: {
        type: String,
        required: true
    },
	
	userId: {
        type: String,
        //required: true
    },
	
	rated: {
        type: String,
        //required: true
    },
	
	fullName: {
        type: String,
       // required: true
    },
	   
    rating: {
        type: String,
      //  required: true
    },
	
    session: {
        type: String

    }
});

module.exports = UserSchema;
