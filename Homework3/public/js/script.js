document.querySelectorAll(".done").forEach((element) =>
  element.addEventListener("click", (event) => {
    const checkbox = event.target;
    const nextElement = checkbox.nextElementSibling;
    if (checkbox.checked) {
      nextElement.style.color = "red";
      return;
    }

    nextElement.style.color = "black";
  })
);
