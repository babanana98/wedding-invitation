function openModal(element) {
  var modal = document.getElementById("myModal");
  var modalImg = document.getElementById("imgModal");
  var captionText = document.getElementById("caption");

  modal.style.display = "block";
  modalImg.src = element.getElementsByTagName("img")[0].src;
  captionText.innerHTML = element.getElementsByTagName("img")[0].alt;
}

function closeModal() {
  var modal = document.getElementById("myModal");
  modal.style.display = "none";
}
