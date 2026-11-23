let iconEls = document.querySelectorAll("li img");
let timeEls = document.querySelectorAll("li p");
let tempEls = document.querySelectorAll("li div");
let APIkey = "909590cfc9e9bd61ca0141f1c89b7b7e";
let ulEls = document.querySelectorAll("ul")

// let cityname = "seoul";
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

//현재좌표가져오기
function getLocation() {
  navigator.geolocation.getCurrentPosition(success);
}
//현재좌표 연결
async function success(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  // console.log(lat, lon);
  let res = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIkey}&units=metric&lang=kr`,
  );
  let data = await res.json();
  console.log(data);
  render(data);
}
getLocation();

//도시이름 버튼 클릭
async function weather2(cityname) {
  console.log(cityname);
  let res = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${cityname}&appid=${APIkey}&lang=kr&units=metric`,
  );
  let data = await res.json();
  console.log(data);
  render(data);
}

function render(data) {
  console.log("render", data);

  data.list.slice(0, 7).forEach((item, i) => {
    //아이콘 이미지
    let icon = item.weather[0].icon;
    let iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    iconEls[i].src = iconUrl;

    //온도
    let temp = Math.round(item.main.temp);
    tempEls[i].textContent = `${temp}℃`;

    //시간
    let time = item.dt_txt.slice(10, 16);
    timeEls[i].textContent = `${time}`;

    // ulEls.style.opacity = 1;
   document.querySelector("ul").style.opacity = 1;
  });
}
//chart 비어있는 온도배열, 시간배열을 만들어야 함.
//배열.push(temp)
//배열.push(label)
//