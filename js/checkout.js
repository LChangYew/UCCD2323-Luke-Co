/* ==========================
   Cart + Checkout 
========================== */
document.addEventListener("DOMContentLoaded", () => {
  // Save + Load Helpers
  function saveToCookie(name, value, days = 7) {
    const d = new Date();
    d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${encodeURIComponent(value)};expires=${d.toUTCString()};path=/`;
  }

  function getCookie(name) {
    const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
    return match ? decodeURIComponent(match[2]) : "";
  }

  // Fixed function to match your cart data structure
  function displayCartItems(containerSelector, totalSelector) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const container = document.querySelector(containerSelector);
    const totalElement = document.querySelector(totalSelector);

    if (!container || !totalElement) return;

    container.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
      const price = typeof item.price === "string"
        ? parseFloat(item.price.replace(/[^0-9.]/g, ""))
        : item.price;

      const subtotal = price * item.qty;
      total += subtotal;

      const div = document.createElement("div");
      div.textContent = `${item.title} (x${item.qty}) - MYR ${subtotal.toFixed(2)}`;
      container.appendChild(div);
    });

    totalElement.textContent = `MYR ${total.toFixed(2)}`;
    localStorage.setItem("checkoutTotal", total.toFixed(2));
  }

  // ====== CHECKOUT PAGE ======
  if (document.body.classList.contains("details-page")) {
    displayCartItems("#order-items-list", "#order-total");

    const form = document.getElementById("checkout-form");
    if (form) {
      // Autofill from cookies
      ["fullName", "email", "phone", "address"].forEach(field => {
        const input = form.querySelector(`[name='${field}']`);
        if (input) {
          const saved = getCookie(field);
          if (saved) input.value = saved;

          // Save while typing
          input.addEventListener("input", () => {
            saveToCookie(field, input.value, 7);
          });
        }
      });

      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const details = {
          fullName: form.querySelector("[name='fullName']").value,
          email: form.querySelector("[name='email']").value,
          phone: form.querySelector("[name='phone']").value,
          address: form.querySelector("[name='address']").value,
        };
        localStorage.setItem("customerDetails", JSON.stringify(details));
        window.location.href = "payment.html";
      });

      const nextBtn = form.querySelector(".next-btn");
      if (nextBtn) {
        nextBtn.addEventListener("click", () => form.requestSubmit());
      }
    }
  }

  // ====== PAYMENT PAGE ======
  if (document.body.classList.contains("payment-page")) {
    displayCartItems("#order-items-list", "#order-total");

    const form = document.getElementById("checkout-form");
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const payment = form.querySelector("input[name='payment']:checked");
        if (!payment) {
          alert("Please select a payment method.");
          return;
        }
        localStorage.setItem("paymentMethod", payment.value);
        window.location.href = "summary.html";
      });

      const nextBtn = form.querySelector(".next-btn");
      if (nextBtn) {
        nextBtn.addEventListener("click", () => form.requestSubmit());
      }
    }
  }

  // ====== SUMMARY PAGE ======
  if (document.body.classList.contains("summary-page")) {
    displayCartItems("#order-items-list", "#summary-total");

    const details = JSON.parse(localStorage.getItem("customerDetails")) || {};
    const payment = localStorage.getItem("paymentMethod") || "N/A";

    const summaryElements = {
      fullName: document.getElementById("summary-fullName"),
      email: document.getElementById("summary-email"),
      phone: document.getElementById("summary-phone"),
      address: document.getElementById("summary-address"),
      payment: document.getElementById("summary-payment")
    };

    if (summaryElements.fullName) summaryElements.fullName.textContent = details.fullName || "N/A";
    if (summaryElements.email) summaryElements.email.textContent = details.email || "N/A";
    if (summaryElements.phone) summaryElements.phone.textContent = details.phone || "N/A";
    if (summaryElements.address) summaryElements.address.textContent = details.address || "N/A";
    if (summaryElements.payment) summaryElements.payment.textContent = payment;

    const form = document.getElementById("checkout-form");
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const successMessage = document.getElementById("success-message");
        if (successMessage) {
          successMessage.style.display = "block";
        }
        localStorage.clear();
        // Keep cookies so autofill works next time
        setTimeout(() => {
          window.location.href = "index.html";
        }, 3000);
      });
    }
  }
});
