'use strict'


var rp = require('request-promise');

const api_key = '36e872deac078c33288fc2339dcfaa89';




var options = {             
    method: 'GET',
    url: "https://api.openweathermap.org/data/2.5/weather",
    qs: {APPID : api_key, units : 'metric'},
    header: {'User-Agent' : 'Request-Promise'},
    json : true

}

exports.Test = (str) => {
    console.log(str);
}

exports.GetWeatherByCityName = (cityName, callback, error) => {
    options.qs.q = cityName; 

    rp(options).then(data => { 
        callback(data);
    }).catch(errorData => {
        error(errorData);
    });
}