const tabLogin = document.getElementById("tab-login");
const tabSignup = document.getElementById("tab-signup");
const panelLogin = document.getElementById("panel-login");
const panelSignup = document.getElementById("panel-signup");

tabLogin.addEventListener("click", () => {
    tabLogin.classList.add("active");
    tabSignup.classList.remove("active");
    panelLogin.hidden = false;
    panelSignup.hidden = true;
});

tabSignup.addEventListener("click", () => {
    tabSignup.classList.add("active");
    tabLogin.classList.remove("active");
    panelSignup.hidden = false;
    panelLogin.hidden = true;
});

// Handle signup form
document.getElementById("signup-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("signup-name").value;
    const email = document.getElementById("signup-email").value;
    const pass = document.getElementById("signup-password").value;
    const confirm = document.getElementById("signup-confirm").value;
    const msg = document.getElementById("signup-msg");

    if (!name || !email || !pass || !confirm) {
        msg.textContent = "⚠️ All fields are required.";
        return;
    }
    if (pass.length < 8) {
        msg.textContent = "⚠️ Password must be at least 8 characters.";
        return;
    }
    if (pass !== confirm) {
        msg.textContent = "⚠️ Passwords do not match.";
        return;
    }

    //Save user info into localStorage
    const user = { name, email, password: pass };
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("loggedInUser", name);
    localStorage.setItem("loggedIn", "true");

    msg.textContent = "✅ Account created!";
    setTimeout(() => {
        window.location.href = "index.html";
    }, 1000);
});

// Handle login form
document.getElementById("login-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
    const msg = document.getElementById("login-msg");

    if (!email || !password) {
        msg.textContent = "⚠️ Please fill in both fields.";
        return;
    }

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser && storedUser.email === email && storedUser.password === password) {
        localStorage.setItem("loggedInUser", storedUser.name);
        localStorage.setItem("loggedIn", "true");

        msg.textContent = "✅ Logged in successfully!";
        setTimeout(() => {
            window.location.href = "index.html";
        }, 1000);
    } else {
        msg.textContent = "⚠️ Invalid email or password.";
    }
});

// Google login callback
function handleGoogleResponse(response) {
    console.log("Google ID Token:", response.credential);
    localStorage.setItem("loggedInUser", "Google User");
    localStorage.setItem("loggedIn", "true");
    window.location.href = "index.html";
}

window.addEventListener("DOMContentLoaded", () => {
    if (window.location.pathname.endsWith("login.html") && localStorage.getItem("loggedIn") === "true") {
        window.location.href = "index.html";
    }
});

// ---------- Cookie Helpers ----------
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = `${name}=${encodeURIComponent(value)}${expires}; path=/`;
}

function getCookie(name) {
    const cookies = document.cookie.split(";");
    for (let c of cookies) {
        const [key, val] = c.trim().split("=");
        if (key === name) return decodeURIComponent(val || "");
    }
    return null;
}

function eraseCookie(name) {
    document.cookie = `${name}=; Max-Age=-1; path=/`;
}

// ---------- Utility: Hash Password ----------
async function hashPassword(password) {
    const enc = new TextEncoder().encode(password);
    const buf = await crypto.subtle.digest("SHA-256", enc);
    return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("");
}

// ---------- Signup ----------
document.getElementById("signup-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("signup-name").value.trim();
    const email = document.getElementById("signup-email").value.trim();
    const pass = document.getElementById("signup-password").value;
    const confirm = document.getElementById("signup-confirm").value;
    const msg = document.getElementById("signup-msg");

    if (!name || !email || !pass || !confirm) {
        msg.textContent = "⚠️ All fields are required.";
        return;
    }
    if (pass.length < 8) {
        msg.textContent = "⚠️ Password must be at least 8 characters.";
        return;
    }
    if (pass !== confirm) {
        msg.textContent = "⚠️ Passwords do not match.";
        return;
    }

    // Hash password before saving
    const hashedPass = await hashPassword(pass);

    // Store account in localStorage (keyed by email)
    const accounts = JSON.parse(localStorage.getItem("accounts") || "{}");
    if (accounts[email]) {
        msg.textContent = "⚠️ Account already exists.";
        return;
    }
    accounts[email] = { name, email, password: hashedPass };
    localStorage.setItem("accounts", JSON.stringify(accounts));

    // Set login cookies
    setCookie("loggedInUser", name, 7);
    setCookie("loggedInEmail", email, 7);
    setCookie("loggedIn", "true", 7);

    msg.textContent = "✅ Account created!";
    setTimeout(() => {
        window.location.href = "index.html";
    }, 1000);
});

// ---------- Login ----------
document.getElementById("login-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value;
    const msg = document.getElementById("login-msg");

    if (!email || !password) {
        msg.textContent = "⚠️ Please fill in both fields.";
        return;
    }

    const accounts = JSON.parse(localStorage.getItem("accounts") || "{}");
    const user = accounts[email];
    if (!user) {
        msg.textContent = "⚠️ No account found with this email.";
        return;
    }

    const hashedPass = await hashPassword(password);
    if (user.password !== hashedPass) {
        msg.textContent = "⚠️ Invalid password.";
        return;
    }

    // Save login cookies
    setCookie("loggedInUser", user.name, 7);
    setCookie("loggedInEmail", user.email, 7);
    setCookie("loggedIn", "true", 7);

    msg.textContent = "✅ Logged in successfully!";
    setTimeout(() => {
        window.location.href = "index.html";
    }, 1000);
});

// ---------- Auto-fill last email ----------
window.addEventListener("DOMContentLoaded", () => {
    const lastEmail = getCookie("loggedInEmail");
    if (lastEmail) {
        document.getElementById("login-email").value = lastEmail;
    }
});
