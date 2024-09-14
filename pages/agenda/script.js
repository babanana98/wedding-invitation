"use strict";

// Constant
const GUEST_NAME_QUERY_PARAM = "guest";
const GUEST_ROLE_QUERY_PARAM = "role";

// JavaScript for handling image popup, zoom, and drag
const invitationLinkElement = document.getElementById('invitationLink');
const albumLinkElement = document.getElementById('albumLink');

window.onload = function () {
  // setting album link
  const guestName = getRequiredQueryParamOrElse(GUEST_NAME_QUERY_PARAM, "Quý khách");
  const guestRole = getRequiredQueryParamOrElse(GUEST_ROLE_QUERY_PARAM, "SAME");
  invitationLinkElement.href = invitationLinkElement.href + "?" + "role=" + guestRole + "&guest=" + guestName;
  albumLinkElement.href = albumLinkElement.href + "?" + "role=" + guestRole + "&guest=" + guestName;
};

function getRequiredQueryParamOrElse(param, defaultVal) {
  const urlValue = new URLSearchParams(window.location.search).get(param);
  if (urlValue) {
    return urlValue;
  }
  return defaultVal;
}
