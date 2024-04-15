
// function getWeather() {
//     const apiKey = 'd42916ebd9e4a801686dc2d112bdfcc1';
//     const city = document.getElementById('city').value;

//         if (!city) {
//             alert('Please enter a city');
//             return;
//         }
    
//         const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
//         const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
    
//         fetch(currentWeatherUrl)
//             .then(response => response.json())
//             .then(data => {
//                 displayWeather(data);
//             })
//             .catch(error => {
//                 console.error('Error fetching current weather data:', error);
//                 alert('Error fetching current weather data. Please try again.');
//             });
    
//         fetch(forecastUrl)
//             .then(response => response.json())
//             .then(data => {
//                 displayHourlyForecast(data.list);
//             })
//             .catch(error => {
//                 console.error('Error fetching hourly forecast data:', error);
//                 alert('Error fetching hourly forecast data. Please try again.');
//             });
//     }
    
//     function displayWeather(data) {
//         const tempDivInfo = document.getElementById('temp-div');
//         const weatherInfoDiv = document.getElementById('weather-info');
//         const weatherIcon = document.getElementById('weather-icon');
//         const hourlyForecastDiv = document.getElementById('hourly-forecast');
    
//         weatherInfoDiv.innerHTML = '';
//         hourlyForecastDiv.innerHTML = '';
//         tempDivInfo.innerHTML = '';
    
//         if (data.cod === '404') {
//             weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
//         } else {
//             const cityName = data.name;
//             const temperature = Math.round(data.main.temp - 273.15); 
//             const description = data.weather[0].description;
//             const iconCode = data.weather[0].icon;
//             const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
    
//             const temperatureHTML = `
//                 <p>${temperature}°C</p>
//             `;
    
//             const weatherHtml = `
//                 <p>${cityName}</p>
//                 <p>${description}</p>
//             `;
    
//             tempDivInfo.innerHTML = temperatureHTML;
//             weatherInfoDiv.innerHTML = weatherHtml;
//             weatherIcon.src = iconUrl;
//             weatherIcon.alt = description;
    
//             showImage();
//         }
//     }
    
//     function displayHourlyForecast(hourlyData) {
//         const hourlyForecastDiv = document.getElementById('hourly-forecast');
    
//         const next24Hours = hourlyData.slice(0, 8); 
    
//         next24Hours.forEach(item => {
//             const dateTime = new Date(item.dt * 1000); 
//             const hour = dateTime.getHours();
//             const temperature = Math.round(item.main.temp - 273.15); 
//             const iconCode = item.weather[0].icon;
//             const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;
    
//             const hourlyItemHtml = `
//                 <div class="hourly-item">
//                     <span>${hour}:00</span>
//                     <img src="${iconUrl}" alt="Hourly Weather Icon">
//                     <span>${temperature}°C</span>
//                 </div>
//             `;
    
//             hourlyForecastDiv.innerHTML += hourlyItemHtml;
//         });
//     }
    
//     function showImage() {
//         const weatherIcon = document.getElementById('weather-icon');
//         weatherIcon.style.display = 'block'; 
// }


const apiKey = 'd42916ebd9e4a801686dc2d112bdfcc1';

function getWeather() {
    const city = document.getElementById('city').value;

    if (!city) {
        alert('Please enter a city');
        return;
    }

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error fetching current weather data:', error);
            alert('Error fetching current weather data. Please try again.');
        });

    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            displayHourlyForecast(data.list);
        })
        .catch(error => {
            console.error('Error fetching hourly forecast data:', error);
            alert('Error fetching hourly forecast data. Please try again.');
        });
}

function displayWeather(data) {
    const tempDivInfo = document.getElementById('temp-div');
    const weatherInfoDiv = document.getElementById('weather-info');
    const weatherIcon = document.getElementById('weather-icon');
    const hourlyForecastDiv = document.getElementById('hourly-forecast');

    weatherInfoDiv.innerHTML = '';
    hourlyForecastDiv.innerHTML = '';
    tempDivInfo.innerHTML = '';

    if (data.cod === '404') {
        weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
    } else {
        const cityName = data.name;
        const temperature = Math.round(data.main.temp); 
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

        const temperatureHTML = `<p>${temperature}°C</p>`;
        const weatherHtml = `<p>${cityName}</p><p>${description}</p>`;

        tempDivInfo.innerHTML = temperatureHTML;
        weatherInfoDiv.innerHTML = weatherHtml;
        weatherIcon.src = iconUrl;
        weatherIcon.alt = description;

        showImage();
    }
}

function displayHourlyForecast(hourlyData) {
    const hourlyForecastDiv = document.getElementById('hourly-forecast');

    hourlyForecastDiv.innerHTML = '';

    for (let i = 0; i < 8; i++) {
        const item = hourlyData[i];
        const dateTime = new Date(item.dt * 1000); 
        const hour = dateTime.getHours();
        const temperature = Math.round(item.main.temp); 
        const iconCode = item.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

        const hourlyItem = document.createElement('div');
        hourlyItem.classList.add('hourly-item');

        const hourSpan = document.createElement('span');
        hourSpan.textContent = `${hour}:00`;

        const img = document.createElement('img');
        img.src = iconUrl;
        img.alt = 'Hourly Weather Icon';

        const tempSpan = document.createElement('span');
        tempSpan.textContent = `${temperature}°C`;

        hourlyItem.appendChild(hourSpan);
        hourlyItem.appendChild(img);
        hourlyItem.appendChild(tempSpan);

        hourlyForecastDiv.appendChild(hourlyItem);
    }
}


function showImage() {
    const weatherIcon = document.getElementById('weather-icon');
    weatherIcon.style.display = 'block'; 
}

//GPS function

var target = document.getElementById('target');
var watchId;

function appendLocation(location, verb) {
    verb = verb || 'updated';
    var newLocation = document.createElement('p');
    newLocation.innerHTML = 'Location ' + verb + ': ' + location.coords.latitude + ', ' + location.coords.longitude + '';
    target.appendChild(newLocation);
}

if ('geolocation' in navigator) {
    document.getElementById('askButton').addEventListener('click', function () {
        navigator.geolocation.getCurrentPosition(function (location) {
            const latitude = location.coords.latitude;
            const longitude = location.coords.longitude;
            searchCityByCoord(latitude, longitude);
        });
    });
} else {
    target.innerText = 'Geolocation API not supported.';
}

async function searchCityByCoord(latitude, longitude) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`);
        const data = await response.json();
        displayWeather(data);

        const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`);
        const forecastData = await forecastResponse.json();
        displayHourlyForecast(forecastData.list);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('Error fetching weather data. Please try again.');
    }
}

document.getElementById('askButton').addEventListener('click', function () {
    navigator.geolocation.getCurrentPosition(function (location) {
        const latitude = location.coords.latitude;
        const longitude = location.coords.longitude;
        searchCityByCoord(latitude, longitude);
    });
});



//CSS function

function createStars() {
    for (let i = 0; i < 100; i++) {
        let star = document.createElement('div');
        star.className = 'star';
        star.style.top = Math.random() * window.innerHeight + 'px';
        star.style.left = Math.random() * window.innerWidth + 'px';
        star.style.animationDelay = Math.random() * 3 + 's';
        star.style.animationDuration = Math.random() * 3 + 1 + 's';
        document.body.appendChild(star);
    }
}

createStars();