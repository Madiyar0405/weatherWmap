var map = null;

ymaps.ready(function () {
    map = new ymaps.Map("map", {
        center: [55.76, 37.64],
        zoom: 7

    })

});

$('#form_map').click(function () {

    $('input[name="city"]').removeClass('error');
    var cityName = $('input[name="city"]').val();
    if (cityName == '') {
        $('input[name="city"]').addClass('error');
        return;

    }

    var myGeocoder = ymaps.geocode(cityName);

    myGeocoder.then(function (res) {
        var coords = res.geoObjects.get(0).geometry._coordinates;
        map.setCenter(coords);

        $.ajax({
            type: 'POST',
            url: '/getweather',
            data: { city: cityName },
            success: function (data) {
                console.log(data);

                var html = `<div style="background: url(http://openweathermap.org/img/wn/${data.weather[0].icon}.png) no-repeat top right">
                            <strong class="city-name">${cityName}</strong>
                            <table class="weather-table">
                                <tr><td>Temperature</td><td>${data.main.temp} &deg;C</td></tr>
                                <tr><td>Description</td><td>${data.weather[0].description}</td></tr>
                                <tr><td>Coordinates</td><td>Latitude: ${data.coord.lat}, Longitude: ${data.coord.lon}</td></tr>
                                <tr><td>Feels Like</td><td>${data.main.feels_like} &deg;C</td></tr>
                                <tr><td>Humidity</td><td>${data.main.humidity}%</td></tr>
                                <tr><td>Pressure</td><td>${data.main.pressure} hPa</td></tr>
                                <tr><td>Wind Speed</td><td>${data.wind.speed} m/s</td></tr>
                                <tr><td>Country Code</td><td>${data.sys.country}</td></tr>
                                <tr><td>Rain Volume (last 3 hours)</td><td>${data.rain ? (data.rain['3h'] || 'N/A') : 'N/A'} mm</td></tr>
                            </table>
                        </div>`;

                // Now you can use the 'html' variable to inject this content into your HTML document.


                map.balloon.open(coords, html, {
                    closeButton: false
                });
            },
            error: function (err) {
                console.log('Произошла ошибка: ' + err)
            }

        });

    });
});



$("#myForm").submit(function(event){
    event.preventDefault()

    $("#result").empty()

    var search = $("#search").val()



    var url = "https://api.unsplash.com/search/photos?query="+search+"&client_id=M40Q6p12Tiv93tixlPfEo8mzzXEU1XINmewooedCxNw"

    $.ajax({
        method: 'GET',
        url:url,
        success:function(data){
            console.log(data)

            data.results.forEach(photo =>{
                $("#result").append(`
                <img src = "${photo.urls.regular}"/>
                `)
            })
        }
    })



})