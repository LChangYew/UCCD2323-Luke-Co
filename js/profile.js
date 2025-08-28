window.addEventListener("DOMContentLoaded", () => {
    // Clear localStorage once per browser session
    if (!sessionStorage.getItem("storageCleared")) {
        localStorage.clear();
        sessionStorage.setItem("storageCleared", "true");
    }

    const dropdownContent = document.getElementById("dropdown-content");
    const profileBtn = document.getElementById("profile-btn");
    const profileDropdown = document.querySelector(".profile-dropdown");

    function isLoggedIn() {
        return (
            localStorage.getItem("loggedIn") === "true" &&
            localStorage.getItem("loggedInUser")
        );
    }

    function renderDropdown() {
        dropdownContent.innerHTML = ""; // reset menu

        if (isLoggedIn()) {
            const username = localStorage.getItem("loggedInUser");

            dropdownContent.innerHTML = `
        <span class="dropdown-username">👤 ${username}</span>
        <a href="user-profile.html">User Profile</a>
        <button id="logout-btn">Logout</button>
      `;

            //Attach logout event here (since button now exists)
            document.getElementById("logout-btn").addEventListener("click", () => {
                alert("You have been logged out.");   // 👈 show message first
                localStorage.removeItem("loggedInUser");
                localStorage.removeItem("loggedIn");
                window.location.href = "index.html";
            });
        } else {
            dropdownContent.innerHTML = `
        <a href="login.html">Login / Sign Up</a>
      `;
        }
    }

    // Toggle dropdown on click
    if (profileBtn) {
        profileBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            profileDropdown.classList.toggle("show");
        });
    }

    // Close dropdown if clicking outside
    window.addEventListener("click", (e) => {
        if (!profileDropdown.contains(e.target)) {
            profileDropdown.classList.remove("show");
        }
    });

    renderDropdown();
});

