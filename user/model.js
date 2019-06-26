var mongoose = require('mongoose'),
    bcrypt = require('bcrypt'),
    crypto = require('crypto'),
    userSchema = require('./schema.js'),
    APIError = require('../APIError');
/*
userSchema.statics.validateSecret = function (secret, hash) {
    return bcrypt.compareSync(secret, hash);
};
*/
userSchema.statics.create = function(data, callback) {
    model.findOne({email: data.email}, function(err, found) {
        if (found) {
            return callback(APIError.ALREADY_EXISTS);
        }

        var newProfile = new model({
			firstName: data.firstName,
			lastName: data.lastName,
            username: data.username,
            password: data.password,
            email: data.email
        });

        newProfile.save(function(err) {
          if (err) return callback(err);
          return callback(null);
        });
    });
};

userSchema.statics.login = function(email, password, callback) {
    model.findOne({email: email}, function(err, found) {
        if (!found) {
            return callback(null, APIError.NOT_REGISTERED);
        }

        if (model.password != found.password) {
            return callback(null, APIError.INVALID_PASS);
        }

        var session = email + model.userId;
        found.update({session: session}, function(err) {
            if (err) return callback(err);
            return callback(session, null);
        });
    });
};

userSchema.statics.isLogged = function(session, callback) {
    model.findOne({session: session}, function(err, found) {
        if (!found) {
            return callback(null, APIError.NOT_LOGGED_IN);
        }

        return callback(found, null);
    });
};

/*
userSchema.statics.getUsers = function(callback) {
    var query = model.find({}).select({ "username": 1, "_id": 0});

    query.exec(function (err, someValue) {
        if (err) return callback(null, err);
        return callback(someValue, null);
    });

};
*/
userSchema.statics.logout = function(email, callback) {
    model.findOne({email: email}, function(err, found) {
        if (!found) {
            return callback(APIError.NOT_LOGGED_IN);
        }

        found.session = undefined;
        found.save(function(err){
            if (err) {
                return callback(err);
            }
            return callback(null);
        });
    });
};
/*
profileSchema.statics.checkReceiver = function(username, callback) {
    model.findOne({username: username}, function(err, found) {
        if (!found) {
            return callback(false);
        }

        return callback(true);
    });
};
*/

var model = mongoose.model('user', userSchema);

module.exports = model;
