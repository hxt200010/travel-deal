function validateContact() {
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    const gender = document.querySelector('input[name="gender"]:checked');
    const comment = document.getElementById("comment").value;
    const result = document.getElementById("contactResult");


    const nameRegex = /^[A-Z][a-z]*$/; // First letter capital, rest lowercase, alphabetic only
    const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/; // (ddd) ddd-dddd
    const emailRegex = /^[^@]+@[^@]+\.[^@]+$/; // Contains @ and .

    if (!firstName) {
        result.textContent = "First Name is required.";
        result.style.color = "red";
        return false;
    }
    if (!nameRegex.test(firstName)) {
        result.textContent = "First Name must start with a capital letter and contain only alphabetic characters.";
        result.style.color = "red";
        return false;
    }

    if (!lastName) {
        result.textContent = "Last Name is required.";
        result.style.color = "red";
        return false;
    }
    if (!nameRegex.test(lastName)) {
        result.textContent = "Last Name must start with a capital letter and contain only alphabetic characters.";
        result.style.color = "red";
        return false;
    }

    if (firstName === lastName) {
        result.textContent = "First Name and Last Name cannot be the same.";
        result.style.color = "red";
        return false;
    }

    if (!phone) {
        result.textContent = "Phone Number is required.";
        result.style.color = "red";
        return false;
    }
    if (!phoneRegex.test(phone)) {
        result.textContent = "Please enter a valid phone number in the format (ddd) ddd-dddd.";
        result.style.color = "red";
        return false;
    }

    if (!email) {
        result.textContent = "Email Address is required.";
        result.style.color = "red";
        return false;
    }
    if (!emailRegex.test(email)) {
        result.textContent = "Please enter a valid email address containing '@' and '.'.";
        result.style.color = "red";
        return false;
    }

    if (!gender) {
        result.textContent = "Please select a gender.";
        result.style.color = "red";
        return false;
    }

    if (!comment) {
        result.textContent = "Comment is required.";
        result.style.color = "red";
        return false;
    }
    if (comment.length < 10) {
        result.textContent = "Comment must be at least 10 characters long.";
        result.style.color = "red";
        return false;
    }

    // If all validations pass
    result.textContent = "Form submitted successfully!";
    result.style.color = "#0078d7";
    return true;
}
