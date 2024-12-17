//https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/london?key=7GHLANZJ3PCUYY5Z7RMJZRV8W
//console.log(inputValue);
const weatherContainer = document.querySelector(".weather");

async function getWeather(city) {
  try {
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
    return weatherData;
  } catch (err) {
    console.log("Error: " + err.message);
  }
}

function displayWeatherData(weatherData) {
  if (weatherData) {
    document.querySelector("#conditions .elements").textContent =
      "Conditions: ";
    document.querySelector(
      "#conditions .weather-data"
    ).textContent = `${weatherData.currentConditions.conditions}`;

    document.querySelector("#feels-like .elements").textContent =
      "Feels Like: ";
    document.querySelector(
      "#feels-like .weather-data"
    ).textContent = `${weatherData.currentConditions.feelslike} C`;

    document.querySelector("#humidity .elements").textContent = "Humidity: ";
    document.querySelector(
      "#humidity .weather-data"
    ).textContent = `${weatherData.currentConditions.humidity}%`;

    document.querySelector(
      "#precipitation .elements"
    ).textContent = `Precipitation: `;
    document.querySelector(
      "#precipitation .weather-data"
    ).textContent = `${weatherData.currentConditions.precip} mm`;

    document.querySelector(
      "#precipitation-probability .elements"
    ).textContent = `Precipitation probability: `;
    document.querySelector(
      "#precipitation-probability .weather-data"
    ).textContent = `${weatherData.currentConditions.precipprob}%`;

    document.querySelector("#sunrise .elements").textContent = `Sunrise: `;
    document.querySelector(
      "#sunrise .weather-data"
    ).textContent = `${weatherData.currentConditions.sunrise}`;

    document.querySelector("#sunset .elements").textContent = `Sunset: `;
    document.querySelector(
      "#sunset .weather-data"
    ).textContent = `${weatherData.currentConditions.sunset}`;

    document.querySelector(
      "#temperature .elements"
    ).textContent = `Temperature: `;
    document.querySelector(
      "#temperature .weather-data"
    ).textContent = `${weatherData.currentConditions.temp} C`;

    document.querySelector("#uv .elements").textContent = `UV Index:`;
    document.querySelector(
      "#uv .weather-data"
    ).textContent = `${weatherData.currentConditions.uvindex}`;
  }
}

function generateHeadline(city) {
  document.querySelector(
    "h1.location"
  ).textContent = `Current Weather for ${city}`;
}

function getWeatherIcon(weatherData) {
  const iconData = weatherData.currentConditions.icon;
  if (weatherData) {
    const iconContainer = document.querySelector(".icon");
    iconContainer.textContent = "";
    const svgElem = document.createElement("object");
    svgElem.type = "image/svg+xml";
    svgElem.data = `/icons/${iconData}.svg`;
    svgElem.style.width = "50px";
    svgElem.style.height = "50px";
    iconContainer.appendChild(svgElem);
  }
}

const submitBtn = document.querySelector("#submit");
submitBtn.addEventListener("click", async () => {
  const inputValue = document.querySelector("#city").value;
  console.log(typeof inputValue);
  if (inputValue.trim().length === 0) {
    console.log("Please enter a city.");
  } else {
    const weatherData = await getWeather(inputValue);
    generateHeadline(weatherData.resolvedAddress);
    getWeatherIcon(weatherData);
    displayWeatherData(weatherData);
    console.log(weatherData);
  }
});
