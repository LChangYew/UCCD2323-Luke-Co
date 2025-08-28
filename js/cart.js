document.addEventListener("DOMContentLoaded", () => {
    const cartContainer = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const checkoutBtn = document.querySelector(".checkout-btn");
    const headerCheckoutBtn = document.querySelector(".cta");

    // Load cart from localStorage
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Render cart items
    function renderCart() {
        if (!cartContainer || !cartTotal) return; // prevent errors if not on cart page
        cartContainer.innerHTML = "";

        if (cart.length === 0) {
            cartContainer.innerHTML = "<p>Your cart is empty.</p>";
            cartTotal.textContent = "MYR 0.00";
            return;
        }

        let total = 0;

        cart.forEach((item, index) => {
            const itemTotal = item.price * item.qty;
            total += itemTotal;

            const div = document.createElement("div");
            div.classList.add("cart-item");
            div.innerHTML = `
                <img src="${item.img}" alt="${item.title}" width="80">
                <div class="cart-info">
                    <h3>${item.title}</h3>
                    <p>Size: ${item.size || "N/A"}</p>
                    <p>Price: MYR ${item.price.toFixed(2)}</p>
                    <div class="quantity-control">
                        <button class="decrease">-</button>
                        <span>${item.qty}</span>
                        <button class="increase">+</button>
                    </div>
                    <p class="subtotal">Subtotal: MYR ${itemTotal.toFixed(2)}</p>
                    <button class="remove">Remove</button>
                </div>
            `;

            // Quantity decrease
            div.querySelector(".decrease").addEventListener("click", () => {
                if (item.qty > 1) {
                    item.qty--;
                } else {
                    cart.splice(index, 1);
                }
                saveCart();
                renderCart();
            });

            // Quantity increase
            div.querySelector(".increase").addEventListener("click", () => {
                item.qty++;
                saveCart();
                renderCart();
            });

            // Remove item
            div.querySelector(".remove").addEventListener("click", () => {
                cart.splice(index, 1);
                saveCart();
                renderCart();
            });

            cartContainer.appendChild(div);
        });

        cartTotal.textContent = `MYR ${total.toFixed(2)}`;
    }
    function addToCart(name, price) {
    // Always store as number, not "RM300"
    price = parseFloat(price);

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if item already exists
    let existing = cart.find(item => item.name === name);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ name: name, price: price, quantity: 1 });
    }

    // Save updated cart
    localStorage.setItem("cart", JSON.stringify(cart));
    console.log("Cart saved:", cart);
}

    // Save cart into localStorage
    function saveCart() {
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    // Handle checkout → save cart + total then go to checkout.html
    function handleCheckout() {
        if (cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

        // Save everything for later pages
        localStorage.setItem("cart", JSON.stringify(cart));
        localStorage.setItem("checkoutTotal", total.toFixed(2));

        console.log("Cart saved:", cart);
        console.log("Total saved:", total.toFixed(2));

        // Redirect to checkout page
        window.location.href = "checkout.html";
    }

    // Checkout button in cart page
    if (checkoutBtn) {
        checkoutBtn.addEventListener("click", (e) => {
            e.preventDefault();
            handleCheckout();
        });
    }

    // Checkout button in header
    if (headerCheckoutBtn) {
        headerCheckoutBtn.addEventListener("click", (e) => {
            e.preventDefault();
            handleCheckout();
        });
    }

    // Run cart rendering only if cart page elements exist
    renderCart();
});
