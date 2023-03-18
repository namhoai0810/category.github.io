"use strict";
const loginUser = document.getElementById("input-username");
const passwordUser = document.getElementById("input-password");
const btnLogin = document.getElementById("btn-submit");

btnLogin.addEventListener("click", function () {
  const validate = isValidate();
  if (isValidate) {
    //Tim kiem trong mang userArr co user trung voi user Dang nhap
    const userCurrent = userArr.find(
      (item) =>
        item.userName === loginUser.value &&
        item.password === passwordUser.value
    );
    // Neu co nguoi dang nhap
    if (userCurrent) {
      // console.log(typeof userCurrent);
      // Luu du lieu xuong localStorage
      saveDataFromStorage("currentUser", userCurrent);
      window.location.href = "../index.html";
      console.log(userCurrent);
    } else {
      alert("Thong tin nhap sai vui long kiem tra lai");
    }
  }
});
// Kiem tra dien day du thong tin
function isValidate() {
  let validate = true;
  if (loginUser.value.trim() === "" || loginUser.value.trim() === "") {
    alert("Vui long dien day du thong tin");
    validate = false;
  }
  return validate;
}
