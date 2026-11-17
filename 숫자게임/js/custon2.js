//html 요소 가져오기
let num = document.querySelector("#num");
let btn = document.querySelector("#btn");
let result = document.querySelector("#result");
let computerNum;
// console.log(num, btn, result)

//1부터 100까지의 숫자 만들기
function randomNum() {
  computerNum = Math.floor(Math.random() * 100) + 1;
  console.log(computerNum);
}
randomNum();

//num에 숫자를 입력하고 btn을 클릭하면 입력한 값을
// 변수에 담아야함(.value)

btn.addEventListener("click", () => {
  let player = Number(num.value);
  // console.log(player)
  if (computerNum > player) {
    result.textContent = "up";
  } else if (computerNum < player) {
    result.textContent = "down";
  } else if (computerNum == player) {
    result.textContent = "bingo";
  } else {
    result.textContent = "숫자를 입력하세요";
  }
});

num.onfocus = () => {
  num.value = "";
};
