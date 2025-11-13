document.addEventListener("DOMContentLoaded", () => {
  const isSuccessPage = window.location.pathname.includes("success.html");
  const emailInput = document.getElementById("email");
  const subBtn = document.querySelector(".sub-btn");
  const dismissBtn = document.querySelector(".dismiss-btn");
  const errorMsg = document.querySelector("em");
  const confirmedEmailSpan = document.getElementById("confirmed-email");

  if (!isSuccessPage) {
    // On index.html
    subBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const email = emailInput.value.trim();

      if (
        !emailInput.checkValidity() ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
      ) {
        emailInput.classList.add("error");
        errorMsg.classList.add("visible");
        return;
      }

      // Save email and redirect
      localStorage.setItem("subscribedEmail", email);
      window.location.href = "success.html";
    });

    // Optional: Enter key support
    emailInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") subBtn.click();
    });
  } else {
    // On success.html
    const savedEmail = localStorage.getItem("subscribedEmail");
    if (savedEmail && confirmedEmailSpan) {
      confirmedEmailSpan.textContent = savedEmail;
    }

    dismissBtn.addEventListener("click", () => {
      localStorage.removeItem("subscribedEmail");
      window.location.href = "index.html";
    });
  }
});
