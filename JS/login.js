const emailContainer = document.querySelector(".email");
const pwContainer = document.querySelector(".pw");
const loginBtn = document.querySelector(".login-btn");
const emailInput = document.querySelector(".email input");
const pwInput = document.querySelector(".pw input");
const pwIcon = document.querySelector(".con .pw-icon");

let isShow = false;

pwIcon.addEventListener("click", () => {
  if (isShow) {
    pwIcon.src = "../login/assets/show-pw.png";
    pwInput.setAttribute("type", "text");
  } else {
    pwIcon.src = "../login/assets/non-show-pw.png";
    pwInput.setAttribute("type", "password");
  }
  isShow = !isShow;
});

const handleInput = (test, element) => {
  if (!test) {
    element.classList.add("wrong");
    if (element.type === "email") {
      if (emailContainer.children.length > 2) {
        emailContainer.removeChild(emailContainer.lastChild);
      }
      const wrongEmail = document.createElement("p");
      wrongEmail.classList.add("wrong-email");
      if (element.value === "") {
        wrongEmail.textContent = "이메일을 입력해주세요";
      } else {
        wrongEmail.textContent = "잘못된 이메일 형식입니다";
      }
      emailContainer.append(wrongEmail);
    } else if (element.type === "password") {
      if (pwContainer.children.length > 2) {
        pwContainer.removeChild(pwContainer.lastChild);
      }
      const wrongPw = document.createElement("p");
      wrongPw.classList.add("wrong-pw");
      if (element.value === "") {
        wrongPw.textContent = "비밀번호를 입력해주세요";
      } else {
        wrongPw.textContent = "비밀번호를 8자 이상 입력해주세요";
      }
      pwContainer.append(wrongPw);
    }
  } else {
    element.classList.remove("wrong");
    if (emailContainer.children.length > 2) {
      emailContainer.removeChild(emailContainer.lastChild);
    } else if (pwContainer.children.length > 2) {
      pwContainer.removeChild(pwContainer.lastChild);
    }
  }
};

const isValidEmail = () => {
  const isValid = /[a-z0-9]+@[a-z]+.[a-z]{2,3}/;
  const test = isValid.test(emailInput.value);
  handleInput(test, emailInput);
};

const isValidPw = () => {
  const isValid = /.{8,}/;
  const test = isValid.test(pwInput.value);
  handleInput(test, pwInput);
};

emailInput.addEventListener("focusout", isValidEmail);
pwInput.addEventListener("focusout", isValidPw);
