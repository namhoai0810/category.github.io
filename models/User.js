"use strict";

class User {
  constructor(
    firtName,
    lastName,
    userName,
    password,

    // Mac dinh neu khong khai bao phan setting
    pageSize = 10,
    category = "business"
  ) {
    this.firtName = firtName;
    this.lastName = lastName;
    this.userName = userName;
    this.password = password;

    this.pageSize = pageSize;
    this.category = category;
  }
}

class list {
  constructor(
    task,
    owner,
    //Mac dinh isDone la false
    isDone
  ) {
    this.task = task;
    this.owner = owner;
    this.isDone = isDone;
  }
}
