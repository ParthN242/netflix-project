const users = [{ email: "netflix99@gmail.com", password: "123456" }];

const get_user = localStorage.getItem("users");

if (!get_user) {
  localStorage.setItem("users", JSON.stringify(users));
}
