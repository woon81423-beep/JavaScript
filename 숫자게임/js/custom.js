//html요소 가지고오기
let result = document.querySelector("#result");
let user = document.querySelector("#user");
let play = document.querySelector("#play");
let computerNum;
// console.log(result, user, play)
//1부터 100까지의 수를 함수를 이용해서 만들기
function randomNum() {
  computerNum = Math.floor(Math.random() * 100) + 1;
  console.log(computerNum);
}
randomNum();
//함수명은 randomNum
//시작버튼을 클릭
play.addEventListener("click", () => {
  let userNum = Number(user.value);
  // console.log(typeof userNum)

  if (computerNum > userNum) {
    // console.log("up");
    result.textContent = "up";
  } else if (computerNum < userNum) {
    // console.log("down");
    result.textContent = "down";
  } else if (computerNum == userNum) {
    // console.log("bingo");
    result.textContent = "bingo";
  } else {
    // console.log("잘못입력하셨습니다.");
    result.textContent = "숫자를 입력하세요";
  }
});
//입력한 내용 지우기
user.onfocus = () => {
  user.value = "";
};
