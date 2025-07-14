

let mode = document.getElementById("mode");

if (localStorage.getItem("theme") !== null) {
  const theme = localStorage.getItem("theme");

  document.documentElement.dataset.theme = theme;

  if (theme == "light") mode.classList.replace("fa-sun", "fa-moon");
  else mode.classList.replace("fa-moon", "fa-sun");
}

mode.addEventListener("click", function () {
  if (mode.classList.contains("fa-sun")) {
    document.documentElement.setAttribute("data-theme", "light");
    mode.classList.replace("fa-sun", "fa-moon");
    localStorage.setItem("theme", "light");
  } else {
    document.documentElement.setAttribute("data-theme", "dark");
    mode.classList.replace("fa-moon", "fa-sun");
    localStorage.setItem("theme", "dark");
  }
});


const inputs = document.querySelectorAll("input");
const btnLogin = document.getElementById("btn-login");
const login = document.getElementById("login-form");
const pMsg = document.querySelector("p");

let usersList = [];
let isValid = false;

if (localStorage.getItem("users") !== null)
  usersList = JSON.parse(localStorage.getItem("users"));

login.addEventListener("submit", function (e) {
  e.preventDefault();

  if (checkEmail(inputs[0].value)) {
    location.href = "./home.html";
  } else {
    pMsg.innerHTML = "Incorrect Email Or Password .";
  }
});

login.addEventListener("input", function () {
  if (validation(inputs[0]) && validation(inputs[1])) {
    isValid = true;
  }
});

function checkEmail(email) {
  for (const user of usersList) {
    if (email === user.email) return true;
  }
  return false;
}

function validation(input) {
  let regex = {
    emailAddress:
      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
    password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
  };

  if (regex[input.id].test(input.value)) {
    input.classList.add("is-valid");
    input.classList.remove("is-invalid");

    return true;
  }

  input.classList.remove("is-valid");
  input.classList.add("is-invalid");
  return false;
}
