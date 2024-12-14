//https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/london?key=7GHLANZJ3PCUYY5Z7RMJZRV8W
//console.log(inputValue);
const text = document.querySelector(".weather");
/* fetch(
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/london?key=7GHLANZJ3PCUYY5Z7RMJZRV8W",
  {
    mode: "cors",
    }
    )
    .then(function (response) {
      return response.json();
      })
      .then(function (response) {
        console.log(response);
        }); */

async function getWeather(city) {
  try {
    // const inputValue = document.querySelector("#city").value;
    // // if (inputValue.trim().length == 0 || inputValue == "") {
    // //   ("Please enter a city.");
    // // }
    // console.log(inputValue);
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=7GHLANZJ3PCUYY5Z7RMJZRV8W`,
      {
        mode: "cors",
      }
    );
    if (response.length === 0) {
      throw new Error(`Response status: ${response.status} or no results`);
    }
    const weatherData = await response.json();
    //console.log(weatherData.currentConditions);
    return weatherData.currentConditions;
  } catch (err) {
    console.log("Error: " + err.message);
  }
}

function displayWeatherData(weatherData) {
  if (weatherData) {
    document.querySelector(
      "#conditions"
    ).textContent = `Conditions: ${weatherData.conditions}`;
    document.querySelector(
      "#feels-like"
    ).textContent = `Feels-like: ${weatherData.feelslike}C`;
    document.querySelector(
      "#humidity"
    ).textContent = `Humidity: ${weatherData.humidity}%`;
    document.querySelector(
      "#precipitation"
    ).textContent = `Precipitation: ${weatherData.precip}mm`;
    document.querySelector(
      "#precipitation-probability"
    ).textContent = `Precipitation probability: ${weatherData.precipprob}%`;
    document.querySelector(
      "#sunrise"
    ).textContent = `Sunrise: ${weatherData.sunrise}`;
    document.querySelector(
      "#sunset"
    ).textContent = `Sunset: ${weatherData.sunset}`;
    document.querySelector(
      "#temperature"
    ).textContent = `Temperature: ${weatherData.temp}`;
    document.querySelector(
      "#uv"
    ).textContent = `UV Index: ${weatherData.uvindex}`;
  }
}

const submitBtn = document.querySelector("#submit");
submitBtn.addEventListener("click", async () => {
  const inputValue = document.querySelector("#city").value;
  console.log(inputValue);
  if (inputValue.trim().length === 0) {
    console.log("Please enter a city.");
  } else {
    const weatherData = await getWeather(inputValue);
    displayWeatherData(weatherData);
    console.log(weatherData);
  }
});
