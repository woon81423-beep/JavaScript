let iconEls = document.querySelectorAll("li img");
let timeEls = document.querySelectorAll("li p");
let tempEls = document.querySelectorAll("li div");
let APIkey = "909590cfc9e9bd61ca0141f1c89b7b7e";
let ulEls = document.querySelectorAll("ul");
let user = document.querySelector("#user"); //도시입력창
let serchBtn = document.querySelector("#serch"); //도시버튼
let weatherChart;
//검색
function play() {
  let userCity = user.value;

  if (userCity === "") {
    placeholder.textContent = "도시 이름을 입력해 주세요.";
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
  // console.log(data);
  render(data);
}
getLocation(); //현재위치 보내기 실행

//도시이름 버튼 클릭
async function weather2(cityname) {
  console.log(cityname);
  let res = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${cityname}&appid=${APIkey}&lang=kr&units=metric`,
  );
  let data = await res.json();
  // console.log(data);
  render(data);
}

function render(data) {
  console.log("render", data);
  // 날씨에 따라 맨 아래 이미지 변경
    let weather = data.list[0].weather[0].main;
    let weatherImg = document.querySelector("#weatherImg");

    if (
      weather === "Rain" ||
      weather === "Drizzle" ||
      weather === "Thunderstorm"
    ) {
      weatherImg.src = "img/rain.png";
    } else if (weather === "Snow") {
      weatherImg.src = "img/winter.png";
    } else if (weather === "Clouds") {
      weatherImg.src = "img/grooming.png";
    } else {
      weatherImg.src = "img/sunny.png";
    }
  //차트
  let chartTime = []; // 차트 시간 배열
  let chartTemp = []; // 차트 온도 배열

  data.list.slice(0, 7).forEach((item, i) => {
    //아이콘 이미지
    let icon = item.weather[0].icon;
    let iconUrl = `https://openweathermap.org/img/wn/${icon}.png`;
    iconEls[i].src = iconUrl;

    //온도
    let temp = Math.round(item.main.temp);
    tempEls[i].textContent = `${temp}℃`;

    //시간
    let time = item.dt_txt.slice(10, 16);
    timeEls[i].textContent = `${time}`;
    //그립삽화
    

    //차트기온
    chartTime.push(time);
    chartTemp.push(temp);
    // console.log(chartTemp);
  });

  // ulEls.style.opacity = 1;
  document.querySelector("ul").style.opacity = 1;

  const ctx = document.getElementById("myChart");

  if (weatherChart) {
    //생성한 차트를 저장
    weatherChart.destroy();
  }

  weatherChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: chartTime, //가로축에 표시할 내용 앞에서 만들 배열 가져오기(시간)
      datasets: [
        //차트에 표시할 데이터 묶음, 여러개의 데이터 묶음을 넣으면 여러 선을 그릴 수 있음.
        {
          label: "Hourly Temperature",
          data: chartTemp, //실제로 그래프에 표시할 숫자
          borderWidth: 2, //그래프 선의 두께
          pointRadius: 3, //점의 크기
          // pointHoverBackgroundColor: "red",
          // pointHoverRadius: "3px",
        },
      ],
    },
    plugins: [ChartDataLabels], //차트에 추가 기능적용(그래프 위에 숫자 직접표시)
    options: {
      //차트의 세부 설정
      responsive: true, //화면 크기에 맞춰 차트 크기를 자동으로 조절(false:반응형 미적용)
      plugins: {
        datalabels: {
          display: true, //데이터 숫자를 표시할지 결정(false:숨기기)
          color: "#777", //표시되는 글자 색상
          anchor: "top", //숫자를 점 기준으로 어디에 고정
          align: "top", //점 기준으로 어느 방향에 표시될지 설정
          offset: 10,

          formatter: function (value) {
            return value + "℃"; //결과에 도씨를 붙여서 보여줌
          },
        },
      },
      scales: {
        //축 설정
        y: {
          //세로축 설정
          beginAtZero: true, //세로축의 최솟값을 0부터 시작할지 결정
        },
      },
    },
  });
}
//chart 비어있는 온도배열, 시간배열을 만들어야 함.
//배열.push(temp)
//배열.push(label)

//차트
