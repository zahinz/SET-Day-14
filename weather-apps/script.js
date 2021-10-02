console.log(`TEST`);

// / ? variable declaration
let apiKey = '6ff81ef2a129ecb05589ded927551c32';
let dayNow = document.getElementById(`day`)
let dateNow = document.getElementById(`date`)
let timeNow = document.getElementById(`time`)
let locationNow = document.getElementById(`location`)
let weatherNow = document.getElementById(`weather`)
let descNow = document.getElementById(`descWeather`)
let tempNow = document.getElementById(`temp`)
let humidityNow = document.getElementById(`humidity`)
let iconNow = document.getElementById(`todayWeatherIcon`)
let leftContainer = document.getElementById(`left`)

let otherDays = document.getElementsByClassName(`other-days`)
let otherWeather = document.getElementsByClassName(`other-weather`)
let otherTemp = document.getElementsByClassName(`other-temp`)
let otherHumidity = document.getElementsByClassName(`other-humidity`)
let otherIcon = document.getElementsByClassName(`weather-icon`)

// Humanised string and remove underscore
function humanize(str) {
    var i, frags = str.split('_');
    for (i=0; i<frags.length; i++) {
      frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
    }
    return frags.join(' ');
}


// icon selector 
function iconSelector (num, arr) {
    if (num >= 801 && num <= 804) {
        iconNow.setAttribute("src", "assets/cloudy-2.png")
        leftContainer.style.backgroundColor = "#60678b"
    }
    else if (num == 800) {
        iconNow.setAttribute("src", "assets/clear-day.png")
        leftContainer.style.backgroundColor = "#fffeb1"
    } 
    else if (num >= 500 && num <= 531) {
        iconNow.setAttribute("src", "assets/rain.png")
        leftContainer.style.backgroundColor = "#60678b"
    } 
    else if (num >= 300 && num <= 321) {
        iconNow.setAttribute("src", "assets/drizzle.png")
        leftContainer.style.backgroundColor = "#60678b"
    } 
    else if (num >= 200 && num <= 232) {
        iconNow.setAttribute("src", "assets/storm.png")
        leftContainer.style.backgroundColor = "#60678b"
    }
}

function otherIconSelector (num, arr) {
    if (num >= 801 && num <= 804) {
        otherIcon[arr].setAttribute("src", "assets/cloudy-2.png")
    }
    else if (num == 800) {
        otherIcon[arr].setAttribute("src", "assets/clear-day.png")
    } 
    else if (num >= 500 && num <= 531) {
        otherIcon[arr].setAttribute("src", "assets/rain.png")
    } 
    else if (num >= 300 && num <= 321) {
        otherIcon[arr].setAttribute("src", "assets/drizzle.png")
    } 
    else if (num >= 200 && num <= 232) {
        otherIcon[arr].setAttribute("src", "assets/storm.png")
    }
}



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
        console.log("RAW data from open weather", data)

        // TODAY
        let rawTime = data.current.dt
        // ? to add .unix after using moment
        // * using moment.js package
        let day = moment.unix(rawTime).format('dddd')
        let date = moment.unix(rawTime).format('Do MMM YYYY')
        let time = moment.unix(rawTime).format('LT')
        let sunrise = moment.unix(data.current.sunrise).format('LT')
        let sunset = moment.unix(data.current.sunset).format('LT')

        let location = humanize(data.timezone).replaceAll("Asia/", "");
        let weatherId = data.current.weather[0].id
        let weather = data.current.weather[0].main
        let description = data.current.weather[0].description
        let humidity = data.current.humidity;
        let temp = Math.round((data.current.temp)-273.15)


        // TODAY LOGS
        console.log(day);
        console.log(date);
        console.log(time);
        console.log(sunrise);
        console.log(sunset);
        console.log(location);
        console.log(weatherId); // plan using if else statement using weather varible
        console.log(weather);
        console.log(description);
        console.log(humidity); //calculate in percentage
        console.log(temp);


        // RETURN AS INNER HTML
        
        dayNow.innerHTML = day
        dateNow.innerHTML = date
        timeNow.innerHTML = time
        locationNow.innerHTML = location
        weatherNow.innerHTML = weather 
        descNow.innerHTML = description
        tempNow.innerHTML = temp
        humidityNow.innerHTML = humidity

        iconSelector(weatherId)



        // Other days 
        for (let i = 0; i < 7; i++) {
        
            dayNew = moment.unix(data.daily[i+1].dt).format('dddd')
            weatherNew = data.daily[i+1].weather[0].description
            weatherIdNew = data.daily[i+1].weather[0].id
            tempNew = Math.round((data.daily[i+1].temp.day)-273.15)
            humidityNew = data.daily[i+1].humidity

            console.log(dayNew);
            console.log(weatherNew);
            console.log(weatherIdNew);
            console.log(tempNew);
            console.log(humidityNew);

            otherDays[i].innerHTML = dayNew
            otherWeather[i].innerHTML = weatherNew
            otherTemp[i].innerHTML = tempNew
            otherHumidity[i].innerHTML = humidityNew

            otherIconSelector(weatherIdNew, i)

        }
    
    
    }
    )

}




// ? SWITCH LOCATION WHEN PRESS BUTTON

// function switchLocation (location) {

//     fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`)
//     .then(res => res.json())
//     .then(data => {
//         console.log('current city', data);

//          // TODAY
//          let rawTime = data.dt
//          // ? to add .unix after using moment
//          // * using moment.js package
//          let day = moment.unix(rawTime).format('dddd')
//          let date = moment.unix(rawTime).format('Do MMM YYYY')
//          let time = moment.unix(rawTime).format('LT')
//          let sunrise = moment.unix(data.sys.sunrise).format('LT')
//          let sunset = moment.unix(data.sys.sunset).format('LT')
 
//          let location = data.name
//          let weatherId = data.weather[0].id
//          let weather = data.weather[0].main
//          let description = data.weather[0].description
//          let humidity = data.main.humidity;
//          let temp = Math.round((data.main.temp)-273.15)
 
 
//          // TODAY LOGS
//          console.log(day);
//          console.log(date);
//          console.log(time);
//          console.log(sunrise);
//          console.log(sunset);
//          console.log(location);
//          console.log(weatherId); // plan using if else statement using weather varible
//          console.log(weather);
//          console.log(description);
//          console.log(humidity); 
//          console.log(temp);
 
 
//          // RETURN AS INNER HTML
         
//          dayNow.innerHTML = day
//          dateNow.innerHTML = date
//          timeNow.innerHTML = time
//          locationNow.innerHTML = location
//          weatherNow.innerHTML = weather 
//          descNow.innerHTML = description
//          tempNow.innerHTML = temp
//          humidityNow.innerHTML = humidity
//     })
// }



function switchLocation (location) {
    switch (location) {
        case 'Kuala Lumpur':
            lat = 3.1390
            long = 101.6869
            newLocation = location
            break;
    
        case 'Johor Bahru':
            lat = 1.4927
            long = 103.7414
            newLocation = location
            break;  
            
        case 'Ipoh':
            lat = 4.5975
            long = 101.0901
            newLocation = location
            break;

        case 'Pulau Pinang':
            lat = 5.4164
            long = 100.3327
            newLocation = location
            break;

        case 'Sabah':
            lat = 5.9788
            long = 116.0753
            newLocation = location
            break;

        case 'Sarawak':
            lat = 1.5533
            long = 110.3592
            newLocation = location
            break;
    }
    console.log(lat, long, newLocation);

    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => {
        console.log("RAW data from open weather", data)

        // TODAY
        let rawTime = data.current.dt
        // ? to add .unix after using moment
        // * using moment.js package
        let day = moment.unix(rawTime).format('dddd')
        let date = moment.unix(rawTime).format('Do MMM YYYY')
        let time = moment.unix(rawTime).format('LT')
        let sunrise = moment.unix(data.current.sunrise).format('LT')
        let sunset = moment.unix(data.current.sunset).format('LT')

        let location = humanize(data.timezone).replaceAll("Asia/", "");
        let weatherId = data.current.weather[0].id
        let weather = data.current.weather[0].main
        let description = data.current.weather[0].description
        let humidity = data.current.humidity;
        let temp = Math.round((data.current.temp)-273.15)


        // TODAY LOGS
        console.log(day);
        console.log(date);
        console.log(time);
        console.log(sunrise);
        console.log(sunset);
        console.log(location);
        console.log(weatherId); // plan using if else statement using weather varible
        console.log(weather);
        console.log(description);
        console.log(humidity); //calculate in percentage
        console.log(temp);


        // RETURN AS INNER HTML
        
        dayNow.innerHTML = day
        dateNow.innerHTML = date
        timeNow.innerHTML = time
        locationNow.innerHTML = newLocation
        weatherNow.innerHTML = weather 
        descNow.innerHTML = description
        tempNow.innerHTML = temp
        humidityNow.innerHTML = humidity

        iconSelector(weatherId)


        // Other days 
        for (let i = 0; i < 7; i++) {
        
            dayNew = moment.unix(data.daily[i+1].dt).format('dddd')
            weatherNew = data.daily[i+1].weather[0].description
            weatherIdNew = data.daily[i+1].weather[0].id
            tempNew = Math.round((data.daily[i+1].temp.day)-273.15)
            humidityNew = data.daily[i+1].humidity

            console.log(dayNew);
            console.log(weatherNew);
            console.log(weatherIdNew);
            console.log(tempNew);
            console.log(humidityNew);

            otherDays[i].innerHTML = dayNew
            otherWeather[i].innerHTML = weatherNew
            otherTemp[i].innerHTML = tempNew
            otherHumidity[i].innerHTML = humidityNew

            otherIconSelector(weatherIdNew, i)
        }
    
    
    }
    )
}


