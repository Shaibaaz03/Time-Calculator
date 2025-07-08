const input = document.getElementById("timeInput");

input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    convertTimeToBracket();
  }
});
function convertTimeToBracket() {
  const timeStr = document.getElementById("timeInput").value.trim();
  const parts = timeStr.split(":").map(Number);

  if (parts.length !== 3 || parts.some(isNaN)) {
    document.getElementById("result").innerText = "Invalid format. Use HH:MM:SS";
    return;
  }

  const [hours, minutes, seconds] = parts;
  const totalSeconds = (hours * 3600) + (minutes * 60) + seconds;

  if (totalSeconds < (44 * 60 + 59)) {
    document.getElementById("result").innerText = "30";
  } else if (totalSeconds < (75 * 60)) { // 1:15:00
    document.getElementById("result").innerText = "60";
  } else if (totalSeconds < (105 * 60)) { // 1:45:00
    document.getElementById("result").innerText = "90";
  } else if (totalSeconds < (135 * 60)) { // 2:15:00
    document.getElementById("result").innerText = "120";
  } else if (totalSeconds < (165 * 60)) { // 2:45:00
    document.getElementById("result").innerText = "150";
  } else if (totalSeconds < (195 * 60)) { // 3:15:00
    document.getElementById("result").innerText = "180";
  } else if (totalSeconds < (225 * 60)) { // 3:45:00
    document.getElementById("result").innerText = "210";
  } else {
    const totalMinutes = totalSeconds / 60;
    const roundedMinutes = totalMinutes.toFixed(2);
    document.getElementById("result").innerText = `Total Minutes: ${roundedMinutes}`;
  }
}