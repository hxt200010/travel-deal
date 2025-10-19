// Adam McCutcheon

function validateCars() {
    var city = document.getElementById("carCity").value.trim();
    var checkIn = new Date(document.getElementById("carCheckIn").value);
    var checkOut = new Date(document.getElementById("carCheckOut").value);
    var type = document.getElementById("carType").value;

    const validTypes = [
        "Economy",
        "SUV",
        "Compact",
        "Midsize"
    ];

    const earliestDate = new Date("2024-09-01");
    const latestDate = new Date("2024-12-01");

    if (city == "") {
        return alert("Must specify a city.");
    } else if (!validTypes.includes(type)) {
        return alert("Car type must be Economy, SUV, Compact, or Midsize.");
    } else if (checkIn < earliestDate || checkOut < earliestDate) {
        return alert("Check in and check out dates must be between Sep 1, 2024 and Dec 1, 2024.");
    } else if (checkIn > latestDate || checkOut > latestDate) {
        return alert("Check in and check out dates must be between Sep 1, 2024 and Dec 1, 2024.");
    } else if (checkIn >= checkOut) {
        return alert("Check in date must be before check out date.");
    }

    var resultString = `Car booked: ${type} in ${city} from ${checkIn.toDateString()} to ${checkOut.toDateString()}.`

    document.getElementById("carResult").innerHTML = resultString;
}