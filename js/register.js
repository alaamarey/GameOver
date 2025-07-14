


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
const btnRegister = document.getElementById("btn-register");
const register = document.getElementById("register-form");
const pMsg = document.querySelector("p");


let usersList = [];
let isValid = false;



if (localStorage.getItem("users") !== null)
  usersList = JSON.parse(localStorage.getItem("users"));


register.addEventListener("submit", function (e) {
  e.preventDefault(); // must be before every logic
  setForm();
});

/// // real time Validation
register.addEventListener("input", function () {
  if (
    validation(inputs[0]) &&
    validation(inputs[1]) &&
    validation(inputs[2]) &&
    validation(inputs[3]) &&
    validation(inputs[4])
  ) {
    isValid = true;
  }
});




function setForm() {
  if (checkEmail(inputs[2].value) === false) {
    pMsg.innerHTML = null;
    const user = {
      first_name: inputs[0].value,
      last_name: inputs[1].value,
      email: inputs[2].value,
      password: inputs[3].value,
      age: inputs[4].value,
    };
    usersList.push(user);
      registerForm();
      location.href = './login.html'; 
     } else {
    pMsg.innerHTML = "Email IS Exist";
     }
}

function registerForm() {
  localStorage.setItem("users", JSON.stringify(usersList));
}

function checkEmail(email) {
  for (const user of usersList) {
    if (email === user.email) return true;
  }
  return false;
}



function validation(input) {
  let regex = {
    firstName:
      /^(?:[a-zA-Z0-9\s@,=%$#&_\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]|(?:\uD802[\uDE60-\uDE9F]|\uD83B[\uDE00-\uDEFF])){2,20}$/,
    lastName:
      /^(?:[a-zA-Z0-9\s@,=%$#&_\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]|(?:\uD802[\uDE60-\uDE9F]|\uD83B[\uDE00-\uDEFF])){2,20}$/,
    emailAddress:
      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
    password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
    age: /^([1-7][0-9]|80)$/,
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
