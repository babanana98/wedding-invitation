"use strict";

const GUEST_NAME_QUERY_PARAM = "guest";
const GUEST_NAME_DEFAULT = "Quý khách";
const TARGET_DATE = new Date("June 30, 2024 17:00:00");

const statusElement = document.getElementById("fetchingStatus");
const submitElement = document.getElementById("submitButtons");

window.onload = function () {
  // setting countdown
  countdown();
  // setting guest name
  document.getElementById("guestName").innerHTML = getRequiredQueryParamOrElse(GUEST_NAME_QUERY_PARAM, GUEST_NAME_DEFAULT);
  // setting message
  const agree = localStorage.getItem("result");
  if (agree) {
    settingMessage(agree);
  }
};

function handelSubmit(agree) {
  // confirm action
  if (!confirm(agree ? "Bạn có chắc chắn muốn tham dự?" : "Bạn có chắc chắn không thể tham dự?")) {
    return;
  }

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
    settingMessage(agree);
    // Save result to localstorage
    localStorage.setItem("result", agree);
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
  return defaultVal;
}

function settingMessage(agree) {
  submitElement.className = "hidden-button";

  statusElement.innerHTML = agree ? "Cảm ơn bạn đã xác nhận sẽ tham dự!" : "Thật tiếc bạn không thể tham dự.<br/>Hy vọng sẽ gặp bạn trong dịp khác!";
  statusElement.className = agree ? "success-message" : "warning-message";
}

function countdown() {
  var x = setInterval(function () {
    let distance = TARGET_DATE.getTime() - new Date().getTime();

    document.getElementById("countdown").innerHTML = getCountDown(distance);

    if (distance < 0) {
      clearInterval(x);
      document.getElementById("countdown").innerHTML = "The Wedding Has Started!";
    }
  }, 1000);
}

function getCountDown(distance) {
  let days = Math.floor(distance / (1000 * 60 * 60 * 24));
  let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

  if (days > 0) {
    return `Hôn lễ sẽ diễn ra sau <strong>${days + " ngày"}</strong> nữa.`;
  }

  if (hours > 0) {
    return `Hôn lễ sẽ diễn ra sau <strong>${hours + " giờ"}</strong> nữa.`;
  }

  return `Hôn lễ sẽ diễn ra sau <strong>${minutes + " phút"}</strong> nữa.`;;
}
