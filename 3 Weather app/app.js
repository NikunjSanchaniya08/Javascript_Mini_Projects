//sets weather icon
function getWeatherIcon(desc) {
  if (desc.includes("sun") || desc.includes("clear")) {
    return "https://openweathermap.org/img/wn/01d@2x.png";
  } else if (desc.includes("cloud")) {
    return "https://openweathermap.org/img/wn/03d@2x.png";
  } else if (desc.includes("rain")) {
    return "https://openweathermap.org/img/wn/09d@2x.png";
  } else if (desc.includes("thunder")) {
    return "https://openweathermap.org/img/wn/11d@2x.png";
  } else if (desc.includes("snow")) {
    return "https://openweathermap.org/img/wn/13d@2x.png";
  } else if (desc.includes("mist") || desc.includes("fog")) {
    return "https://openweathermap.org/img/wn/50d@2x.png";
  } else {
    return "https://openweathermap.org/img/wn/02d@2x.png"; // default
  }
}

async function getWeather() {
  const get_City = document.querySelector("#city");
  const city_name = document.querySelector("#city-name");
  const temperature = document.querySelector("#temperature");
  const weather_description = document.querySelector("#weather-description");
  const humidity = document.querySelector("#humidity");
  const wind = document.querySelector("#wind");

  const set_city = get_City.value;

  url = `https://wttr.in/${set_city}?format=j1`;

  let response = await fetch(url);
  let data = await response.json();
  // console.log(data);

  city_name.innerText = data.nearest_area[0].areaName[0].value; //sets city name

  // sets temperature
  let t = data.current_condition[0].temp_C;
  temperature.innerText = `Temperature: ${t}°C`;

  // sets weather_description
  let wd = data.current_condition[0].weatherDesc[0].value;
  weather_description.innerText = `Description: ${wd}`;

  // sets humidity
  let h = data.current_condition[0].humidity;
  humidity.innerText = `Humidity: ${h}%`;

  //sets wind
  let w = data.current_condition[0].windspeedKmph;
  wind.innerText = `Wind: ${w} km/h`;

  const iconURL = getWeatherIcon(wd);
  document.querySelector("#weather-icon").src = iconURL;
  document.querySelector("#weather-icon").alt = wd;
}
