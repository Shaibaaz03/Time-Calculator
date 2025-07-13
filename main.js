document.addEventListener("DOMContentLoaded", () => {
  const nameInput = document.getElementById("nameInput");
  const enterBtn = document.getElementById("enter-btn");
  const error = document.getElementById("error");
  const timeInput = document.getElementById("timeInput");
  const convertBtn = document.getElementById("convert-btn");
  const deleteBtn = document.getElementById("delete-btn");
  const result = document.getElementById("result");
  const displayName = document.getElementById("displayName");

  const SHEET_URL = "https://script.google.com/macros/s/AKfycbz7JHze3swsx54_IdvyXlgf3N31PbJPGYaZSL6pwLPVkkQt3YwWtKBVRxT1Ya1X5LDUSg/exec"; // Replace with your actual Script URL

  function capitalizeName(name) {
    return name
      .trim()
      .split(/\s+/)
      .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join(" ");
  }

  // ========= index.html logic =========
  if (nameInput && enterBtn) {
    setTimeout(() => nameInput.focus(), 50);

    document.addEventListener("mousedown", (e) => {
      if (e.target !== nameInput && !e.target.closest("button")) {
        e.preventDefault();
        nameInput.focus();
      }
    });

    nameInput.addEventListener("keydown", (e) => {
      if (e.key === "Tab") {
        e.preventDefault();
        nameInput.focus();
      } else if (e.key === "Enter") {
        enterBtn.click();
      }
    });

    nameInput.addEventListener("blur", () => {
      setTimeout(() => nameInput.focus(), 50);
    });

    enterBtn.addEventListener("click", () => {
      const raw = nameInput.value.trim();

      if (raw === "") {
        error.textContent = "Please enter your name.";
        nameInput.classList.add("error");
        nameInput.focus();
      } else {
        const name = capitalizeName(raw);
        localStorage.setItem("username", name);

        fetch(SHEET_URL, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            name: name,
            start: new Date().toString()
          })
        });

        window.location.href = "name.html";
      }
    });
  }

  // ========= name.html logic =========
  if (timeInput && convertBtn && deleteBtn) {
    const name = localStorage.getItem("username");

    if (displayName) {
      displayName.textContent = `Welcome, ${name}!`;
    }

    setTimeout(() => timeInput.focus(), 50);

    document.addEventListener("mousedown", (e) => {
      if (e.target !== timeInput && !e.target.closest("button")) {
        e.preventDefault();
        timeInput.focus();
      }
    });

    timeInput.addEventListener("keydown", (e) => {
      if (e.key === "Tab") {
        e.preventDefault();
        timeInput.focus();
      } else if (e.key === "Enter") {
        convertBtn.click();
      }
    });

    timeInput.addEventListener("blur", () => {
      setTimeout(() => timeInput.focus(), 50);
    });

    // ===== Time Conversion =====
    convertBtn.addEventListener("click", () => {
      const parts = timeInput.value.trim().split(":").map(Number);

      if (parts.length !== 3 || parts.some(isNaN)) {
        result.textContent = "Invalid format. Use HH:MM:SS";
        timeInput.classList.add("error");
      } else {
        const [h, m, s] = parts;
        const totalMin = Math.floor(h * 60 + m + s / 60);
        let output = "";

        if (totalMin < 45) output = "30";
        else if (totalMin < 75) output = "60";
        else if (totalMin < 105) output = "90";
        else if (totalMin < 135) output = "120";
        else if (totalMin < 165) output = "150";
        else if (totalMin < 195) output = "180";
        else if (totalMin < 225) output = "210";
        else if (totalMin < 255) output = "240";
        else if (totalMin < 285) output = "270";
        else if (totalMin < 315) output = "300";
        else if (totalMin < 345) output = "330";
        else if (totalMin < 375) output = "360";
        else if (totalMin < 405) output = "390";
        else if (totalMin < 435) output = "420";
        else if (totalMin < 465) output = "450";
        else if (totalMin < 495) output = "480";
        else if (totalMin < 525) output = "510";
        else if (totalMin < 555) output = "540";
        else if (totalMin < 585) output = "570";
        else if (totalMin < 615) output = "600";
        else output = `${totalMin} minutes`;

        result.textContent = output;
        timeInput.classList.remove("error");
      }
    });

    deleteBtn.addEventListener("click", () => {
      timeInput.value = "";
      result.textContent = "";
      timeInput.classList.remove("error");
      timeInput.focus();
    });
  }
});
