// When the DOM has fully loaded, execute the following code
document.addEventListener('DOMContentLoaded', function () {
    // Get form element
    const bookingForm = document.getElementById('bookingForm');
  
    // Buttons for booking rooms and adventures
    const bookRoomBtn = document.getElementById('bookRoom');
    const bookAdventureBtn = document.getElementById('bookAdventure');
  
    // Buttons for confirming orders, checking loyalty, applying promo codes, and marking as a favorite
    const confirmOrderBtn = document.getElementById('confirmOrder');
    const loyaltyCheckBtn = document.getElementById('loyaltyCheck');
    const applyCodeBtn = document.getElementById('applyCode');
    const favouriteBtn = document.getElementById('favourite');
  
    //PromoCode input field
    const promoCode = document.getElementById('promoCode');
  
    //input field for user name
    const userName = document.getElementById('name');
  
    // Input fields for room bookings
    const numOfRooms = document.getElementById('numRooms');
    const numOfAdults = document.getElementById('numAdults');
    const numOfChildren = document.getElementById('numChildren');
    const durationOfStay = document.getElementById('duration');
    const checkInDate = document.getElementById('checkInDate');
    const roomType = document.getElementById('roomType');
    const viewType = document.getElementById('view');
    const wifi = document.getElementById('wifi');
    const extraBed = document.getElementById('extraBed');
  
    // Input fields for adventure bookings
    const adventureType = document.getElementById('adventureType');
    const needGuide = document.getElementById('guide');
  
    // Display elements for current cost, loyalty points, overall booking number, and overall booking cost
    const currentCost = document.getElementById('currentCost');
    const loyaltyPoints = document.getElementById('loyaltyPoints');
    const overallBookingNumberElement = document.getElementById('overallBookingNumber');
    const overallBookingCostElement = document.getElementById('overallBookingCost');
  
    //Initialization
    // Overall booking information
    let overallBookingNumber = 0;
    let overallBookingCost = 0;
    let checkInDateStored = '';
    overallBookingNumberElement.innerText = overallBookingNumber;
    overallBookingCostElement.innerText = overallBookingCost;
    currentCost.innerText = 0;
  
    // Flag to track whether a promo code has been applied
    let promoApplied = false;
  
    // Object to store overall booking details
    let overallBookingDetails = {
      Bookings: {
        rooms: [],
        adventures: [],
      },
      loyaltyPoints: 0,
      userName: '',
    };
  
    // Helper function to get room cost
    function calculateRoomCost() {
      let totalCost = 0;
      totalCost += getRoomCost() * numOfRooms.value * durationOfStay.value;
      if (numOfChildren > 0) {
        totalCost += 5000;
      }
  
      if (extraBed.checked) {
        totalCost += 8000;
      }
  
      // Ensure the total cost is a valid number
      if (typeof totalCost === 'number') {
        return totalCost;
      } else {
        return 0;
      }
    }
  
    // Helper function to get adventure cost
    function calculateAdventureCost() {
      const selectedOptionValue = adventureType.value;
  
      let cost = 0;
  
      // Switch statement to calculate adventure cost based on selected option
      switch (selectedOptionValue) {
        case 'localAdult':
          cost += 5000.0;
          break;
        case 'localKids':
          cost += 2000.0;
          break;
        case 'foreignAdult':
          cost += 10000.0;
          break;
        case 'foreignKids':
          cost += 5000.0;
          break;
        default:
          cost += 0.0; // Default value
          break;
      }
  
      // If a guide is needed, add additional cost
      if (needGuide.checked) {
        switch (selectedOptionValue) {
          case 'localAdult':
            cost += 1000.0;
            break;
          case 'localKids':
            cost += 500.0;
            break;
          case 'foreignAdult':
            cost += 1000.0;
            break;
          case 'foreignKids':
            cost += 500.0;
            break;
          default:
            cost += 0.0; // Default value
            break;
        }
      }
      return cost;
    }
  
    // Helper function to get room cost based on the selected room type
    function getRoomCost() {
      const selectedOptionValue = roomType.value;
  
      let cost = 0;
  
      // Switch statement to calculate room cost based on the selected room type
      switch (selectedOptionValue) {
        case 'single':
          cost += 25000.0;
          break;
        case 'double':
          cost += 35000.0;
          break;
        case 'triple':
          cost += 40000.0;
          break;
        default:
          cost += 0.0; // Default value
          break;
      }
  
      return cost;
    }
  
    // Helper function to check if the selected rooms can accommodate the specified number of adults
    function checkRoomCapacity() {
      let roomValue = 0;
  
      console.log(roomValue);
      // Switch statement to determine the capacity of the selected room type
      switch (roomType.value) {
        case 'single':
          roomValue += 1;
          break;
        case 'double':
          roomValue += 2;
          break;
        case 'triple':
          roomValue += 3;
          break;
        default:
          roomValue += 0.0; // Default value
          break;
      }
  
      let totalRoomValue = roomValue * numOfRooms.value;
  
      // Adjust room value if an extra bed is requested
      if (extraBed.checked) {
        totalRoomValue += 1;
      }
      // Check if the total room capacity is sufficient for the specified number of adults
      return totalRoomValue >= numOfAdults.value;
    }
  
    // Helper function to update the current cost based on room and adventure costs
    function updateCurrentCost() {
      // Calculate the total cost of rooms and adventures
      let curCost = calculateRoomCost() + calculateAdventureCost();
  
      // Apply a 5% discount if a promo code has been applied
      if (promoApplied) {
        curCost -= curCost * 0.05;
      }
      // Update the current cost display
      currentCost.innerText = curCost;
    }
  
    // Helper function to reset room-related form fields
    function resetRoomFields() {
      numOfRooms.value = 0;
      numOfAdults.value = 0;
      numOfChildren.value = 0;
      durationOfStay.value = 0;
      checkInDate.value = '';
      wifi.checked = false;
      extraBed.checked = false;
      currentCost.innerText = 0;
      roomType.value = 'defaultRoom';
    }
  
    // Helper function to reset overall Booking object
    function resetOverallBookingObject() {
      overallBookingDetails.Bookings = {
        rooms: [],
        adventures: [],
      }
      overallBookingDetails.loyaltyPoints = 0,
      overallBookingDetails.userName= '',
  
      overallBookingNumber = 0;
      overallBookingCost = 0;
      overallBookingNumberElement.innerText = overallBookingNumber;
      overallBookingCostElement.innerText = overallBookingCost;
    }
  
    // Helper function to calculate the total number of rooms across all bookings
    function checkTotalRooms() {
      const roomsArray = overallBookingDetails.Bookings.rooms;
      let totalRooms = 0;
  
      // Calculate the total number of rooms by iterating through the roomsArray
      for (const room of roomsArray) {
        totalRooms += Number(room.numberOfRooms);
      }
  
      return totalRooms;
    }
  
    // Event listener for "Book Room" button
    bookRoomBtn.addEventListener('click', function () {
      // Check if a room type is selected
      if (roomType.value === 'defaultRoom') {
        alert('Please select a room type.');
        return;
      }
  
      // Check if the number of rooms is provided and not zero
      if (numOfRooms.value === 0 || numOfRooms.value === '') {
        alert('Please input the number of rooms');
        return;
      }
  
      // Check if the number of adults is provided and not zero
      if (numOfAdults.value === '' || numOfAdults.value === 0) {
        alert('Please input number of guests');
        return;
      }
  
      // Check if the duration of stay is provided and not zero
      if (durationOfStay.value === '' || durationOfStay.value === 0) {
        alert('Please input your stay duration');
        return;
      }
  
      // Check if there are enough beds for the specified number of guests
      if (!checkRoomCapacity()) {
        alert('Not enough beds for this order');
        return;
      }
  
      //storing check in date
      checkInDateStored = checkInDate.value;
      stayDays = durationOfStay.value;
  
      // Calculate the cost of the room
      let cost = calculateRoomCost();
  
      // Apply a 5% discount if a promo code has been applied
      if (promoApplied) {
        cost -= cost * 0.05;
      }
  
      // Create a room object with booking details
      const room = {
        roomType: roomType.value,
        numberOfRooms: numOfRooms.value,
        numberOfAdults: numOfAdults.value,
        numberOfChildren: numOfChildren.value,
        duration: durationOfStay.value,
        view: viewType.value,
        wifi: wifi.checked,
        extraBed: extraBed.checked,
        cost,
      };
  
      // Update overall booking details
      overallBookingDetails.Bookings.rooms.push(room);
      overallBookingDetails.loyaltyPoints += numOfRooms.value > 3 ? numOfRooms.value * 20 : 0;
      overallBookingNumber++;
      overallBookingCost += calculateRoomCost();
  
      // Update booking display
      overallBookingNumberElement.innerText = overallBookingNumber;
      overallBookingCostElement.innerText = overallBookingCost;
  
      // Display a confirmation alert for booking
      alert(`Your booking has been saved, proceed to confirm order once you are done.
      `);
      
      // Reset room-related fields
      resetRoomFields();
  
      // Update the current cost display
      updateCurrentCost();
    });
  
    // Event listener for "Book Adventure" button
    bookAdventureBtn.addEventListener('click', function () {
      // Check if an adventure type is selected
      if (adventureType.value === 'defaultAdventure') {
        alert('Please select an Adventure type.');
        return;
      }
  
      // Calculate the cost of the adventure
      let cost = calculateAdventureCost();
  
      // Apply a 5% discount if a promo code has been applied
      if (promoApplied) {
        cost -= cost * 0.05;
      }
  
      // Create an adventure object with booking details
      const adventure = {
        adventureType: adventureType.value,
        needGuide: needGuide.checked,
        cost,
      };
  
      // Display a confirmation alert for booking
      alert(`Your booking has been saved, proceed to confirm order once you are done.
      `);
  
      // Update overall booking details
      overallBookingDetails.Bookings.adventures.push(adventure);
      overallBookingNumber++;
      overallBookingCost += calculateAdventureCost();
  
      // Update booking display
      overallBookingNumberElement.innerText = overallBookingNumber;
      overallBookingCostElement.innerText = overallBookingCost;
      // Reset adventure-related fields
      needGuide.checked = false;
      adventureType.value = 'defaultAdventure';
  
      // Update the current cost display
      updateCurrentCost();
    });
  
    // Event listener for "Apply Code" button
    applyCodeBtn.addEventListener('click', function () {
      // Check if the entered promo code is valid
      if (promoCode.value === 'Promo123') {
        let cost = calculateAdventureCost() + calculateRoomCost();
        cost -= cost * 0.05;
  
        // Update the current cost display with the discounted price
        currentCost.innerText = cost;
  
        // Set the promoApplied flag to true
        promoApplied = true;
  
        alert(`Your code is applied, Please continue with your booking.
        `);
      }else{
        alert(`Your code is incorrect, try again.
      `);
      }
    });
  
    // Event listener for "Check Loyalty" button
    loyaltyCheckBtn.addEventListener('click', function () {
      // Check if the total number of booked rooms is greater than 3
      if (checkTotalRooms() > 3) {
        // Update the loyalty points display
        loyaltyPoints.innerText = checkTotalRooms() * 20;
      }else{
        alert(`You need to book 4 or more rooms to gain loyalty points.
      `);
      }
    });
  
    // Event listener for "Add to Favorites" button
    favouriteBtn.addEventListener('click', function () {
      // Check if the user name is provided
      if (userName.value === '') {
        alert('Please input your name');
        return;
      }
      overallBookingDetails.userName = userName.value;
      // Store the overall booking details in the local storage as a favorite
      localStorage.setItem('FavBooking', JSON.stringify(overallBookingDetails));
      
      // Display a confirmation alert for saving to favourites
      alert(`Your order has been addded to favourites, proceed to confirm order once you are done.
      `);
    });
  
    // Event listener for "Confirm Order" button
    confirmOrderBtn.addEventListener('click', function () {
      // Check if the user name is provided
      if (userName.value === '') {
        alert('Please input your name');
        return;
      }
  
      // Display a confirmation alert with order details
      alert(`Thank you for your booking ${userName.value}!!
      --Order Details--
      Number of Bookings: ${overallBookingNumber}.
      Total Cost: ${overallBookingCost} LKR.
      Check in Date: ${checkInDateStored}.
      Duration of Stay: ${stayDays}.
      Number of Room Bookings: ${overallBookingDetails.Bookings.rooms.length}.
      Number of Adventure: ${overallBookingDetails.Bookings.adventures.length}.
      Order Loyalty Points: ${overallBookingDetails.loyaltyPoints}.
      `);
      resetOverallBookingObject(); 
    });
  
    // Event listener for any changes within the booking form
    bookingForm.addEventListener('input', updateCurrentCost);
  });
