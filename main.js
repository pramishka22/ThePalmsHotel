const bookingForm = document.getElementById("bookingForm");
const bookBtn = document.getElementById("bookBtn");
const resetCurrentBookingBtn = document.getElementById(
  "currentBookingResetBtn"
);
const checkLoyaltyBtn = document.getElementById("checkLoyaltyBtn");
const addToFavBtn = document.getElementById("addToFavoriteBtn");

const roomType = document.getElementById("roomType");
const numberOfRooms = document.getElementById("numberOfRooms");
const checkIn = document.getElementById("checkIn");
const checkOut = document.getElementById("checkOut");
const numberOfAdults = document.getElementById("numberOfAdults");
const numberOfChildren = document.getElementById("numberOfChildren");
const timeDuration = document.getElementById("timeDuration");
const wifi = document.getElementById("wifi");
const poolView = document.getElementById("poolView");
const gardenView = document.getElementById("gardenView");
const promoCode = document.getElementById("promoCode");

const loyaltyPointsDiv = document.getElementById("loyaltyPoints");
const bookingDetailsDiv = document.getElementById("bookingDetails");
const currentBookingPriceDiv = document.getElementById("currentBookingPrice");
const overallBookingDiv = document.getElementById("overallBooking");
const overallBookingPriceDiv = document.getElementById("overallBookingPrice");

let loyaltyPoints = 0;
let extraRequirements = [];
let currentBookingPrice = 0;
let overallBookingPrice = 0;

// Extra Requirements
function extraRequirements(){
  this.name = "";
if (wifi.checked) {
  extraRequirements.push(" WiFi");
} else if ((wifi.checked = false)) {
  extraRequirements.pop(" WiFi");
}

if (poolView.checked) {
  extraRequirements.push(" Pool View");
} else if ((poolView.checked = false)) {
  extraRequirements.pop(" Pool View");
}

if (gardenView.checked) {
  extraRequirements.push(" Garden View");
} else if ((gardenView.checked = false)) {
  extraRequirements.pop(" Garden View");
}
}
function calculateBooking() {
  // Calculate The Booking Price
  const singleRoomValue = 25000;
  const doubleRoomValue = 35000;
  const tripleRoomValue = 40000;

  if (roomType.value == "Single") {
    roomValue = singleRoomValue;
  } else if (roomType.value == "Double") {
    roomValue = doubleRoomValue;
  } else if (roomType.value == "Triple") {
    roomValue = tripleRoomValue;
  }
  currentBookingPrice = roomValue * numberOfRooms.value * timeDuration.value;
  overallBookingPrice += currentBookingPrice;

  if (promoCode.value == "Promo123") {
    currentBookingPrice = 0.05 * currentBookingPrice;
  } else {
    currentBookingPrice = currentBookingPrice;
  }
}

bookingForm.addEventListener("submit", function (event) {
  event.preventDefault();
});

bookBtn.addEventListener("click", async function() {
   calculateBooking()
  bookingDetailsDiv.innerHTML =
    "<p>Room Type: " +
    roomType.value +
    "</p><p>Number of Rooms: " +
    numberOfRooms.value +
    "</p><p>Check In Date: " +
    checkIn.value +
    "</p><p>Check Out Date: " +
    checkOut.value +
    "</p><p>Number of Adults: " +
    numberOfAdults.value +
    "</p><p>Number of Children: " +
    numberOfChildren.value +
    "</p><p>Time Duration: " +
    timeDuration.value +
    " Days</p><p>Extra Requirements:" +
    extraRequirements +
    "</p><br>";
  currentBookingPriceDiv.innerHTML = "<p> " + currentBookingPrice + "</p>";
  overallBookingDiv.innerHTML = localStorage.getItem("overallBookingDiv");
  overallBookingPriceDiv.innerHTML = "<p> " + overallBookingPrice + "</p>";
    // "<p>" + localStorage.getItem("overallBookingPrice") + "</p>";
  if (overallBookingPriceDiv.innerHTML == "<p>null</p>") {
    overallBookingPriceDiv.innerHTML = "<p>0</p>";
  }
});

resetCurrentBookingBtn.addEventListener("click", function () {
  window.location.reload();
  extraRequirements = [];
});

checkLoyaltyBtn.addEventListener("click", function () {
  if (numberOfRooms.value >= 3) {
    loyaltyPoints = 20 * numberOfRooms.value;
  } else if (numberOfRooms.value < 3) {
    loyaltyPoints = "No Loyalty Points";
  }
  loyaltyPointsDiv.innerHTML = loyaltyPoints;
});

addToFavBtn.addEventListener("click", function () {
	
  overallBookingDiv.innerHTML += bookingDetailsDiv.innerHTML;
  localStorage.setItem("overallBookingDiv", overallBookingDiv.innerHTML);
  localStorage.setItem(
    "overallBookingPrice",
    (overallBookingPrice += currentBookingPrice)
  );
  overallBookingPriceDiv.innerHTML = "<p> " + overallBookingPrice + "</p>";
});