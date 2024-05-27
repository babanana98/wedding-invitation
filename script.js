"use strict";

const GUEST_NAME_QUERY_PARAM = "guest";

window.onload = function () {
  // countdown("June 30, 2024 17:00:00");
  var guestName = getQueryParam(GUEST_NAME_QUERY_PARAM);
  if (guestName) {
    document.getElementById("guestName").innerHTML = guestName;
    document.getElementById("guestNameSubmit").setAttribute('value', guestName);
  }
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

function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

function handelSubmit(agree) {
  // Showing processing status
  var statusElement = document.getElementById("fetchingStatus");
  statusElement.style.display = "block";

  // const submitData = {
  //   "entry.903587558": guestName,
  //   "entry.650573155": agree ? "Có, tôi sẽ tham dự." : "Không, tôi rất tiếc không thể tham dự.",
  // };

  const submitData = {
    "entry.903587558": "Test+user",
    "entry.650573155": "C%C3%B3%2C+t%C3%B4i+s%E1%BA%BD+tham+d%E1%BB%B1.",
  };

  fetch("https://docs.google.com/forms/u/0/d/e/1FAIpQLSf3dlqaAYSeGYLEoPtqhnxKrTJNe5DlSsIJ1QxmYIh0e0IZ1Q/formResponse", {
    method: "POST",
    headers: {
      "Origin": "https://docs.google.com"
    },
    mode: "no-cors",
    body: JSON.stringify(submitData)
  })
  .then(response => {
    statusElement.textContent = "Cảm ơn bạn đã đồng ý tham gia với chúng tôi!";
    document.getElementById("fetchingStatus").style.display = "none";
  })
  .catch(error => {
    console.error("Error submitting form:", error);
    statusElement.style.display = "none";
  });
}
