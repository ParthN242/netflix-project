const formEl = document.querySelector("form");
const inputEl = document.querySelectorAll("input");
const validationEl = document.querySelectorAll(".validation");
const users = JSON.parse(localStorage.getItem("users"));

inputEl.forEach((d) => {
  d.addEventListener("click", () => {
    validationEl[0].innerText = "";
    validationEl[1].innerText = "";
  });
});

formEl.addEventListener("submit", (e) => {
  const email = document.getElementById("email");
  const password = document.getElementById("password");

  e.preventDefault();
  const userDetails = users.filter((d) => d.email === email.value);
  if (!userDetails.length) {
    validationEl[0].innerText = "Invalid Email";
    validationEl[1].innerText = "Invalid Password";
    email.focus();
    return;
  }
  if (userDetails.length && userDetails[0].email === email.value) {
    if (userDetails[0].password === password.value) {
      loading();
    } else {
      validationEl[1].innerText = "Invalid Password";
    }
    return false;
  }
});

function redirecting() {
  if (window.location.hostname && window.location.port) {
    window.location.href = `http://${window.location.hostname}:${window.location.port}/main/movies/index.html`;
  } else {
    let path = window.location.pathname;
    path = path.replace("/", "file:///", 0);
    path = path.replace("login", "main/movies");
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
