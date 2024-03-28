const addLessonButton = document.querySelector(".add-lesson");
const addLessonForm = document.querySelector(".add-lesson-form-wrapper");
const formOverlay = document.querySelector(".form-overlay");
addLessonButton.addEventListener("click", () => {
  addLessonForm.classList.remove("hide");
  formOverlay.classList.remove("hide");
  addLessonForm.classList.add("show");
  formOverlay.classList.add("show");
});
function createEventListener() {
  const closeForm = document.querySelector(
    ".add-lesson-form-wrapper .close-form"
  );
  if (closeForm) {
    closeForm.addEventListener("click", function () {
      addLessonForm.classList.remove("show");
      formOverlay.classList.remove("show");
      addLessonForm.classList.add("hide");
      formOverlay.classList.add("hide");
    });
  }
}
createEventListener();
