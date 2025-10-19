// Updates the local time
function updateDateTime() {
    document.getElementById("datetime").textContent = "Local time: " + new Date().toLocaleString();
}

// Update local time every 1s
setInterval(updateDateTime, 1000);

// Font size and background color changer
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