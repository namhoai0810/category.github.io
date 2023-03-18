"use strict";
// const dataNews = fetch(
//   "https://newsapi.org/v2/top-headlines?country=us&category=business&pageSize=10&apiKey=ed7e593ad88844b9bd8122fee96d44cf"
// )
//   .then((data) => {
//     console.log(data);
//     return data.json();
//   })
//   .then((response) => {
//     console.log(response);
//     console.log(response.message);
//   });

if (userCurrent) {
  const newContainer = document.getElementById("news-container");
  const btnPrev = document.getElementById("btn-prev");
  const btnNext = document.getElementById("btn-next");
  const pageNum = document.getElementById("page-num");

  // Bai bao toi da duoc luu tu API
  let totalResults = 0;

  //Ham lay du lieu tu API va hien thi ra man hinh
  async function getData(country, page) {
    try {
      // Ket noi voi API va lay ra du lieu
      const res = await fetch(
        `https://newsapi.org/v2/top-headlines?country=${country}&category=${userCurrent.category}&pageSize=${userCurrent.pageSize}&page=${page}&apiKey=ed7e593ad88844b9bd8122fee96d44cf`
      );
      const data = await res.json();
      console.log(data);
      // Kiem tra loi neu API bi sai hoac truy cap nhieu hon 100 lan/1 ngay vao API
      if (data.status === "error" || data.code === "rateLimited") {
        throw new Error(data.message);
      }

      // Kiem tra loi neu tap tin khong chay tren sever
      if (data.code === "corsNotAllowed") {
        throw new Error(data.message);
      }

      renderArticles(data);
      // Bat loi
    } catch (err) {
      // Thong bao ra loi
      // alert("Error " + err.message);
    }
  }

  getData("us", 1);

  // Ham kiem tra dieu kien an di nut Previous
  function checkBtnPrev() {
    // pageNum === 1 thi an di nut Previous
    if (pageNum.textContent === "1") {
      btnPrev.style.display = "none";
    } else {
      btnPrev.style.display = "block";
    }
  }

  // Ham kiem tra dieu kien an di nut Next
  function checkBtnNext() {
    // PageNumber bang voi so tong bai bao chia cho pageSize lam tron len
    if (pageNum.textContent == Math.ceil(totalResults / userCurrent.pageSize)) {
      btnNext.style.display = "none";
    } else {
      btnNext.style.display = "block";
    }
  }

  // bat su kien khi an nut Previous
  btnPrev.addEventListener("click", function () {
    getData("us", --pageNum.textContent);
  });
  // bat su kien khi an nut Next
  btnNext.addEventListener("click", function () {
    getData("us", ++pageNum.textContent);
  });

  // Ham hien thi bai bao ra ngoai man hinh
  function renderArticles(data) {
    totalResults = data.totalResults;

    checkBtnPrev();
    checkBtnNext();
    // Lay gia tri cho bien totalResults

    let html = "";
    //Duyet qua tung phan tu trong data.articals
    data.articles.forEach((articles) => {
      html += `<div class="card mb-3" style="max-width: 90%;">
      <div class="row g-0">
        <div class="col-md-4">
          <img src="${articles.urlToImage}" class="img-fluid rounded-start" alt="img">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h4 class="card-title">${articles.title}</h4>
            <p class="card-text">${articles.description}</p>
            <a class="btn btn-primary" href=${articles.url} target="_blank">View</a>
          </div>
        </div>
      </div>
    </div>`;
    });

    newContainer.innerHTML = html;
  }
} else {
  alert("Vui long dang nhap de su dung tinh nang nay");
  window.location.href = "../index.html";
}
