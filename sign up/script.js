const formEl = document.querySelector("form");
const inputEl = document.querySelectorAll("input");
const validationEl = document.querySelectorAll(".validation");

const usersL = JSON.parse(localStorage.getItem("users"));

inputEl.forEach((d) => {
  d.addEventListener("click", () => {
    validationEl[0].innerText = "";
    validationEl[1].innerText = "";
    validationEl[2].innerText = "";
  });
});

formEl.addEventListener("submit", (e) => {
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const confirm_password = document.getElementById("confirm-password");

  const userDetails = usersL.filter((d) => d.email === email.value);
  if (userDetails.length) {
    validationEl[0].innerText = "Email Alredy Taken";
    email.focus();
    e.preventDefault();
    return;
  }
  if (!email.value.match(/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{3,4}$/)) {
    validationEl[0].innerText = "Enter valid email";
    email.focus();
    if (password.value.length < 6) {
      validationEl[1].innerText = "Password Minimum Length is 6 ";
      password.focus();
      if (password.value != confirm_password.value) {
        validationEl[2].innerText = "Password Not Matched";
        confirm_password.focus();
        return;
      }
      return;
    }
    return;
  }
  const new_user = { email: email.value, password: password.value };
  usersL.push(new_user);
  localStorage.setItem("users", JSON.stringify(usersL));
  loading();
  e.preventDefault();
});

function redirecting() {
  if (window.location.hostname && window.location.port) {
    window.location.href = `http://${window.location.hostname}:${window.location.port}/login/index.html`;
  } else {
    let path = window.location.pathname;
    path = path.replace("/", "file:///", 0);
    path = path.replace("sign%20up", "login");
    console.log(path);
    window.location.href = `${path}`;
  }
}

function loading() {
  const random = Math.floor(Math.random() * (4 - 2) + 2);
  const loadingEl = document.getElementById("loading-container");
  loadingEl.style.display = "grid";
  document.body.style.overflow = "hidden";
  setTimeout(() => {
    loadingEl.style.display = "none";
    redirecting();
  }, random * 1000);
}
