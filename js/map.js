
const coordinates = document.getElementById("coordinates");

mapboxgl.accessToken = mapboxKey;
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v9',
    zoom: 9,
    center: [-98.2263,29.5604]
});
//current weather
$.get("http://api.openweathermap.org/data/2.5/weather", {
    APPID: weatherKey,
    q:     "Cibolo, US",
    units: "imperial"
}).done(function(data) {
    console.log("current weather", data);
    let description = data.weather[0].description
    let humidity = data.main.humidity
    let wind = data.wind.speed
    let pressure = data.main.pressure
    let temp = data.main.temp_max + "/" + data.main.temp_min


    $("#temp").html("Temperature: " + temp)
    $("#descr").html("Description: " + description)
    $("#hum").html("Humidity: " + humidity)
    $("#win").html("Wind: " + wind)
    $("#press").html("Pressure: " + pressure)

});


let cardContainer = $("#card-holder");


function updateWeather(coord) {
    $.get("http://api.openweathermap.org/data/2.5/forecast", {
        APPID: weatherKey,
        lat: coord[1],
        lon: coord[0],
        units: "imperial"
    }).done(function (data) {


        let reports = data.list;
        let html = '';
        for (let i = 0; i < reports.length; i += 8) {
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
                '<div class="card col">' +
                    '<div class="card-header">' + cardHead[0] + '</div>' +
                    '<ul class="list-group list-group-flush">' +
                        '<li class="list-group-item"><span>' + highTemp + '*F / ' + lowTemp + '*F</span><br><img src="https://openweathermap.org/img/w/' + iconCode + '.png" alt="Weather Icon"></li>' +
                        '<li class="list-group-item"><span>Description: ' + weatherDescription + '</span><br><span>Humidity: ' + humid + '%</span></li>' +
                        '<li class="list-group-item">Wind Speed: ' + windSpeed + 'mph</li>' +
                        '<li class="list-group-item">Pressure: ' + pressure + 'psi</li>' +
                    '</ul>' +
            '</div>'

        }
//        bootstrap class text-align
//inputting the card container inside the cards using .html method
        cardContainer.html(html);
    });

}

        //    creating draggable Marker that fetches coordinates
        const marker = new mapboxgl.Marker({
            draggable: true
        })
            .setLngLat([-98.2263, 29.5604])
            .addTo(map);

        //getting coordinates from marker, sending them to map
        function onDragEnd() {
            marker.setLngLat(marker.getLngLat()).addTo(map);
            console.log(marker.getLngLat());
            let markercoor = [marker.getLngLat().lng, marker.getLngLat().lat]
            updateWeather(markercoor)
            // const lngLat = marker.getLngLat();
            coordinates.style.display = 'block';
            coordinates.innerHTML = `Longitude: ${lngLat.lng}<br />Latitude: ${lngLat.lat}`;
        }
        let coord =[-98.2263, 29.5604]
updateWeather(coord)

        marker.on('dragend', onDragEnd);

// let userInput = ' ';
// geocode("#address", mapboxKey).then(function(result) {
//     console.log(result);
//     map.setCenter(result);
//     map.setZoom(10);
//     console.log(result);
//
//     $('#search').click(function (e) {
//         e.preventDefault();
//         var address = $('#address').val();
//         console.log(address);
//
//     });
// });
//
//     var submitButton = document.querySelector('#submit');
//     submitButton.addEventListener('click', updateWeather);
// });

// $('#search').click(function(e) {
//     e.preventDefault();
//     var address = $('#address').val();
//     updateWeather(coord[1], coord[0])
// };





//five day forecast
// function updateWeather(coord) {
//     let lat = coord[1];
//     let long = coord[0];
//     // let lat = 29.5604;
//     // let lng = -98.2263;
//     $.get("http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + long + "&appid=" + weatherKey + "&units=imperial").done(function (data) {
//         let lat = coord[1];
//         let long = coord[0];
//         let reports = data.list;
//         let html = '';
//         for (let i = 0; i < reports.length; i += 8) {
//             // should get 5 objects back
//             console.log(reports[i]);
//
//             //setting variables to get five day forecast from weatherMap data
//             let cardHead = reports[i].dt_txt.split(' ');
//             let highTemp = reports[i].main.temp_max;
//             let lowTemp = reports[i].main.temp_min;
//             let iconCode = reports[i].weather[0].icon;
//             let weatherDescription = reports[i].weather[0].description;
//             let humid = reports[i].main.humidity;
//             let windSpeed = reports[i].wind.speed;
//             let pressure = reports[i].main.pressure;
//
//             html +=
//                 '<div class="card"  style="width: 18rem;">' +
//                 '<div class="card-header">' + cardHead[0] + '</div>' +
//                 '<ul class="list-group list-group-flush">' +
//                 '<li class="list-group-item"><span>' + highTemp + '*F / ' + lowTemp + '*F</span><br><img src="https://openweathermap.org/img/w/' + iconCode + '.png" alt="Weather Icon"></li>' +
//                 '<li class="list-group-item"><span>Description: ' + weatherDescription + '</span><br><span>Humidity: ' + humid + '%</span></li>' +
//                 '<li class="list-group-item">Wind Speed: ' + windSpeed + 'mph</li>' +
//                 '<li class="list-group-item">Pressure: ' + pressure + 'psi</li>' +
//                 '</ul>'
//             '</div>'

//         }
//         //inputting the card container inside the cards using .html method
//         cardContainer.html(html);
//     });
// }

//    creating draggable Marker that fetches coordinates
//     const marker = new mapboxgl.Marker({
//         draggable: true
//     })
//         .setLngLat([-98.2263, 29.5604])
//         .addTo(map);

    //getting coordinates from marker, sending them to map
    // function onDragEnd() {
    //     marker.setLngLat(marker.getLngLat()).addTo(map);
    //     console.log(marker.getLngLat());
    //     let markercoor = [marker.getLngLat().lng, marker.getLngLat().lat]
    //     updateWeather(markercoor)
        // const lngLat = marker.getLngLat();
        // coordinates.style.display = 'block';
        // coordinates.innerHTML = `Longitude: ${lngLat.lng}<br />Latitude: ${lngLat.lat}`;
    // }
    //
    // marker.on('dragend', onDragEnd);


// let userInput = ' ';
//     geocode("userInput", mapboxKey, weatherKey).then(function(result) {
//         console.log(result);
//         map.setCenter(result);
//         map.setZoom(10);
//     });
// });






// function addNewLoc () {
//     let newLoc = {};
//     let newWeather = (reports[i].length) + 1;
//     newWeather.date = reports[i].dt_txt;
//     newWeather.temp = reports[i].main.temp_max + "/" + reports[i].main.temp_min;
//     newWeather.description = reports[i].weather[0].description;
//     newWeather.humidity = reports[i].main.humidity
//     newWeather.wind = reports[i].wind.speed
//     newWeather.pressure = reports[i].main.pressure
// }
//
//     reports.push(newLoc);
//     console.log(reports, newLoc)
//
//
// var submitButton = document.querySelector('#submit');
// submitButton.addEventListener('click', addNewLoc);
