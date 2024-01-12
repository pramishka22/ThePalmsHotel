
document.addEventListener('DOMContentLoaded', function () {
   
    const bookingForm = document.getElementById('bookingForm');
  
    
    const bookRoomBtn = document.getElementById('bookRoom');
    const bookAdventureBtn = document.getElementById('bookAdventure');
  
    
    const confirmOrderBtn = document.getElementById('confirmOrder');
    const loyaltyCheckBtn = document.getElementById('loyaltyCheck');
    const applyCodeBtn = document.getElementById('applyCode');
    const favouriteBtn = document.getElementById('favourite');
    const promoCode = document.getElementById('promoCode');
    const userName = document.getElementById('name');
  
    const numOfRooms = document.getElementById('numRooms');
    const numOfAdults = document.getElementById('numAdults');
    const numOfChildren = document.getElementById('numChildren');
    const durationOfStay = document.getElementById('duration');
    const checkInDate = document.getElementById('checkInDate');
    const roomType = document.getElementById('roomType');
    const viewType = document.getElementById('view');
    const wifi = document.getElementById('wifi');
    const extraBed = document.getElementById('extraBed');
  
    const adventureType = document.getElementById('adventureType');
    const needGuide = document.getElementById('guide');
  
    const currentCost = document.getElementById('currentCost');
    const loyaltyPoints = document.getElementById('loyaltyPoints');
    const overallBookingNumberElement = document.getElementById('overallBookingNumber');
    const overallBookingCostElement = document.getElementById('overallBookingCost');
  
    
    let overallBookingNumber = 0;
    let overallBookingCost = 0;
    let checkInDateStored = '';
    overallBookingNumberElement.innerText = overallBookingNumber;
    overallBookingCostElement.innerText = overallBookingCost;
    currentCost.innerText = 0;
  
    
    let promoApplied = false;
  
   
    let overallBookingDetails = {
      Bookings: {
        rooms: [],
        adventures: [],
      },
      loyaltyPoints: 0,
      userName: '',
    };
  
    
    function calculateRoomCost() {
      let totalCost = 0;
      totalCost += getRoomCost() * numOfRooms.value * durationOfStay.value;
      if (numOfChildren > 0) {
        totalCost += 5000;
      }
  
      
      if (extraBed.checked) {
        totalCost += 8000;
      }
  
      
      if (typeof totalCost === 'number') {
        return totalCost;
      } else {
        return 0;
      }
    }
  
    
    function calculateAdventureCost() {
      const selectedOptionValue = adventureType.value;
  
      let cost = 0;
  
      
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
          cost += 0.0; 
          break;
      }
  
      // If a guide is needed
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
            cost += 0.0; 
            break;
        }
      }
      return cost;
    }
  
    
    function getRoomCost() {
      const selectedOptionValue = roomType.value;
  
      let cost = 0;
  
      
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
          cost += 0.0; 
          break;
      }
  
      return cost;
    }
  
    
    function checkRoomCapacity() {
      let roomValue = 0;
  
      console.log(roomValue);
      
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
          roomValue += 0.0; 
          break;
      }
  
      let totalRoomValue = roomValue * numOfRooms.value;
  
      
      if (extraBed.checked) {
        totalRoomValue += 1;
      }
      
      return totalRoomValue >= numOfAdults.value;
    }
  
    
    function updateCurrentCost() {
      let curCost = calculateRoomCost() + calculateAdventureCost();
      if (promoApplied) {
        curCost -= curCost * 0.05;
      }
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
      
      resetRoomFields();
  
      updateCurrentCost();
    });
  
    // Event listener for "Book Adventure" button
    bookAdventureBtn.addEventListener('click', function () {
      // Check if an adventure type is selected
      if (adventureType.value === 'defaultAdventure') {
        alert('Please select an Adventure type.');
        return;
      }
  
      
      let cost = calculateAdventureCost();
      if (promoApplied) {
        cost -= cost * 0.05;
      }
  
      
      const adventure = {
        adventureType: adventureType.value,
        needGuide: needGuide.checked,
        cost,
      };
  
      
      alert(`Your booking has been saved, proceed to confirm order once you are done.
      `);
  
      // Update overall booking details
      overallBookingDetails.Bookings.adventures.push(adventure);
      overallBookingNumber++;
      overallBookingCost += calculateAdventureCost();
  
      
      overallBookingNumberElement.innerText = overallBookingNumber;
      overallBookingCostElement.innerText = overallBookingCost;
      // Reset adventure-related fields
      needGuide.checked = false;
      adventureType.value = 'defaultAdventure';
  
      
      updateCurrentCost();
    });
  
    
    applyCodeBtn.addEventListener('click', function () {
      if (promoCode.value === 'Promo123') {
        let cost = calculateAdventureCost() + calculateRoomCost();
        cost -= cost * 0.05;
  
       
        currentCost.innerText = cost;
        promoApplied = true;
  
        alert(`Your code is applied, Please continue with your booking.
        `);
      }else{
        alert(`Your code is incorrect, try again.
      `);
      }
    });
  
    
    loyaltyCheckBtn.addEventListener('click', function () {
      
      if (checkTotalRooms() > 3) {
        loyaltyPoints.innerText = checkTotalRooms() * 20;
      }else{
        alert(`You need to book 4 or more rooms to gain loyalty points.
      `);
      }
    });
  
    // Event listener for "Add to Favorites" button
    favouriteBtn.addEventListener('click', function () {
      if (userName.value === '') {
        alert('Please input your name');
        return;
      }
      overallBookingDetails.userName = userName.value;
      localStorage.setItem('FavBooking', JSON.stringify(overallBookingDetails));
      
      
      alert(`Your order has been addded to favourites, proceed to confirm order once you are done.
      `);
    });
  
    // Event listener for "Confirm Order" button
    confirmOrderBtn.addEventListener('click', function () {
      
      if (userName.value === '') {
        alert('Please input your name');
        return;
      }
  
      
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
  
