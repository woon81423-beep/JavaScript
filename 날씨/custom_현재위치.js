let temp = document.querySelector("#temp");
let place = document.querySelector("#place");
let wind = document.querySelector("#wind");
let des = document.querySelector("#des");
let icon = document.querySelector("#iconImg");
let APIkey = "909590cfc9e9bd61ca0141f1c89b7b7e";
let cityname = "seoul";
let user = document.querySelector("#user");
let serchBtn = document.querySelector("#serch");
//검색
function play() {
  let userCity = user.value;
  
    if (userCity === "") {
    place.textContent = "도시 이름을 입력해 주세요.";
    user.focus();
    return;
  }
  weather2(userCity);
}
serchBtn.addEventListener("click", play);
//좌표가져오기
function getLocation() {
  navigator.geolocation.getCurrentPosition(success);
}

function success(position) {
  //   console.log(position);
  //   console.log(position.coords.latitude, position.coords.longitude);

  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  weather(lat, lon);
}
//위도 좌표
async function weather(lat, lon) {
  let res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}&units=metric&lang=kr`,
  );

  await showWeather(res);
}
//도시이름
async function weather2(cityname) {
  let res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${APIkey}&lang=kr&units=metric`,
  );

  await showWeather(res);
}

async function showWeather(res) {
  let data = await res.json();

  temp.textContent = Math.round(data.main.temp);
  place.textContent = data.name;
  wind.textContent = data.wind.speed;
  des.textContent = data.weather[0].description;

  let iconImg = data.weather[0].icon;
  icon.src = `https://openweathermap.org/payload/api/media/file/${iconImg}.png`;
}

getLocation();
