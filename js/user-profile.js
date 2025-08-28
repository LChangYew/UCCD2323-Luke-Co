document.addEventListener("DOMContentLoaded", () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const loggedInUser = localStorage.getItem("loggedInUser");

    let username = "Guest";
    let email = "Not provided";

    if (storedUser && loggedInUser) {
        username = storedUser.name || loggedInUser;
        email = storedUser.email || "Not provided";
    }

    document.getElementById("greeting").textContent = `Hi, ${username}!`;
    document.getElementById("profile-username").textContent = username;
    document.getElementById("profile-email").textContent = email;

    // Show discount voucher for first-time users
    if (storedUser && storedUser.isFirstTimeUser && storedUser.hasDiscount) {
        const voucherCard = document.createElement("div");
        voucherCard.style.cssText = `
            background: linear-gradient(135deg, #FF6B6B, #FF8E53);
            color: white;
            padding: 20px;
            margin: 20px 0;
            border-radius: 12px;
            text-align: center;
            box-shadow: 0 8px 20px rgba(255,107,107,0.3);
            border: 2px dashed rgba(255,255,255,0.3);
            position: relative;
            overflow: hidden;
        `;
        voucherCard.innerHTML = `
            <div style="position: absolute; top: -10px; right: -10px; background: #FFD700; color: #333; padding: 5px 15px; border-radius: 20px; font-size: 0.8em; font-weight: bold; transform: rotate(15deg);">NEW USER</div>
            <h2 style="margin: 0 0 10px 0; font-size: 1.5em;">🎉 WELCOME VOUCHER</h2>
            <p style="margin: 0 0 15px 0; font-size: 1.1em;">Save 10% on your first purchase!</p>
            <div style="background: rgba(255,255,255,0.2); padding: 10px; border-radius: 8px; margin: 15px 0; border: 1px dashed rgba(255,255,255,0.5);">
                <p style="margin: 0 0 5px 0; font-size: 0.9em;">Your Discount Code:</p>
                <h3 style="margin: 0; font-size: 1.8em; font-family: monospace; letter-spacing: 2px;">${storedUser.discountCode}</h3>
            </div>
            <p style="margin: 10px 0 0 0; font-size: 0.85em; opacity: 0.9;">
                ✨ This code will be automatically applied at checkout<br>
                📅 Valid for your first purchase only
            </p>
        `;
        
        const greeting = document.getElementById("greeting");
        if (greeting && greeting.parentNode) {
            greeting.parentNode.insertBefore(voucherCard, greeting.nextSibling);
        }
    }

    const form = document.getElementById("change-password-form");
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const currentPass = document.getElementById("current-password").value;
            const newPass = document.getElementById("new-password").value;
            const confirmPass = document.getElementById("confirm-password").value;

            // Validation
            if (!currentPass || !newPass || !confirmPass) {
                alert("⚠️ Please fill in all fields.");
                return;
            }

            if (storedUser && storedUser.password !== currentPass) {
                alert("⚠️ Current password is incorrect.");
                return;
            }

            if (newPass.length < 8) {
                alert("⚠️ New password must be at least 8 characters.");
                return;
            }

            if (newPass !== confirmPass) {
                alert("⚠️ New passwords do not match!");
                return;
            }

            if (storedUser && storedUser.password === newPass) {
                alert("⚠️ You cannot reuse your current password.");
                return;
            }

            // Update user password
            if (storedUser) {
                storedUser.password = newPass;
                localStorage.setItem("user", JSON.stringify(storedUser));
            }

            alert("✅ Password updated successfully!");
            form.reset();
        });
    }
});

// ==================== SIGNUP SUCCESS MODAL ====================
function showWelcomeVoucher(discountCode) {
    // Create modal overlay
    const modalOverlay = document.createElement("div");
    modalOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    `;

    // Create voucher modal
    const voucherModal = document.createElement("div");
    voucherModal.style.cssText = `
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 40px;
        border-radius: 20px;
        text-align: center;
        box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        max-width: 500px;
        width: 90%;
        position: relative;
        animation: slideIn 0.5s ease;
    `;

    voucherModal.innerHTML = `
        <div style="position: absolute; top: -15px; right: -15px; background: #FFD700; color: #333; padding: 8px 20px; border-radius: 25px; font-weight: bold; box-shadow: 0 4px 10px rgba(0,0,0,0.2);">
            🎁 GIFT
        </div>
        
        <h1 style="margin: 0 0 20px 0; font-size: 2.2em;">🎉 Welcome to Luke & Co!</h1>
        <p style="font-size: 1.2em; margin: 0 0 30px 0; opacity: 0.9;">
            Thank you for joining us! Here's your exclusive welcome gift:
        </p>
        
        <div style="background: rgba(255,255,255,0.15); padding: 25px; border-radius: 15px; margin: 25px 0; border: 2px dashed rgba(255,255,255,0.3); backdrop-filter: blur(10px);">
            <h2 style="margin: 0 0 15px 0; color: #FFD700;">10% OFF VOUCHER</h2>
            <div style="background: rgba(255,255,255,0.2); padding: 15px; border-radius: 10px; margin: 15px 0;">
                <p style="margin: 0 0 8px 0; font-size: 0.9em; opacity: 0.8;">Your Discount Code:</p>
                <div style="font-size: 2em; font-family: monospace; letter-spacing: 3px; font-weight: bold; color: #FFD700; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">
                    ${discountCode}
                </div>
            </div>
            <div style="display: flex; gap: 15px; margin-top: 20px; font-size: 0.9em;">
                <div style="flex: 1; background: rgba(255,255,255,0.1); padding: 10px; border-radius: 8px;">
                    <strong>✨ Auto-Applied</strong><br>
                    <span style="opacity: 0.8">No need to enter manually</span>
                </div>
                <div style="flex: 1; background: rgba(255,255,255,0.1); padding: 10px; border-radius: 8px;">
                    <strong>🛒 First Purchase</strong><br>
                    <span style="opacity: 0.8">Valid for one-time use</span>
                </div>
            </div>
        </div>
        
        <p style="font-size: 0.95em; opacity: 0.8; margin: 20px 0;">
            This voucher will be automatically applied when you checkout.<br>
            Start shopping now and save on your first order! 🛍️
        </p>
        
        <button onclick="closeWelcomeModal()" style="
            background: linear-gradient(135deg, #FF6B6B, #FF8E53);
            color: white;
            border: none;
            padding: 15px 40px;
            border-radius: 30px;
            font-size: 1.1em;
            font-weight: bold;
            cursor: pointer;
            box-shadow: 0 6px 20px rgba(255,107,107,0.4);
            transition: all 0.3s ease;
            margin-top: 20px;
        " onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
            Start Shopping! 🚀
        </button>
    `;

    // Add CSS animations
    const style = document.createElement("style");
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes slideIn {
            from { transform: translateY(-50px) scale(0.9); opacity: 0; }
            to { transform: translateY(0) scale(1); opacity: 1; }
        }
    `;
    document.head.appendChild(style);

    modalOverlay.appendChild(voucherModal);
    document.body.appendChild(modalOverlay);

    // Close modal function
    window.closeWelcomeModal = () => {
        document.body.removeChild(modalOverlay);
        window.location.href = "index.html"; // Redirect to home page
    };

    // Close on overlay click
    modalOverlay.addEventListener("click", (e) => {
        if (e.target === modalOverlay) {
            closeWelcomeModal();
        }
    });
}

// ==================== DISCOUNT CODE GENERATOR ====================
function generateDiscountCode() {
    const prefix = "LUKE";
    const timestamp = Date.now().toString().slice(-4);
    const randomNum = Math.floor(Math.random() * 100).toString().padStart(2, '0');
    return `${prefix}${timestamp}${randomNum}`;
}