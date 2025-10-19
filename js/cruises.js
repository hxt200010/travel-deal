// Adam McCutcheon

function validateCruises() {
    var destination = $("#cruiseDestination").val().trim();
    var departingEarliest = new Date($("#cruiseDepartingEarliest").val());
    var departingLatest = new Date($("#cruiseDepartingLatest").val());
    var durationMinimum = parseInt($("#cruiseDurationMinimum").val());
    var durationMaximum = parseInt($("#cruiseDurationMaximum").val());
    var adults = parseInt($("#cruiseAdults").val());
    var children = parseInt($("#cruiseChildren").val());
    var infants = parseInt($("#cruiseInfants").val());

    const validDestinations = [
        "Alaska",
        "Bahamas",
        "Europe",
        "Mexico"
    ];

    const earliestDate = new Date("2024-09-01");
    const latestDate = new Date("2024-12-01");

    if (!validDestinations.includes(destination)) {
        return alert("Destination must be Alaska, Bahamas, Europe, or Mexico.");
    } else if (departingEarliest < earliestDate || departingLatest < earliestDate) {
        return alert("Departure date must be between Sep 1, 2024 and Dec 1, 2024.");
    } else if (departingEarliest > latestDate || departingLatest > latestDate) {
        return alert("Departure date must be between Sep 1, 2024 and Dec 1, 2024.");
    } else if (departingEarliest > departingLatest) {
        return alert("Earliest departure date must be on or before latest departure date.");
    } else if (isNaN(durationMinimum) || isNaN(durationMaximum)) {
        return alert("Must enter a number for minimum and maximum duration.");
    } else if (durationMinimum < 3 || durationMaximum < 3) {
        return alert("Minimum duration must be at least 3 days.");
    } else if (durationMinimum > 10 || durationMaximum > 10) {
        return alert("Maximum duration cannot be greater than 10 days.");
    } else if (durationMinimum > durationMaximum) {
        return alert("Minimum duration must be less than or equal to maximum duration.");
    } else if (isNaN(adults) || isNaN(children) || isNaN(infants)) {
        return alert("Must enter a number for adults, children, and infants.");
    } else if (adults < 1) {
        return alert("Must have at least one adult.")
    }

    var numGuests = adults + children;
    var numRooms = Math.ceil(numGuests / 2);
    
    var resultString = `Cruise booked: ${numRooms} rooms on ${durationMinimum}-${durationMaximum} day ${destination} cruise for ${numGuests} guests (${adults} adults, ${children} children, ${infants} infants) departing between ${departingEarliest.toDateString()} and ${departingLatest.toDateString()}.`;

    document.getElementById("cruiseResult").innerHTML = resultString;
}