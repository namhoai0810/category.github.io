"use strict";
if (userCurrent) {
  const inputSearch = document.getElementById("input-query");
  const btnSearch = document.getElementById("btn-submit");
  const newContainer = document.getElementById("news-container");
  const btnPrev = document.getElementById("btn-prev");
  const btnNext = document.getElementById("btn-next");
  const pageNum = document.getElementById("page-num");

  // Bai bao toi da duoc luu tu API
  let totalResults = 0;

  // Ham lay du lieu theo tu khoa tu API
  async function getData(q, page) {
    try {
      // Ket noi voi API va lay ra du lieu
      const res = await fetch(
        `https://newsapi.org/v2/top-headlines?q=${q}&pageSize=${userCurrent.pageSize}&page=${page}&apiKey=ed7e593ad88844b9bd8122fee96d44cf`
      );
      console.log(res);
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
  // Tu khoa can tim bai bao

  // Bat su kien khi an nut Search
  btnSearch.addEventListener("click", function () {
    const keySearch = inputSearch.value;
    // Kiem tra tu khoa nhap vao khong dc trong
    if (keySearch.trim() === "") {
      alert("Vui long nhap bai viet can tim");
    } else {
      // lay du lieu bai bao
      getData(keySearch, 1);
    }
  });

  function renderArticles(data) {
    // Lay gia tri cho bien totalResults
    totalResults = data.totalResults;
    // console.log("hihi");
    checkBtnPrev();
    checkBtnNext();

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
    getData(inputSearch.value, --pageNum.textContent);
  });
  // bat su kien khi an nut Next
  btnNext.addEventListener("click", function () {
    getData(inputSearch.value, ++pageNum.textContent);
  });
}
