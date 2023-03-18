"use strict";
const LoginModel = document.querySelector("#login-modal");
const mainContent = document.querySelector("#main-content");
const WelcomeMessage = document.querySelector("#welcome-message");
const btnLogout = document.querySelector("#btn-logout");

function displayHome() {
  // Kiem tra xem co nguoi dang nhap khong?
  if (getFromStorage("currentUser")) {
    LoginModel.style.display = "none";
    mainContent.style.display = "block";
    WelcomeMessage.textContent = `Welcome ${userCurrent.firtName}`;
    // Neu khong co nguoi dang nhap
  } else {
    LoginModel.style.display = "block";
    mainContent.style.display = "none";
    WelcomeMessage.textContent = "";
  }
}
displayHome();
btnLogout.addEventListener("click", function () {
  const isLogout = confirm("Ban muon dang xuat chu?");
  if (isLogout) {
    // Xoa doi tuong dang nhap khoi localStorage
    localStorage.removeItem("currentUser");
    displayHome();
  }
});
