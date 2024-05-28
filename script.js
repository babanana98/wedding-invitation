"use strict";

const GUEST_NAME_QUERY_PARAM = "guest";
const GUEST_NAME_DEFAULT = "guest";

const statusElement = document.getElementById("fetchingStatus");
const submitElement = document.getElementById("submitButtons");

window.onload = function () {
  // countdown("June 30, 2024 17:00:00");
  document.getElementById("guestName").innerHTML = getRequiredQueryParamOrElse(GUEST_NAME_QUERY_PARAM, GUEST_NAME_DEFAULT);
};

// function countdown(target) {
//   var weddingDate = new Date(target).getTime();

//   var x = setInterval(function () {
//     var now = new Date().getTime();
//     var distance = weddingDate - now;

//     var days = Math.floor(distance / (1000 * 60 * 60 * 24));
//     var hours = Math.floor(
//       (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
//     );
//     var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//     var seconds = Math.floor((distance % (1000 * 60)) / 1000);

//     document.getElementById("days").innerText = days;
//     document.getElementById("hours").innerText = hours;
//     document.getElementById("minutes").innerText = minutes;
//     document.getElementById("seconds").innerText = seconds;

//     if (distance < 0) {
//       clearInterval(x);
//       document.getElementById("countdown").innerHTML =
//         "The Wedding Has Started!";
//     }
//   }, 1000);
// }

function handelSubmit(agree) {
  // Start processing
  statusElement.className = "processing-message";
  submitElement.className = "hidden-button";

  const formData = new FormData();
  formData.append("entry.903587558", getRequiredQueryParamOrElse(GUEST_NAME_QUERY_PARAM, GUEST_NAME_DEFAULT));
  formData.append("entry.650573155", agree ? "Có, tôi sẽ tham dự." : "Không, tôi rất tiếc không thể tham dự.");

  fetch("https://docs.google.com/forms/u/0/d/e/1FAIpQLSf3dlqaAYSeGYLEoPtqhnxKrTJNe5DlSsIJ1QxmYIh0e0IZ1Q/formResponse", {
    method: "POST",
    headers: {
      "Origin": "https://docs.google.com"
    },
    mode: "no-cors",
    body: formData
  })
  .then(response => {
    // Complete processing
    statusElement.innerHTML = agree ? "Cảm ơn bạn đã xác nhận sẽ tham dự!" : "Thật tiếc bạn không thể tham dự.<br/>Hy vọng sẽ gặp bạn trong dịp khác!";
    statusElement.className = agree ? "success-message" : "warning-message";
  })
  .catch(error => {
    console.error("Error submitting form:", error);
    // Error processing
    statusElement.className = "hidden-message";
    submitElement.className = "display-button";
  });
}

function getRequiredQueryParamOrElse(param, defaultVal) {
  const urlValue = new URLSearchParams(window.location.search).get(param);
  if (urlValue) {
    return urlValue;
  }
  else defaultVal;
}
