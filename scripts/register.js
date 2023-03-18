"use strict";

const inputFirstName = document.getElementById("input-firstname");
const inputLastName = document.getElementById("input-lastname");
const inputUserName = document.getElementById("input-username");
const inputPassword = document.getElementById("input-password");
const inputConfirmPassword = document.getElementById("input-password-confirm");
const btnSubmit = document.getElementById("btn-submit");

btnSubmit.addEventListener("click", function () {
  const user = new User(
    inputFirstName.value,
    inputLastName.value,
    inputUserName.value,
    inputPassword.value
  );
  const validate = isValidate(user);
  if (validate) {
    // them data vao mang userArr
    userArr.push(user);
    console.log(userArr);
    // Luu du lieu vao localStorage
    saveDataFromStorage("userArr", userArr);
    console.log("add thanh cong");
    // Xoa du lieu o cac o input
    clearInput();
    window.location.href = "../pages/login.html";
  }
});

function isValidate(user) {
  let validate = true;
  // Dieu kien kiem tra cac o input khong duoc de trong
  if (
    user.firtName.trim() === "" ||
    user.lastName.trim() === "" ||
    user.userName.trim() === "" ||
    user.password.trim() === "" ||
    inputConfirmPassword.value.trim() === ""
  ) {
    validate = false;
    alert("Vui long khong de thong tin bi trong");
  }
  // userName khong duoc trung lap
  if (!userArr.every((item) => item.userName !== user.userName)) {
    validate = false;
    alert("userName da ton tai");
  }
  // Password khong trung voi Password Confirm
  if (user.password !== inputConfirmPassword.value) {
    validate = false;
    alert("Password khong trung voi Confirm Password");
  }
  // Do dai cua password phai lon hon 8
  if (user.password.length <= 8) {
    validate = false;
    alert("Password co do dai hon 8 ky tu");
  }
  return validate;
}
// Ham xoa du lieu o cac o input
function clearInput() {
  inputFirstName.value = "";
  inputLastName.value = "";
  inputUserName.value = "";
  inputPassword.value = "";
  inputConfirmPassword.value = "";
}
