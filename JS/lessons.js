const lessonsList = document.querySelector(".lessons-list");
const addLessonButton = document.querySelector(".add-lesson");
const addLessonFormWrapper = document.querySelector(".add-lesson-form-wrapper");
const formItemsWrapper = document.querySelector(".form-items-wrapper");
const addLessonForm = document.querySelector(".add-lesson-form");
const formOverlay = document.querySelector(".form-overlay");
let lessonsCount = 0;
const showLessons = () => {
  fetch("./lessons.json")
    .then((response) => response.json())
    .then((data) => {
      const storedData = localStorage.getItem("lessonsData");
      if (storedData) {
        const jsonData = JSON.parse(storedData);
        jsonData.forEach((item) => {
          data.push(item);
        });
      }
      lessonsList.innerHTML = "";
      data.forEach((item) => {
        lessonsCount++;
        const listItem = document.createElement("li");
        listItem.classList.add("list-item");
        listItem.innerHTML = `
          <a class="item-link d-flex flex-column w-100 h-100">
            <div class="img-wrapper w-100">
              <img
                src="${item.imgSrc}"
                class="lesson-img w-100 h-100"
                alt="lesson-img"
              />
            </div>
            <div
              class="lesson-text w-100 d-flex flex-column justify-content-end"
            >
              <span class="lesson-title">${item.title}</span>
              <div class="category d-flex justify-content-between">
                <span>${item.category}</span>
                <span>${item.date}</span>
              </div>
            </div>
          </a>`;
        lessonsList.appendChild(listItem);
      });
    })
    .catch((error) => console.log(error));
};
formItemsWrapper.addEventListener("animationend", () => {
  if (formItemsWrapper.classList.contains("show")) {
    formItemsWrapper.classList.remove("show");
  } else if (formItemsWrapper.classList.contains("hide")) {
    formItemsWrapper.classList.remove("hide");
    formOverlay.classList.remove("show");
    formOverlay.classList.add("hide");
    addLessonFormWrapper.style.display = "none";
  }
});
const closeLessonsForm = () => {
  formItemsWrapper.classList.add("hide");
};
addLessonButton.addEventListener("click", () => {
  formOverlay.classList.remove("hide");
  formOverlay.classList.add("show");
  addLessonFormWrapper.style.display = "block";
  formItemsWrapper.classList.add("show");
});
function createEventListener() {
  const closeForm = document.querySelector(
    ".add-lesson-form-wrapper .close-form"
  );
  if (closeForm) {
    closeForm.addEventListener("click", function () {
      closeLessonsForm();
    });
  }
}
createEventListener();
addLessonForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(addLessonForm);
  const formValues = {};
  formData.forEach((value, key) => {
    formValues[key] = value;
  });
  if (
    formValues.title !== "" &&
    formValues.category !== "" &&
    formValues.date !== ""
  ) {
    lessonsCount++;
    formValues["id"] = lessonsCount;
    formValues["imgSrc"] = "./media/images/lesson-img.png";
    let dataArray = localStorage.getItem("lessonsData");
    dataArray = dataArray ? JSON.parse(dataArray) : [];
    dataArray.push(formValues);
    localStorage.setItem("lessonsData", JSON.stringify(dataArray));
    showLessons();
  }
  closeLessonsForm();
});
window.addEventListener("load", () => {
  showLessons();
});
