var mongoose = require('mongoose'),
    adSchema = require('./schema.js'),
    APIError = require('../APIError');

adSchema.statics.saveAd = function(adId, dateAdded, 
species, breed, name, birthday, sex, location, owner, 
info, price, available, favorite, photo, coments, callback){

    var newAd = new model({
		adId: adId,
		dateAdded: dateAdded,
		species: species,
		breed: breed,
		name: name,
		birthday: birthday,
		sex:sex,
		location: location,
		owner: owner,
		info: info,
		price: price,
		available: available,
		favorite: favorite,
		photo: photo,
		coments: coments
    });

    newAd.save(function(err) {
      if (err) return callback(err);
      return callback(null);
    });
};

adSchema.statics.getAds = function(callback) {
    model.find({}, function(err, found) {
        if (found.length === 0) {
            return callback([], null);
        }

        var response = [];

        found.forEach(function (object) {
            response.push({
				adId: object.adId,
				dateAdded: object.dateAdded,
				species: object.species,
				breed: object.breed,
				name: object.name,
				birthday: object.birthday,
				sex: object.sex,
				location: object.location,
				owner: object.owner,
				info: object.info,
				price: object.price,
				available: object.available,
				favorite: object.favorite,
				photo: object.photo,
				coments: object.coments
            })
        });

        return callback(response, null);
    });
};

var model = mongoose.model('ad', adSchema);

module.exports = model;
