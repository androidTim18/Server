var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    service = require('./service');


var app = express();
mongoose.connect("mongodb://localhost:27017/petshop");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var router = express.Router();

app.use('/', router);

router.post('/register', service.register);
router.post('/login', service.login);
router.post('/test', service.test);
router.get('/ads', service.getAds);
//router.get('/ad/:id', service.getAd);
router.post('/newad', service.sendAd);
//router.post('/logout', service.logout);


app.listen(8000);
console.log('Listening on port 8000');
