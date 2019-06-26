var user = require('./user/model'),
    ad = require('./ads/model'),
    APIError = require('./APIError');

exports.register = function (req, res, next) {
        if (req.body.username && req.body.password && req.body.email && req.body.firstName && req.body.lastName) {
            user.create(req.body, function (err) {
                if (err) {
                    res.status(409).send(err);
                } else {
                    res.status(200).send(APIError.OK);
                }
            });
        } else {
            res.status(400).send(APIError.NO_BODY);
        }
};

exports.login = function (req, res, next) {
    if (req.body.email && req.body.password) {
        user.login(req.body.em, req.body.password, function (session, err) {
            //if (err) {
               // res.status(404).send(err);
           // } else {
                res.setHeader("sessionid", session);
                res.status(200).send(APIError.OK);
          //  }
        });
    } else {
        res.status(400).send(APIError.NO_BODY);
    }
};

exports.sendAd = function (req, res, next) {
    if (req.headers['sessionid']) {
        user.isLogged(req.headers['sessionid'], function(found, err) {
            if (!found) {
                res.status(400).send(err);
            }
            if (req.body.receiver && req.body.data) {
                user.checkReceiver(req.body.receiver, function(exists) {
                    if (!exists) {
                        res.status(404).send(APIError.AD_NOT_FOUND);
                    } else {
                        message.saveMessage(found.username, req.body.receiver, req.body.data, function (err) {
                            if (err) {
                                res.status(500).send(err);
                            } else {
                                res.status(200).send(APIError.OK);
                            }
                        })
                    }
                })
            } else {
                res.status(400).send(APIError.NO_BODY);
            }
        });
    } else {
        res.status(404).send(APIError.NOT_LOGGED_IN);
    }
};


exports.getAds = function (req, res, next) {
    if (req.headers['sessionid']) {
        user.isLogged(req.headers['sessionid'], function(found, err) {
            if (!found) {
                res.status(400).send(err);
            } else {
                ad.getAds(function (response, err) {
                    if (err) {
                        res.status(400).send(err);
                    } else {
                        res.status(200).send(response);
                    }
                })
            }
        });
    } else {
        res.status(404).send(APIError.NOT_LOGGED_IN);
    }
};

exports.logout = function (req, res, next) {
    if (req.headers['sessionid']) {
        user.isLogged(req.headers['sessionid'], function(found, err) {
            if (!found) {
                res.status(404).send(err);
            } else {
                user.logout(found.username, function (err) {
                    if (err) {
                        res.status(400).send(err);
                    } else {
                        res.status(200).send(APIError.OK);
                    }
                })
            }
        });
    } else {
        res.status(404).send(APIError.NOT_LOGGED_IN);
    }
};
exports.test = function (req, res, next) {
     res.status(200).send(APIError.OK);
};
