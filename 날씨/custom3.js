let temp = document.querySelector("#temp");
let place = document.querySelector("#place");
let wind = document.querySelector("#wind");
let des = document.querySelector("#des");
let cityname = "seoul";
let APIkey = "909590cfc9e9bd61ca0141f1c89b7b7e";
let lang = "kr";
let iconImg = document.querySelector("#iconImg");

async function weather() {
  let res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${APIkey}&lang=kr&units=metric`,
  );
  let data = await res.json();
  console.log(data);
  //온도
  temp.textContent = data.main.temp;
  //위치
  place.textContent = data.name;
  //풍속
  wind.textContent = data.wind.speed;
  //날씨설명
  des.textContent = data.weather[0].description;

  //아이콘
  let icon = data.weather[0].icon;
  let iconUrl = `https://openweathermap.org/payload/api/media/file/${icon}.png`
  iconImg.src = iconUrl;
}
weather()