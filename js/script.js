let lastScroll = 0;
const banner = document.querySelector('.banner');
const video1 = document.getElementById('video1');
const video2 = document.getElementById('video2');

if (video2) video2.style.display = 'none';

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  if (currentScroll > lastScroll) {
    if (banner) banner.classList.add('hidden');
  } else {
    if (banner) banner.classList.remove('hidden');
  }
  lastScroll = currentScroll;
});

if (video1) {
  video1.addEventListener('ended', () => {
    video1.pause();
    video1.style.display = 'none';
    if (video2) {
      video2.style.display = 'block';
      video2.play();
    }
  });
}

if (video2) {
  video2.addEventListener('ended', () => {
    video2.pause();
    video2.style.display = 'none';
    if (video1) {
      video1.style.display = 'block';
      video1.play();
    }
  });
}

// Dropdown toggle
const profileBtn = document.getElementById("profile-btn");
const profileDropdown = document.querySelector(".profile-dropdown");

if (profileBtn) {
  profileBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // prevent closing immediately
    profileDropdown.classList.toggle("show");
  });
}

// Close dropdown if clicking outside
window.addEventListener("click", (e) => {
  if (profileDropdown && !profileDropdown.contains(e.target)) {
    profileDropdown.classList.remove("show");
  }
});

// Logout button
const logoutBtn = document.getElementById("logout-btn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
  });
}

function checkFirstTimeUserDiscount() {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const loggedInUser = localStorage.getItem("loggedInUser");
    
    if (storedUser && loggedInUser && storedUser.isFirstTimeUser && storedUser.hasDiscount) {
        return {
            isEligible: true,
            discountPercent: 10,
            code: "WELCOME10"
        };
    }
    return { isEligible: false, discountPercent: 0, code: null };
}

function applyFirstTimeDiscount(total) {
    const discount = checkFirstTimeUserDiscount();
    if (discount.isEligible) {
        const discountAmount = total * (discount.discountPercent / 100);
        const newTotal = total - discountAmount;
        return {
            originalTotal: total,
            discountAmount: discountAmount,
            finalTotal: newTotal,
            discountPercent: discount.discountPercent,
            code: discount.code
        };
    }
    return null;
}

function markDiscountAsUsed() {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
        storedUser.hasDiscount = false;
        localStorage.setItem("user", JSON.stringify(storedUser));
    }
}

/* ==========================
   Cart + Checkout 
========================== */
document.addEventListener("DOMContentLoaded", () => {
  // Fixed function to match your cart data structure
  function displayCartItems(containerSelector, totalSelector) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const container = document.querySelector(containerSelector);
    const totalElement = document.querySelector(totalSelector);
    

    if (!container || !totalElement) return;

    container.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
      // Use the correct property names: item.price and item.qty (not quantity)
      const price = typeof item.price === "string"
        ? parseFloat(item.price.replace(/[^0-9.]/g, ""))
        : item.price;

      const subtotal = price * item.qty; // Changed from item.quantity to item.qty
      total += subtotal;

      const div = document.createElement("div");
      // Use item.title (not item.name) and item.qty (not item.quantity)
      div.textContent = `${item.title} (x${item.qty}) - MYR ${subtotal.toFixed(2)}`;
      container.appendChild(div);
    });

    totalElement.textContent = `MYR ${total.toFixed(2)}`;
    localStorage.setItem("checkoutTotal", total.toFixed(2));
  }

  // DETAILS PAGE 
  if (document.body.classList.contains("details-page")) {
    displayCartItems("#order-items-list", "#order-total");

    const form = document.getElementById("checkout-form");
    if (form) {
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
        setTimeout(() => {
          window.location.href = "index.html";
        }, 3000);
      });
    }
  }
});

class CookieConsent {
  constructor() {
    this.consentGiven = localStorage.getItem('cookieConsent');
    this.init();
  }

  init() {
    if (!this.consentGiven) {
      this.showCookieBanner();
    }
    this.bindEvents();
  }

  showCookieBanner() {
    setTimeout(() => {
      document.getElementById('cookie-consent').classList.add('show');
    }, 1000);
  }

  hideCookieBanner() {
    document.getElementById('cookie-consent').classList.remove('show');
  }

  showModal() {
    document.getElementById('cookie-modal').classList.add('show');
  }

  hideModal() {
    document.getElementById('cookie-modal').classList.remove('show');
  }

  acceptAllCookies() {
    const consent = {
      essential: true,
      analytics: true,
      functional: true,
      timestamp: new Date().toISOString()
    };
    this.saveCookieConsent(consent);
    this.hideCookieBanner();
    this.hideModal();
    console.log('All cookies accepted');
  }

  declineCookies() {
    const consent = {
      essential: true,
      analytics: false,
      functional: false,
      timestamp: new Date().toISOString()
    };
    this.saveCookieConsent(consent);
    this.hideCookieBanner();
    console.log('Non-essential cookies declined');
  }

  saveCustomSettings() {
    const consent = {
      essential: true,
      analytics: document.getElementById('analytics-cookies').checked,
      functional: document.getElementById('functional-cookies').checked,
      timestamp: new Date().toISOString()
    };
    this.saveCookieConsent(consent);
    this.hideCookieBanner();
    this.hideModal();
    console.log('Custom cookie settings saved:', consent);
  }

  saveCookieConsent(consent) {
    localStorage.setItem('cookieConsent', JSON.stringify(consent));
    this.consentGiven = consent;

    // Here you would typically load your tracking scripts based on consent
    if (consent.analytics) {
      this.loadAnalytics();
    }
    if (consent.functional) {
      this.loadFunctional();
    }
  }

  loadAnalytics() {
    // Load Google Analytics or other analytics scripts
    console.log('Loading analytics scripts...');
  }

  loadFunctional() {
    // Load functional cookies
    console.log('Loading functional scripts...');
  }

  bindEvents() {
    // Accept all cookies
    document.getElementById('accept-cookies').addEventListener('click', () => {
      this.acceptAllCookies();
    });

    // Decline cookies
    document.getElementById('decline-cookies').addEventListener('click', () => {
      this.declineCookies();
    });

    // Open settings modal
    document.getElementById('cookie-settings').addEventListener('click', () => {
      this.showModal();
    });

    // Accept all from modal
    document.getElementById('accept-all-modal').addEventListener('click', () => {
      this.acceptAllCookies();
    });

    // Save custom settings
    document.getElementById('save-settings').addEventListener('click', () => {
      this.saveCustomSettings();
    });

    // Close modal when clicking outside
    document.getElementById('cookie-modal').addEventListener('click', (e) => {
      if (e.target.id === 'cookie-modal') {
        this.hideModal();
      }
    });

    // Privacy policy link
    document.getElementById('privacy-link').addEventListener('click', (e) => {
      e.preventDefault();
      // Redirect to your privacy policy page
      console.log('Redirect to privacy policy');
    });
  }
}

// Initialize cookie consent when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new CookieConsent();
});

const toggleBtn = document.getElementById("theme-toggle");
const body = document.body;

toggleBtn.addEventListener("click", () => {
  const currentTheme = body.getAttribute("data-theme");
  const newTheme = currentTheme === "light" ? "dark" : "light";
  body.setAttribute("data-theme", newTheme);

  
  sessionStorage.setItem("theme", newTheme);

  toggleBtn.textContent = newTheme === "light" ? "🌙" : "☀";
});


window.addEventListener("load", () => {
  const savedTheme = sessionStorage.getItem("theme") || "light";
  body.setAttribute("data-theme", savedTheme);
  toggleBtn.textContent = savedTheme === "light" ? "🌙" : "☀";
});