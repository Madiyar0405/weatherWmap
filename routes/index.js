var express = require('express');
var router = express.Router();
var openweatherapi = require('../modules/openweatherapi.js')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', p : '' });
});


/* POST запрос */

router.post('/getweather', function(req, res, next){
  openweatherapi.GetWeatherByCityName(req.body.city, (weather) => {
    return res.status(200).send(weather);
  }, error => {
    return res.status(500).send(error);
  });   
});

module.exports = router;
