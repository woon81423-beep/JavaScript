//hteml 요소 가져오기
let imgg = document.querySelector("#imgg");
let result = document.querySelector("#result");
let chance = document.querySelector("#chance");
let user = document.querySelector("#user");
let playBtn = document.querySelector("#play");
let resetBtn = document.querySelector("#reset");
let computerNum; //랜덤수
let imggg = document.querySelector("#imggg");
let chances = 7;
let userNums = [];

//1부터 100까지의 random숫자 만들기
function randomNum() {
  computerNum = Math.floor(Math.random() * 100) + 1;
  console.log(computerNum);
}
randomNum();
//사용자가 입력한 값을 가지고 옴
function play() {
  let userNum = Number(user.value);
  //
  result.style.color = "red";

  //업다운 빙고 변화
  if (userNum < 1 || userNum > 100) {
    result.textContent = "1부터 100까지의 숫자를 입력해주세요";
  } else {
    if (userNums.includes(userNum)) {
      result.textContent = "이미 입력된 숫자입니다. 다른 숫자를 입력해주세요";
    } else {
      imgg.loop = false;
      if (computerNum > userNum) {
        result.textContent = "up";
        imggg.textContent = "UP!";
        imgg.src = "image/foul_up.mp4";
      } else if (computerNum < userNum) {
        result.textContent = "down";
        imggg.textContent = "DOWN!";
        imgg.src = "image/ball.mp4";
      } else if (computerNum == userNum) {
        result.textContent = "bingo";
        imggg.textContent = "HOMERUN!";
        imgg.src = "image/homerun.mp4";
        imggg.textContent = userNum;
      } else {
        result.textContent = "숫자를 입력하세요";
        userNums.push(userNum);
        chance.textContent = "${i}번";
        user.value = "";
      }
      userNums.push(userNum);
      chance.textContent = "${i}번";
      chan();
      user.value = "";
    }
  }

  //숫자감소
  function chan() {
    chances--;

    if (chances == 0) {
      chance.textContent = `게임오버`;
      playBtn.disabled = true;
      user.disabled = true;
      result.textContent = "GAME OVER";
      imgg.src = "image/gameover.mp4";
      imggg.textContent = "";
    } else {
      chance.textContent = `남은찬스 : ${chances}번`;
    }
  }
}
playBtn.addEventListener("click", play);
//이벤트를 실행할 때 함수를 호출하려면 play옆 괄호를 버려야 함

//내용클릭 시 없애기
user.onfocus = () => {
  user.value = "";
};
//리셋
function reset() {
  playBtn.disabled = false;
  user.disabled = false;
  imgg.src = "image/ready.mp4";
  user.textContent = "1부터 100까지의 숫자를 입력해주세요";
  randomNum();
  play();
  chances = 5;
  userNums = [];
  user.value = "";
  imgg.loop = true;
  chance.textContent = `남은찬스 : ${Number(5)}번`;
}
playBtn.addEventListener("click", play);
resetBtn.addEventListener("click", reset);
//chance를 1씩 감소시키고 남은 찬스 몇개라고 출력 (숫자감소)

//이미 입력한 숫자를 입력하면 이미 입력한 숫자입니다.
// 다른 숫자를 입력해주세요 그러면서 남은 찬스에서빼지않음

// 제작순서
// html요소 가지고 오기(img, result, chance, user, play, reset)
// 1부터 100까지 랜덤한 수 만들기(randomNum)
// play라는 함수를 만들어서 사용자가 입력한 값을 가지고 옴(시작버튼, enter)
// play함수안에 사용자가 입력한 수 와 컴퓨터가 만든 수를 비교, up/down/bingo가 나오게 함, 이미지도 변경
// user 포커스하면 기존숫자 삭제
// 숫자를 입력하고 enter을 누르면 play 함수를 호출
// chance를 1씩 감소시키고 남은 찬스 몇개라고 출력, chances가 1보다 작으면 시작버튼이 비활성화. chance 자리에 gameover라는 글자 출력, 입력창도비활성화
// 재시작을 클릭하면 처음화면으로 돌아감
// **같은숫자를 입력하면 입력되었던 숫자입니다 라고 뜨고 chance가 감소되지 않음
