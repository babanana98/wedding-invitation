"use strict";

const GUEST_NAME_QUERY_PARAM = "guest";
const GUEST_ROLE_QUERY_PARAM = "role";
const TARGET_DATE = new Date("October 30, 2024 17:00:00");

const statusElement = document.getElementById("fetchingStatus");
const submitElement = document.getElementById("submitButtons");
const guestNameElement = document.getElementById("guestName");
const guestRoleElement = document.getElementById("guestRole");

window.onload = function () {
  // setting guest name
  guestNameElement.innerHTML = getRequiredQueryParamOrElse(GUEST_NAME_QUERY_PARAM, "Quý khách");
  // setting guest role
  const guestRole = getRequiredQueryParamOrElse(GUEST_ROLE_QUERY_PARAM, "SAME");
  guestRoleElement.innerHTML = Role[guestRole];
  // setting message
  const agree = localStorage.getItem("result");
  if (agree) {
    settingMessage(agree === "true");
  } else {
    submitElement.className = "display-button";
  }
};

function handelSubmit(agree) {
  // confirm action
  if (!confirm(agree ? "Bạn có chắc chắn CÓ thể tham dự?" : "Bạn có chắc chắn KHÔNG thể tham dự?")) {
    return;
  }

  // Start processing
  statusElement.className = "processing-message";
  submitElement.className = "hidden-button";

  const formData = new FormData();
  formData.append("entry.903587558", guestNameElement.innerHTML);
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
  statusElement.innerHTML = agree ? "Cảm ơn bạn đã xác nhận sẽ tham dự!" : "Thật tiếc bạn đã xác nhận không thể tham dự.<br/>Hy vọng sẽ gặp bạn trong dịp khác!";
  statusElement.className = agree ? "success-message" : "warning-message";
}

const Role = {
  SAME : "chúng tôi",
  LOWER_M_X1 : "em",
  UPPER_M_X1 : "anh chị",
  LOWER_M_X2_1 : "cô chú",
  LOWER_M_X2_2 : "bác",
  UPPER_M_X2 : "cháu"
}
