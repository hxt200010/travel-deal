function validateStays() {
    var city = document.getElementById("stayCity").value.trim();
    var checkIn = new Date(document.getElementById("stayCheckIn").value);
    var checkOut = new Date(document.getElementById("stayCheckOut").value);
    var adults = parseInt(document.getElementById("stayAdults").value);
    var children = parseInt(document.getElementById("stayChildren").value);
    var infants = parseInt(document.getElementById("stayInfants").value);

    const validCities = [
        "Dallas",
        "Fort Worth",
        "Houston",
        "Austin",
        "San Antonio",
        "Los Angeles",
        "San Francisco",
        "San Diego",
        "San Jose",
        "Sacramento",
        "Fresno"
    ];

    const earliestDate = new Date("2024-09-01");
    const latestDate = new Date("2024-12-01");

    if (!validCities.includes(city)) {
        return alert("City must be in Texas or California.");
    } else if (checkIn < earliestDate || checkOut < earliestDate) {
        return alert("Check in and check out dates must be between Sep 1, 2024 and Dec 1, 2024.");
    } else if (checkIn > latestDate || checkOut > latestDate) {
        return alert("Check in and check out dates must be between Sep 1, 2024 and Dec 1, 2024.");
    } else if (checkIn >= checkOut) {
        return alert("Check in date must be before check out date.");
    } else if (isNaN(adults) || isNaN(children) || isNaN(infants)) {
        return alert("Must enter a number for adults, children, and infants.");
    } else if (adults < 1) {
        return alert("Must have at least one adult.")
    }

    var numGuests = adults + children;
    var numRooms = Math.ceil(numGuests / 2);
    
    var resultString = `Stay booked: ${numRooms} rooms in ${city} for ${numGuests} guests (${adults} adults, ${children} children, ${infants} infants) from ${checkIn.toDateString()} to ${checkOut.toDateString()}.`

    document.getElementById("stayResult").innerHTML = resultString;
}