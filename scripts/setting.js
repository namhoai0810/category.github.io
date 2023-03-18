"use strict";

if (userCurrent) {
  const newPageInput = document.querySelector("#input-page-size");
  const newCategoryInput = document.querySelector("#input-category");
  const btnSaveSetting = document.querySelector("#btn-submit");

  btnSaveSetting.addEventListener("click", function () {
    // kiem tra dieu kien de so bai bao tren trang lon hon 0
    if (Number(newPageInput.value) > 0) {
      userCurrent.pageSize = Number(newPageInput.value);
    } else {
      alert("Vui long chon so bai bao lon hon 0 va nho hon 10");
    }
    // Kiem tra bai bao khac General thi dat lai loai bao
    if (newCategoryInput.value != "General") {
      userCurrent.category = newCategoryInput.value;
    } else {
      userCurrent.category = "Business";
    }
    // luu du lieu vao local Stoget
    saveDataFromStorage("currentUser", userCurrent);

    // Tim user bi thay doi
    const userSetting = userArr.find(
      (user) => userCurrent.userName === user.userName
    );
    // thay doi gia tri cua thuoc tinh pageSize va category
    userSetting.pageSize = userCurrent.pageSize;
    userSetting.category = userCurrent.category;
    // luu lai thay doi duoi local Stoget
    saveDataFromStorage("userArr", userArr);
  });
} else {
  alert("Vui long dang nhap de su dung tinh nang nay");
  window.location.href = "../index.html";
}
