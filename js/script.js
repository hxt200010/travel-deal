
function updateDateTime() {
  document.querySelectorAll("#datetime").forEach(el => {
    el.textContent = "Local time: " + new Date().toLocaleString();
  });
}
setInterval(updateDateTime, 1000);

document.addEventListener("DOMContentLoaded", () => {
  const fontSizeRange = document.getElementById("fontSizeRange");
  const bgColorPicker = document.getElementById("bgColorPicker");

  if (fontSizeRange) {
    fontSizeRange.addEventListener("input", () => {
      document.body.style.fontSize = fontSizeRange.value + "px";
    });
  }

  if (bgColorPicker) {
    bgColorPicker.addEventListener("input", () => {
      document.body.style.backgroundColor = bgColorPicker.value;
    });
  }
});

function validateContact() {
  const f = document.getElementById("firstName").value.trim();
  const l = document.getElementById("lastName").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const email = document.getElementById("email").value.trim();
  const gender = document.querySelector("input[name='gender']:checked");
  const comment = document.getElementById("comment").value.trim();

  const nameRegex = /^[A-Z][a-z]+$/;
  const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!nameRegex.test(f) || !nameRegex.test(l))
    return alert("Names must start with a capital letter and contain only letters.");
  if (f === l)
    return alert("First and last name cannot be the same.");
  if (!phoneRegex.test(phone))
    return alert("Phone must be formatted as (ddd) ddd-dddd.");
  if (!emailRegex.test(email))
    return alert("Invalid email format.");
  if (!gender)
    return alert("Please select a gender.");
  if (comment.length < 10)
    return alert("Comment must be at least 10 characters long.");

  document.getElementById("contactResult").textContent =
    `✅ Thank you, ${f}! Your message has been submitted successfully.`;
}


function toggleReturnDate() {
  const trip = document.getElementById("tripType").value;
  document.getElementById("returnLabel").style.display =
    trip === "round" ? "block" : "none";
}

function validateFlights() {
  const origin = document.getElementById("origin").value.trim();
  const dest = document.getElementById("destination").value.trim();
  const departInput = document.getElementById("departDate").value;
  const returnInput = document.getElementById("returnDate").value;
  const adults = parseInt(document.getElementById("fAdults").value) || 0;
  const children = parseInt(document.getElementById("fChildren").value) || 0;
  const infants = parseInt(document.getElementById("fInfants").value) || 0;
  const tripType = document.getElementById("tripType").value;

  const validCities = [
    "Dallas", "Austin", "Houston", "San Antonio",
    "Los Angeles", "San Francisco", "San Diego",
    "Alaska", "Bahamas", "Europe", "Mexico"
  ];

  const missing = [];

  if (!origin) missing.push("Origin");
  if (!dest) missing.push("Destination");
  if (!departInput) missing.push("Departure Date");
  if (tripType === "round" && !returnInput) missing.push("Return Date");
  if (adults === 0 && children === 0 && infants === 0) missing.push("Passenger count");

  if (missing.length > 0) {
    return alert("Missing information: " + missing.join(", "));
  }

  if (!validCities.includes(origin) || !validCities.includes(dest)) {
    return alert("Origin and destination list include: Dallas, Austin, Houston, San Antonio, Los Angeles, San Francisco, San Diego, Alaska, Bahamas.");
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const depart = new Date(departInput);
  const ret = returnInput ? new Date(returnInput) : null;

  if (depart < today) {
    return alert("Departure date cannot be in the past.");
  }

  if (tripType === "round" && ret && ret < depart) {
    return alert("Return date must be after the departure date.");
  }

  if (adults > 4 || children > 4 || infants > 4) {
    return alert("Each passenger category cannot exceed 4.");
  }

  document.getElementById("flightResult").textContent =
    `✈️ Flight from ${origin} to ${dest} confirmed! (${adults} adults, ${children} children, ${infants} infants)`;
}


document.addEventListener("DOMContentLoaded", () => {
  // Set today's date as min
  const today = new Date().toISOString().split("T")[0];
  const departInput = document.getElementById("departDate");
  const returnInput = document.getElementById("returnDate");
  if (departInput) departInput.min = today;
  if (returnInput) returnInput.min = today;

  departInput.addEventListener("change", () => {
    returnInput.min = departInput.value;
  });

  // Passenger toggle logic
  const passengerIcon = document.getElementById("passengerIcon");
  const passengerForm = document.getElementById("passengerForm");

  if (passengerIcon && passengerForm) {
    passengerIcon.addEventListener("click", () => {
      // Toggle with animation
      if (passengerForm.style.display === "block") {
        passengerForm.style.opacity = "0";
        setTimeout(() => {
          passengerForm.style.display = "none";
        }, 300);
      } else {
        passengerForm.style.display = "block";
        passengerForm.style.opacity = "0";
        setTimeout(() => {
          passengerForm.style.opacity = "1";
        }, 10);
      }
    });
  }
});

function validateCars() {
  const city = document.getElementById("carCity").value.trim();
  const type = document.getElementById("carType").value;
  const inDate = new Date(document.getElementById("carCheckIn").value);
  const outDate = new Date(document.getElementById("carCheckOut").value);
  const start = new Date("2024-09-01");
  const end = new Date("2024-12-01");

  if (inDate < start || outDate > end || inDate >= outDate)
    return alert("Check-in/check-out must be between Sep 1 and Dec 1, 2024.");
  if (!["Economy", "SUV", "Compact", "Midsize"].includes(type))
    return alert("Car type must be one of: Economy, SUV, Compact, Midsize.");

  document.getElementById("carResult").textContent =
    `🚗 Car reserved: ${type} in ${city} from ${inDate.toDateString()} to ${outDate.toDateString()}.`;
}


$(function () {
  $("#cruiseSubmit").click(function () {
    const dest = $("#destinationCruise").val();
    const depart = new Date($("#departCruise").val());
    const min = parseInt($("#minDays").val());
    const max = parseInt($("#maxDays").val());
    const adults = parseInt($("#cAdults").val()) || 0;
    const children = parseInt($("#cChildren").val()) || 0;
    const infants = parseInt($("#cInfants").val()) || 0;

    const start = new Date("2024-09-01");
    const end = new Date("2024-12-01");

    if (depart < start || depart > end)
      return alert("Departure must be between Sep 1 and Dec 1, 2024.");
    if (min < 3 || max > 10 || min > max)
      return alert("Cruise duration must be between 3 and 10 days.");
    if (adults > 2 || children > 2)
      return alert("Max 2 guests per room (infants allowed to exceed).");

    $("#cruiseResult").text(
      `🚢 Cruise to ${dest} confirmed! Duration: ${min}-${max} days, ${adults} adults, ${children} children, ${infants} infants.`
    );
  });
});

// ===================== ✈️ Destination Auto-Suggestions =====================
const destinations = [
  "Dallas Fort Worth (DFW)",
  "Austin (AUS)",
  "Houston (IAH)",
  "San Antonio (SAT)",
  "Los Angeles (LAX)",
  "San Francisco (SFO)",
  "San Diego (SAN)",
  "Sacramento (SMF)",
  "El Paso (ELP)",
  "Long Beach (LGB)",
  "Palm Springs (PSP)",
  "Alaska (ANC)",
"Bahamas (NAS)",
"Europe (LHR)",
"Mexico (MEX)"
];

const destInput = document.getElementById("destination");
const suggestionsBox = document.getElementById("suggestions");

if (destInput && suggestionsBox) {
  destInput.addEventListener("input", () => {
    const query = destInput.value.toLowerCase();
    suggestionsBox.innerHTML = "";

    if (query.length === 0) {
      suggestionsBox.style.display = "none";
      return;
    }

    const matched = destinations.filter(d =>
      d.toLowerCase().includes(query)
    );

    if (matched.length > 0) {
      matched.forEach(item => {
        const div = document.createElement("div");
        div.textContent = item;
        div.classList.add("suggestion-item");
        div.addEventListener("click", () => {
          destInput.value = item;
          suggestionsBox.innerHTML = "";
          suggestionsBox.style.display = "none";
        });
        suggestionsBox.appendChild(div);
      });
      suggestionsBox.style.display = "block";
    } else {
      suggestionsBox.style.display = "none";
    }
  });

  document.addEventListener("click", (e) => {
    if (!suggestionsBox.contains(e.target) && e.target !== destInput) {
      suggestionsBox.style.display = "none";
    }
  });
}






// ===================== 🌍 Homepage Search Suggestions & Results =====================
const destinationsList = [
  "Dallas Fort Worth (DFW)",
  "Austin (AUS)",
  "Houston (IAH)",
  "San Antonio (SAT)",
  "Los Angeles (LAX)",
  "San Francisco (SFO)",
  "San Diego (SAN)",
  "Sacramento (SMF)",
  "El Paso (ELP)",
  "Long Beach (LGB)",
  "Palm Springs (PSP)"
];

const searchInput = document.getElementById("searchInput");
const homeSuggestions = document.getElementById("homeSuggestions");
const searchResults = document.getElementById("searchResults");
const searchBtn = document.getElementById("searchBtn");

if (searchInput && homeSuggestions) {
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    homeSuggestions.innerHTML = "";

    if (query.length === 0) {
      homeSuggestions.style.display = "none";
      return;
    }

    const matches = destinationsList.filter(dest =>
      dest.toLowerCase().includes(query)
    );

    if (matches.length > 0) {
      matches.forEach(match => {
        const item = document.createElement("div");
        item.textContent = match;
        item.classList.add("suggestion-item");
        item.addEventListener("click", () => {
          searchInput.value = match;
          homeSuggestions.style.display = "none";
        });
        homeSuggestions.appendChild(item);
      });
      homeSuggestions.style.display = "block";
    } else {
      homeSuggestions.style.display = "none";
    }
  });

  document.addEventListener("click", e => {
    if (!homeSuggestions.contains(e.target) && e.target !== searchInput) {
      homeSuggestions.style.display = "none";
    }
  });
}

if (searchBtn) {
  searchBtn.addEventListener("click", () => {
    const selected = searchInput.value.trim();
    const date = document.getElementById("searchDate").value;

    if (!selected) {
      alert("Please enter or select a destination!");
      return;
    }

    searchResults.innerHTML = `
      <div class="results-card">
        <h3>🌴 Available Deals to ${selected}</h3>
        <p>Departure Date: ${date || "Flexible"}</p>
        <ul>
          <li>✈️ Flight + Hotel Package — from $599</li>
          <li>🏨 Hotel Only — from $249/night</li>
          <li>🚗 Car Rentals — from $49/day</li>
        </ul>
      </div>
    `;
  });
}



// ===================== 🏠 Index/Home Booking Page Validation =====================
function validateHomeBooking() {
  const tripType = document.getElementById("tripType")?.value;
  const origin = document.getElementById("searchInput")?.value.trim();
  const destination = document.getElementById("destinationInput")?.value.trim();
  const departDate = document.getElementById("searchDate")?.value;
  const returnDate = document.getElementById("returnDate")?.value;
  const adults = parseInt(document.getElementById("fAdults")?.value) || 0;
  const children = parseInt(document.getElementById("fChildren")?.value) || 0;
  const infants = parseInt(document.getElementById("fInfants")?.value) || 0;

  const missing = [];

  if (!tripType) missing.push("Trip Type");
  if (!origin) missing.push("Origin");
  if (!destination) missing.push("Destination");
  if (!departDate) missing.push("Departure Date");
  if (tripType === "round" && !returnDate) missing.push("Return Date");
  if (adults === 0 && children === 0 && infants === 0) missing.push("Passenger Count");

  if (missing.length > 0) {
    return alert("Missing information: " + missing.join(", "));
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const depart = new Date(departDate);
  const ret = returnDate ? new Date(returnDate) : null;

  if (depart < today) return alert("Departure date cannot be in the past.");
  if (tripType === "round" && ret && ret < depart)
    return alert("Return date must be after departure date.");

  // ✅ Display all entered info after validation
  document.getElementById("searchResults").innerHTML = `
    <div class="results-card">
      <h3>✈️ Booking Summary</h3>
      <p><strong>Trip Type:</strong> ${tripType === "round" ? "Round Trip" : "One Way"}</p>
      <p><strong>Origin:</strong> ${origin}</p>
      <p><strong>Destination:</strong> ${destination}</p>
      <p><strong>Departure Date:</strong> ${departDate}</p>
      ${tripType === "round" ? `<p><strong>Return Date:</strong> ${returnDate}</p>` : ""}
      <p><strong>Passengers:</strong> ${adults} Adults, ${children} Children, ${infants} Infants</p>
    </div>
  `;
}
