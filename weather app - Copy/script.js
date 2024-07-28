const btn = document.getElementById('btn');

btn.addEventListener('click', async function(){
  const cityname = document.getElementById('cityname').value;
  const apikey = '4ea2b3e551be59db1b73e23c808027e9';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${apikey}&units=metric`;
  try {
    const data = await fetchUrl(url);
    displayData(data);
    getData(data);
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
});

async function fetchUrl(url){
  const response = await fetch(url);
  if (response.ok) {
    return response.json();
  } else {
    throw new Error('Network response was not ok');
  }
}

function displayData(data){
  console.log(data);
}

function getData(data) {
  const card = document.getElementById('infos');
  const image = document.getElementById('image');
  const temp = document.getElementById('temp');
  const weatherInfo = document.getElementById('weatherinfo');
  const humidity = document.getElementById('humidity');
  const windspeed = document.getElementById('windspeed');

  if (!card || !image || !temp || !weatherInfo || !humidity || !windspeed) {
    console.error('One or more elements not found in the DOM.');
    return;
  }

  const humidityNumber = data.main.humidity;
  const tempNumber = data.main.temp;

  humidity.textContent = `${humidityNumber}% humidity`;
  temp.textContent = `${tempNumber}°C`;
  weatherInfo.textContent = data.weather[0].description;
  windspeed.textContent = `${data.wind.speed} m/s`;
  image.src = setImage(data.weather[0].id);

  card.style.display = 'block';
}

function setImage(id){
  switch(true){
    case (id >= 200 && id < 300):
      return 'img/thunderstorm.png';
    case (id >= 300 && id < 400):
      return 'img/drizzle.png';
    case (id >= 500 && id < 600):
      return 'img/rain.png';
    case (id >= 600 && id < 700):
      return 'img/snow.png';
    case (id >= 700 && id < 800):
      return 'img/mist.png';
    case (id === 800):
      return 'img/clear.png';
    case (id > 800 && id < 805):
      return 'img/cloud.png';
    default:
      return 'img/404.png';
  }
}
