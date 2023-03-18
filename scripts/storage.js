"use strict";
// const user1 = new User("Vussss", "Suss", "Bemmm", "Dameeeeee");
// const user2 = new User("xfsss", "tr", "vc", "Dameeeeee");
// const user3 = new User("kieusss", "trangss", "st", "uk");

// // ham luu du lieu de test
// if (!getFromStorage("userArr")) {
//   // luu du lieu vao mang petArr
//   saveDataFromStorage("userArr", [user1, user2, user3]);
// }

// ham luu du lieu
function saveDataFromStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// ham lay du lieu
function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

//Ham chuyen tu Js Object sang Class Instance cua class User
function parseUser(userData) {
  const user = new User(
    userData.firtName,
    userData.lastName,
    userData.userName,
    userData.password,

    userData.pageSize,
    userData.category
  );

  return user;
}
//Ham chuyen tu Js Object sang Class Instance cua class Task
function parseTask(taskData) {
  const task = new list(taskData.task, taskData.owner, taskData.isDone);
  return task;
}

// lay thong tin cua user dang nhap tra ve class Instance
const userCurrent = getFromStorage("currentUser")
  ? parseUser(getFromStorage("currentUser"))
  : null;

// Lay data tu localStoget
const users = getFromStorage("userArr") ? getFromStorage("userArr") : [];
console.log(users);
// tra ve mot mang cac Class Instance cua class User
const userArr = users.map((user) => parseUser(user));
console.log(userArr);

// Lay data mang todoList tu localStoget
const toDoList = getFromStorage("toDoList") ? getFromStorage("toDoList") : [];
console.log(toDoList);
const toDoListArr = toDoList.map((task) => parseTask(task));
console.log(toDoListArr);
