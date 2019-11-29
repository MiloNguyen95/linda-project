let leftNavButton = document.getElementById("left-navigator");
let rightNavButton = document.getElementById("right-navigator");
let fullSlider = document.getElementById("full-slider");
let slidingDistance = fullSlider.clientWidth / 4;
let sweetnessLevel = 30;
(function() {
  window.currentPage = "welcome";
})();

rightNavButton.addEventListener("click", function() {
  console.log(window.currentPage);
  if (window.currentPage === "welcome") {
    leftNavButton.innerHTML = "Trở về trang đầu";
    leftNavButton.style.visibility = "visible";
    rightNavButton.innerHTML = "Tiếp theo";
    navigateForward("welcome");
    return;
  }
  if (window.currentPage === "acidity") {
    leftNavButton.innerHTML = "Lùi lại";
    rightNavButton.innerHTML = "Xem kết quả";
    navigateForward("acidity");
    return;
  }
  if (window.currentPage === "brittleness") {
    leftNavButton.innerHTML = "Trở về trang đầu";
    rightNavButton.innerHTML = "Hoàn thành";
    navigateForward("brittleness");
    findAppleAndRender();
    return;
  }
  if (window.currentPage === "result") {
    window.location.href = "https://vn.bestapples.com/";
  }
});

leftNavButton.addEventListener("click", function() {
  if (window.currentPage === "acidity") {
    leftNavButton.style.visibility = "hidden";
    leftNavButton.innerHTML = "Trở về trang đầu";
    rightNavButton.innerHTML = "Bắt đầu";
    navigateBackward("acidity");
    return;
  }
  if (window.currentPage === "brittleness") {
    leftNavButton.innerHTML = "Trở về trang đầu";
    rightNavButton.innerHTML = "Tiếp theo";
    navigateBackward("brittleness");
    return;
  }
  if (window.currentPage === "result") {
    leftNavButton.style.visibility = "hidden";
    leftNavButton.innerHTML = "Trở về trang đầu";
    rightNavButton.innerHTML = "Bắt đầu";
    navigateBackward("result");
    return;
  }
});

function navigateForward(from) {
  if (from === "welcome") {
    $("#full-slider").animate({ left: `${-slidingDistance}` }, 500);
    window.currentPage = "acidity";
  } else if (from === "acidity") {
    $("#full-slider").animate({ left: `${-2 * slidingDistance}` }, 500);
    window.currentPage = "brittleness";
  } else {
    $("#full-slider").animate({ left: `${-3 * slidingDistance}` }, 500);
    window.currentPage = "result";
  }
}

function navigateBackward(from) {
  if (from === "acidity") {
    $("#full-slider").animate({ left: "0" }, 500);
    window.currentPage = "welcome";
  } else if (from === "brittleness") {
    $("#full-slider").animate({ left: `${-slidingDistance}` }, 500);
    window.currentPage = "acidity";
  } else {
    $("#full-slider").animate({ left: "0" }, 500);
    window.currentPage = "welcome";
  }
}

function angle(cx, cy, ex, ey) {
  var dy = ey - cy;
  var dx = ex - cx;
  var theta = Math.atan2(dy, dx); // range (-PI, PI]
  theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
  //if (theta < 0) theta = 360 + theta; // range [0, 360)
  return theta;
}

$("#gauge").click(function(e) {
  var distanceFromCenter = 230;
  var xPos = e.clientX - parseInt($("#gauge").css("marginLeft"));
  var yPos = e.clientY -  $("#gauge").height();
  var xCenter = $("#gauge").width() / 2;
  var yCenter = $("#gauge").height();
  var distance = Math.hypot(xPos - xCenter, yPos - yCenter);
  if (distance > distanceFromCenter) {
    var originalAngle = angle(xPos, yPos, xCenter, yCenter);
    sweetnessLevel = originalAngle / 3;
    var angleToBeRotated = originalAngle + 90;
    console.log(angleToBeRotated);
    if(angleToBeRotated < 90){
      angleToBeRotated = 90;
    }

    $("#arrow-container").css(
      "transform",
      "rotate(" + angleToBeRotated + "deg)"
    );
    $("#arrow-container").css(
      "-webkit-transform",
      "rotate(" + angleToBeRotated + "deg)"
    );
    $("#arrow-container").css("animation-duration", "2.5s");
    $("#arrow-container").css("animation-timing-function", "ease-out");
    $("#arrow-container").css("-webkit-animation-duration", "2.5s");
    $("#arrow-container").css("-webkit-animation-timing-function", "ease-out");
  }
});

function findAppleAndRender() {
  console.log(sweetnessLevel);
  if (sweetnessLevel <= 10) {
    $("#result-img").attr("src", "./assets/images/granny-smith.png");
  } else if (sweetnessLevel <= 20) {
    $("#result-img").attr("src", "./assets/images/cripps-pink.png");
  } else if (sweetnessLevel <= 30) {
    $("#result-img").attr("src", "./assets/images/red-delicious.png");
  } else if (sweetnessLevel <= 40) {
    $("#result-img").attr("src", "./assets/images/honey-crisp.png");
  } else if (sweetnessLevel <= 50) {
    $("#result-img").attr("src", "./assets/images/gala.png");
  } else {
    $("#result-img").attr("src", "./assets/images/fuji.png");
  }
}
