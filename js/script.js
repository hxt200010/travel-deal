// ===================== 🕒 Display Current Local Date/Time =====================
function updateDateTime() {
  document.querySelectorAll("#datetime").forEach(el => {
    el.textContent = "Local time: " + new Date().toLocaleString();
  });
}
setInterval(updateDateTime, 1000);

// ===================== 🎨 Font Size and Background Color =====================
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

// ===================== 📩 Contact Us Validation (Regex) =====================
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

// ===================== ✈️ Flights Page Validation (Regex) =====================
function toggleReturnDate() {
  const trip = document.getElementById("tripType").value;
  document.getElementById("returnLabel").style.display =
    trip === "round" ? "block" : "none";
}

function validateFlights() {
  const origin = document.getElementById("origin").value.trim();
  const dest = document.getElementById("destination").value.trim();
  const depart = new Date(document.getElementById("departDate").value);
  const ret = new Date(document.getElementById("returnDate").value);
  const adults = parseInt(document.getElementById("fAdults").value) || 0;
  const children = parseInt(document.getElementById("fChildren").value) || 0;
  const infants = parseInt(document.getElementById("fInfants").value) || 0;

  const validCities = [
    "Dallas", "Austin", "Houston", "San Antonio",
    "Los Angeles", "San Francisco", "San Diego"
  ];
  const start = new Date("2024-09-01");
  const end = new Date("2024-12-01");

  if (!validCities.includes(origin) || !validCities.includes(dest))
    return alert("Origin and destination must be cities in Texas or California.");
  if (depart < start || depart > end)
    return alert("Departure date must be between Sep 1 and Dec 1, 2024.");
  if (document.getElementById("tripType").value === "round" &&
      (ret < start || ret > end))
    return alert("Return date must be between Sep 1 and Dec 1, 2024.");
  if (adults > 4 || children > 4 || infants > 4)
    return alert("Each passenger category cannot exceed 4.");

  document.getElementById("flightResult").textContent =
    `✈️ Flight from ${origin} to ${dest} confirmed! (${adults} adults, ${children} children, ${infants} infants)`;
}

// ===================== 🏨 Stays Page Validation (No Regex) =====================
function validateStays() {
  const city = document.getElementById("stayCity").value.trim();
  const checkIn = new Date(document.getElementById("checkIn").value);
  const checkOut = new Date(document.getElementById("checkOut").value);
  const adults = parseInt(document.getElementById("adults").value) || 0;
  const children = parseInt(document.getElementById("children").value) || 0;
  const infants = parseInt(document.getElementById("infants").value) || 0;

  const validCities = [
    "Dallas", "Austin", "Houston", "San Antonio",
    "Los Angeles", "San Francisco", "San Diego"
  ];
  const start = new Date("2024-09-01");
  const end = new Date("2024-12-01");

  if (!validCities.includes(city))
    return alert("City must be in Texas or California.");
  if (checkIn < start || checkOut > end || checkIn >= checkOut)
    return alert("Invalid check-in/check-out date range.");
  const guests = adults + children;
  if (guests > 2 && infants === 0)
    return alert("Maximum 2 guests per room (infants allowed to exceed).");

  const rooms = Math.ceil(guests / 2);
  document.getElementById("stayResult").textContent =
    `🏨 Stay booked in ${city} for ${guests} guests. You need ${rooms} room(s).`;
}

// ===================== 🚗 Cars Page Validation (Using DOM Methods) =====================
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

// ===================== 🚢 Cruises Page Validation (Using jQuery) =====================
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
  "Palm Springs (PSP)"
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


