"use strict";

if (userCurrent) {
  const inputTask = document.querySelector("#input-task");
  const btnAdd = document.querySelector("#btn-add");
  const toDoList_UL = document.querySelector("#todo-list");

  displayToDoList();
  // Ham hien thi viec can lam
  function displayToDoList() {
    let html = "";
    console.log("Hizzzz");
    toDoListArr
      .filter((todo) => todo.owner === userCurrent.userName)
      .forEach((todo) => {
        html += `<li class=${todo.isDone ? "checked" : ""}>${
          todo.task
        }<span class="close">×</span></li>`;
      });
    toDoList_UL.innerHTML = html;

    //Check khi an vao cac task
    toggleTaks();

    // Check khi an vao nut xoa
    deleteTask();
  }
  // Bat su kien khi an nut them toDoList
  btnAdd.addEventListener("click", function () {
    // ham kiem tra nguoi dung co nhap viec can lam vao khong
    function isvalidate() {
      let validate = true;
      if (inputTask.value.trim() === "") {
        alert("Vui long dien viec can lam vao");
        validate = false;
      }
      return validate;
    }
    if (isvalidate()) {
      const toDo = new list(inputTask.value, userCurrent.userName, false);

      // Them viec can lam vao mang
      toDoListArr.push(toDo);
      // luu du lieu xuong localStoget
      saveDataFromStorage("toDoList", toDoListArr);
      //Xoa o input task
      inputTask.value = "";
      // Hien thi cac task can lam
      displayToDoList();
    }
  });

  // ham bat su kien toggle task
  function toggleTaks() {
    // Chon tat ca cac li trong danh sach todo-List
    document
      .querySelectorAll("#todo-list li")
      // Duyet cac phan tu li trong danh sach va bat su kien khi an vao
      .forEach((liEl) =>
        liEl.addEventListener("click", function (e) {
          // dieu kien de tranh an vao nut x(delete)
          if (e.target !== liEl.children[0]) {
            liEl.classList.toggle("checked");

            // tim task vua duoc chuyen doi
            const todo = toDoListArr.find(
              (toDoItem) =>
                toDoItem.owner === userCurrent.userName &&
                toDoItem.task === liEl.textContent.slice(0, -1) //  khong lay dau x
            );
            // gan du lieu lai cho isDone
            todo.isDone = liEl.classList.contains("checked") ? true : false;

            // luu lai du lieu vao localStoget
            saveDataFromStorage("toDoList", toDoListArr);
          }
        })
      );
  }

  // ham bat su kien khi an vao nut delete task
  function deleteTask() {
    // Chon tat ca cac phan tu span
    document.querySelectorAll("#todo-list .close").forEach((clEl, index) =>
      clEl.addEventListener("click", function () {
        const isDele = confirm("Ban muon xoa task nay chu !?");
        if (isDele) {
          // xoa phan tu tai vi tri index
          toDoListArr.splice(index, 1);
          console.log(index);
          // luu lai du lieu vao localStoget
          saveDataFromStorage("toDoList", toDoListArr);
          // hien thi lai ra man hinh
          displayToDoList();
        }
      })
    );
  }
} else {
  alert("Vui long dang nhap de truy cap");
  window.location.href = "../index.html";
}
