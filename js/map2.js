

mapboxgl.accessToken = mapboxKey;
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v9',
    zoom: 9,
    center: [-98.2263,29.5604]
});

$.get("http://api.openweathermap.org/data/2.5/weather", {
    APPID: weatherKey,
    q:     "Cibolo, US",
    units: "imperial"
}).done(function(data) {
//     console.log("current weather", data);
    // let description = data.weather[0].description
    // let humidity = data.main.humidity
    // let wind = data.wind.speed
    // let pressure = data.main.pressure
    // let temp = data.main.temp_max + "/" + data.main.temp_min


    // $(".temp").html("Temperature: " + temp)
    // $(".description").html("Description: " + description)
    // $(".humidity").html("Humidity: " + humidity)
    // $(".wind").html("Wind: " + wind)
    // $(".pressure").html("Pressure: " + pressure)

});

let cardContainer = $("#card-container");


let lat = 29.5604;
let long = -98.2263;
$.get("http://api.openweathermap.org/data/2.5/forecast?lat="+ lat +"&lon="+ long +"&appid=" + weatherKey+ "&units=imperial").done(function(data) {
    let html = '';
    let reports = data.list;
    for(let i = 0; i < reports.length; i += 8) {
        // should get 5 objects back
        console.log(reports[i]);


        let cardHead = reports[i].dt_txt.split(' ');
        let highTemp = reports[i].main.temp_max;
        let lowTemp = reports[i].main.temp_min;
        let iconCode = reports[i].weather[0].icon;
        let weatherDescription = reports[i].weather[0].description;
        let humid = reports[i].main.humidity;
        let windSpeed = reports[i].wind.speed;
        let pressure = reports[i].main.pressure;


        html +=
        '<div class="card" style="width: 18rem;">' +
        '<div class="card-header">' + cardHead[0] + '</div>' +
        '<ul class="list-group list-group-flush">' +
        '<li class="list-group-item"><span>' + highTemp + '*F / ' + lowTemp + '*F</span><br><img src="https://openweathermap.org/img/w/' + iconCode + '.png" alt="Weather Icon"></li>' +
        '<li class="list-group-item"><span>Description: ' + weatherDescription + '</span><br><span>Humidity: ' + humid + '%</span></li>' +
        '<li class="list-group-item">Wind Speed: ' + windSpeed + 'mph</li>' +
        '<li class="list-group-item">Pressure: ' + pressure + 'psi</li>' +
        '</ul>'
        '</div>'

    }
    cardContainer.html(html);

});
