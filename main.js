document.addEventListener("DOMContentLoaded", () => {
  const nameInput = document.getElementById("nameInput");
  const enterBtn = document.getElementById("enter-btn");
  const error = document.getElementById("error");
  const timeInput = document.getElementById("timeInput");
  const convertBtn = document.getElementById("convert-btn");
  const deleteBtn = document.getElementById("delete-btn");
  const result = document.getElementById("result");
  const displayName = document.getElementById("displayName");

  const googleScriptURL = "AKfycbzb3vSiHwqpJkKY1ETeaSxkgELjJuxekR4v9A_RJp_v_BxMIA4QmmclkTzx61ywNpsB";

  // Capitalize each word in a name
  function capitalizeName(name) {
    return name
      .trim()
      .split(/\s+/)
      .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join(" ");
  }

  // ------------- index.html logic -------------
  if (nameInput && enterBtn) {
    // Force autofocus
    nameInput.focus();

    nameInput.addEventListener("keydown", e => {
      if (e.key === "Enter") enterBtn.click();
    });

    enterBtn.addEventListener("click", () => {
      const raw = nameInput.value.trim();
      if (!raw) {
        error.textContent = "Please enter your name.";
        nameInput.classList.add("error");
        nameInput.focus();
        return;
      }
      const name = capitalizeName(raw);
      localStorage.setItem("username", name);
      // send start time
      fetch(googleScriptURL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ name, start: new Date().toLocaleString() })
      });
      window.location.href = "name.html";
    });

    document.addEventListener("mousedown", e => {
      if (e.target !== nameInput && !e.target.closest("button")) {
        e.preventDefault();
        nameInput.focus();
      }
    });
  }

  // ------------- name.html logic -------------
  if (timeInput && convertBtn && deleteBtn) {
    const username = localStorage.getItem("username") || "";

    // Display greeting
    if (displayName) {
      displayName.textContent = `Welcome, ${username}!`;
    }

    // Force autofocus
    timeInput.focus();
    document.addEventListener("mousedown", e => {
      if (e.target !== timeInput && !e.target.closest("button")) {
        e.preventDefault();
        timeInput.focus();
      }
    });

    // Log end time on unload
    window.addEventListener("beforeunload", () => {
      navigator.sendBeacon(
        googleScriptURL,
        new URLSearchParams({ name: username, end: new Date().toLocaleString() })
      );
    });

    // Convert button / Enter key
    function convertTime() {
      const parts = timeInput.value.trim().split(":").map(Number);
      if (parts.length !== 3 || parts.some(isNaN)) {
        result.textContent = "Invalid format. Use HH:MM:SS";
        timeInput.classList.add("error");
        return;
      }
      timeInput.classList.remove("error");
      const [h, m, s] = parts;
      const totalMin = Math.floor((h*3600 + m*60 + s)/60);
      if (totalMin < 45) result.textContent = "30";
      else if (totalMin < 75) result.textContent = "60";
      else if (totalMin < 105) result.textContent = "90";
      else if (totalMin < 135) result.textContent = "120";
      else if (totalMin < 165) result.textContent = "150";
      else if (totalMin < 195) result.textContent = "180";
      else if (totalMin < 225) result.textContent = "210";
      else if (totalMin < 255) result.textContent = "240";
      else if (totalMin < 285) result.textContent = "270";
      else if (totalMin < 315) result.textContent = "300";
      else if (totalMin < 345) result.textContent = "330";
      else if (totalMin < 375) result.textContent = "360";
      else if (totalMin < 405) result.textContent = "390";
      else if (totalMin < 435) result.textContent = "420";
      else if (totalMin < 465) result.textContent = "450";
      else if (totalMin < 495) result.textContent = "480";
      else if (totalMin < 525) result.textContent = "510";
      else if (totalMin < 555) result.textContent = "540";
      else if (totalMin < 585) result.textContent = "570";
      else if (totalMin < 615) result.textContent = "600";
      else result.textContent = `Total Minutes: ${(totalMin).toFixed(2)}`;
    }

    convertBtn.addEventListener("click", () => {
      convertTime();
      timeInput.focus();
    });
    timeInput.addEventListener("keydown", e => {
      if (e.key === "Enter") convertTime();
    });
    deleteBtn.addEventListener("click", () => {
      timeInput.value = "";
      result.textContent = "";
      timeInput.classList.remove("error");
      timeInput.focus();
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const nameInput = document.getElementById("nameInput");
  const enterBtn  = document.getElementById("enter-btn");
  const error     = document.getElementById("error");
  const SHEET_URL = "https://script.google.com/macros/s/AKfycbzb3vSiHwqpJkKY1ETeaSxkgELjJuxekR4v9A_RJp_v_BxMIA4QmmclkTzx61ywNpsB/exec"; // ← your URL

  // Force focus on load
  nameInput.focus();

  // Capitalize helper
  function capitalize(name) {
    return name
      .trim()
      .split(/\s+/)
      .map(w => w[0].toUpperCase() + w.slice(1).toLowerCase())
      .join(" ");
  }

  function submitName() {
    const raw = nameInput.value;
    if (!raw.trim()) {
      error.textContent = "Please enter your name.";
      nameInput.focus();
      return;
    }
    const name = capitalize(raw);

    // Send name to Google Sheet
    fetch(SHEET_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `name=${encodeURIComponent(name)}`
    });
  }

  enterBtn.addEventListener("click", submitName);
  nameInput.addEventListener("keydown", e => {
    if (e.key === "Enter") submitName();
  });
});

