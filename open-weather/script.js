console.log(`TEST`);

// ? variable declaration
let apiKey = '6ff81ef2a129ecb05589ded927551c32';
let locationNow = document.getElementById(`locationNow`)
let todayNow = document.getElementById(`todayNow`)
let weatherNow = document.getElementById(`weatherNow`)



// ? using browser to get the location
if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition)
}
else {
    alert('Browser not support geolocation')
}

// ? call the function
function showPosition(position) {
    console.log('My location is:', position);
    callWeatherApi(position)
}

// ? call weatherApi
function callWeatherApi(pos) {

    

    // ? get the latitude and longitude
    let lat = pos.coords.latitude
    let long = pos.coords.longitude
    console.log(lat, long);


    // ? function to call API
    // * fetch() + template string
    // * third party axios()


    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => {
    console.log(data)
    let location = data.timezone;
    let humidity = data.current.humidity;
    let date = data.current.dt
    // ? to add .unix after using moment
    // * using moment.js package
    let newDate = moment.unix(date).format('dddd')

    //   START WRITE CODE HERE


    console.log(location);
    console.log(humidity);
    console.log(date);
    console.log(newDate);
    }
    )

}




// ?

function currentApi (location) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`)
    .then(res => res.json())
    .then(data => {
        console.log('current city', data);
    })
}

currentApi ('Kuala Lumpur')



let arr = [1, 2, 3, 4]
console.log(arr.length);
arr.length = 2
console.log(arr.length);
console.log(arr);



