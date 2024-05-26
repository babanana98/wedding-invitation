window.onload = function () {
  countdown("June 30, 2024 17:00:00");
  const guestName = getQueryParam("guest");
  if (guestName) {
    document.getElementById("guestName").innerHTML = guestName;
  }
};

function countdown(target) {
  var weddingDate = new Date(target).getTime();

  var x = setInterval(function () {
    var now = new Date().getTime();
    var distance = weddingDate - now;

    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = days;
    document.getElementById("hours").innerText = hours;
    document.getElementById("minutes").innerText = minutes;
    document.getElementById("seconds").innerText = seconds;

    if (distance < 0) {
      clearInterval(x);
      document.getElementById("countdown").innerHTML =
        "The Wedding Has Started!";
    }
  }, 1000);
}

function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}
