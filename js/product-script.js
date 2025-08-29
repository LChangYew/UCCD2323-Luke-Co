document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.querySelector('.sidebar-toggle');
  const sidebar = document.querySelector('.sidebar');

  toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
    sidebar.classList.toggle('expanded');
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const rangevalue = document.querySelector(".slider .price-slider");
  const rangeInputvalue = document.querySelectorAll(".range-input input");
  const priceInputvalue = document.querySelectorAll(".price-input input");

  let priceGap = 0;

  //Initialize slider track on load
  const updateSliderTrack = () => {
    const minVal = parseInt(rangeInputvalue[0].value);
    const maxVal = parseInt(rangeInputvalue[1].value);
    const maxRange = parseInt(rangeInputvalue[0].max);

    rangevalue.style.left = `${(minVal / maxRange) * 100}%`;
    rangevalue.style.right = `${100 - (maxVal / maxRange) * 100}%`;
    priceInputvalue[0].value = minVal;
    priceInputvalue[1].value = maxVal;
  };

  updateSliderTrack(); // Run once on page load

  // Price input listeners
  priceInputvalue.forEach((input, i) => {
    input.addEventListener("input", e => {
      let minp = parseInt(priceInputvalue[0].value);
      let maxp = parseInt(priceInputvalue[1].value);
      let diff = maxp - minp;

      if (minp < 0) {
        minp = 0;
        priceInputvalue[0].value = minp;
      }

      if (maxp > 1000) {
        maxp = 1000;
        priceInputvalue[1].value = maxp;
      }

      if (minp > maxp - priceGap) {
        minp = maxp - priceGap;
        if (minp < 0) minp = 0;
        priceInputvalue[0].value = minp;
      }

      if (diff >= priceGap && maxp <= rangeInputvalue[1].max) {
        if (e.target.classList.contains("min-input")) {
          rangeInputvalue[0].value = minp;
        } else {
          rangeInputvalue[1].value = maxp;
        }
        updateSliderTrack();
      }
    });
  });

  // Range input listeners
  rangeInputvalue.forEach((input, i) => {
    input.addEventListener("input", e => {
      let minVal = parseInt(rangeInputvalue[0].value);
      let maxVal = parseInt(rangeInputvalue[1].value);
      let diff = maxVal - minVal;

      if (diff < priceGap) {
        if (e.target.classList.contains("min-range")) {
          rangeInputvalue[0].value = maxVal - priceGap;
        } else {
          rangeInputvalue[1].value = minVal + priceGap;
        }
      } else {
        priceInputvalue[0].value = minVal;
        priceInputvalue[1].value = maxVal;
        updateSliderTrack();
      }
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const products = document.querySelectorAll('.product-card');

  // Price inputs & sliders
  const minRange = document.querySelector('.min-range');
  const maxRange = document.querySelector('.max-range');
  const minInput = document.querySelector('.min-input');
  const maxInput = document.querySelector('.max-input');

  // Category checkboxes
  const checkboxes = document.querySelectorAll('.filter-section input[type="checkbox"]');

  function filterProducts() {
    const minPrice = parseFloat(minInput.value);
    const maxPrice = parseFloat(maxInput.value);

    // Collect checked categories
    const selectedCategories = Array.from(checkboxes)
      .filter(cb => cb.checked)
      .map(cb => cb.value);

    products.forEach(product => {
      const price = parseFloat(product.dataset.price);
      const category = product.dataset.category;

      const priceMatch = price >= minPrice && price <= maxPrice;
      const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(category);

      // Show only if both match
      product.style.display = (priceMatch && categoryMatch) ? 'block' : 'none';
    });
  }

  // Sync sliders → inputs
  minRange.addEventListener('input', () => {
    minInput.value = minRange.value;
    filterProducts();
  });

  maxRange.addEventListener('input', () => {
    maxInput.value = maxRange.value;
    filterProducts();
  });

  // Sync inputs → sliders
  minInput.addEventListener('input', () => {
    minRange.value = minInput.value;
    filterProducts();
  });

  maxInput.addEventListener('input', () => {
    maxRange.value = maxInput.value;
    filterProducts();
  });

  // Category checkboxes
  checkboxes.forEach(cb => cb.addEventListener('change', filterProducts));

  // Run once on load
  filterProducts();
});


// Fake product "database"
const products = [
  { id: "1", title: "White T-Shirt", price: 49, img: "Men_image/White_T_shirt.jpg", description: "Stylish White T-Shirt for men", category: "Men" },
  { id: "2", title: "White Suits", price: 100, img: "Men_image/White_suits.jpg", description: "Stylish White Suits for men", category: "Men" },
  { id: "3", title: "Stripe Shirt", price: 99, img: "Men_image/Black_White_Strip_T_shirt.png", description: "Stylish Black and White T-shirt for men", category: "Men" },
  { id: "4", title: "Black T-shirt", price: 40, img: "Men_image/Black_T_shirt.jpg", description: "Stylish Black T-shirt for men", category: "Men" },
  { id: "5", title: "Black Jeans", price: 99, img: "Men_image/Black_jeans.png", description: "Stylish Black Jeans for men", category: "Men" },
  { id: "6", title: "Blue Jeans", price: 50, img: "Men_image/Blue_jeans.png", description: "Stylish Blue Jeans for men", category: "Men" },
  { id: "7", title: "Black Shorts", price: 150, img: "Men_image/Black_shorts.png", description: "Stylish Black Shorts for men", category: "Men" },
  { id: "8", title: "Blue Shorts", price: 51, img: "Men_image/Blue_shorts.png", description: "Stylish Blue Shorts for men", category: "Men" },
  { id: "9", title: "White Shirt", price: 49, img: "Women_image/White_shirt.png", description: "Stylish White Shirt for women", category: "Women" },
  { id: "10", title: "Pink Shirt", price: 100, img: "Women_image/Pink_shirts.png", description: "Stylish Pink Shirt for women", category: "Women" },
  { id: "11", title: "Black Shirt", price: 99, img: "Women_image/Black_shirts.png", description: "Stylish Black Shirt for women", category: "Women" },
  { id: "12", title: "Brown Shirt", price: 40, img: "Women_image/Brown_shirt.png", description: "Stylish Brown Shirt for women", category: "Women" },
  { id: "13", title: "Black Pants", price: 99, img: "Women_image/Black_pants.png", description: "Stylish Black Pants for women", category: "Women" },
  { id: "14", title: "Purple Pants", price: 50, img: "Women_image/Purple_pants.png", description: "Stylish Purple Pants for women", category: "Women" },
  { id: "15", title: "Pink Dresses", price: 150, img: "Women_image/Pink_dress.png", description: "Stylish Pink Dresses for women", category: "Women" },
  { id: "16", title: "Purple Dresses", price: 51, img: "Women_image/Purple_dress.png", description: "Elegant Pink Dresses for women", category: "Women" },
  { id: "17", title: "White Shirt", price: 49, img: "Kid_image/White_shirt.png", description: "Stylish White Shirt for kids", category: "Kids" },
  { id: "18", title: "Black Shirt", price: 100, img: "Kid_image/Black_shirt.png", description: "Stylish Black Shirt for kids", category: "Kids" },
  { id: "19", title: "Blue Shirt", price: 99, img: "Kid_image/Blue_shirt.png", description: "Stylish Blue Shirt for kids", category: "Kids" },
  { id: "20", title: "Pink Shirt", price: 40, img: "Kid_image/Pink_shirt.png", description: "Stylish Pink Shirt for kids", category: "Kids" },
  { id: "21", title: "Blue Pants", price: 99, img: "Kid_image/Blue_pants.png", description: "Stylish Blue Pants for kids", category: "Kids" },
  { id: "22", title: "Black Pants", price: 50, img: "Kid_image/Black_pants.png", description: "Stylish Black Pants for kids", category: "Kids" },
  { id: "23", title: "Black Hoodie", price: 150, img: "Kid_image/Black_hoody.png", description: "Stylish Black Hoodie for kids", category: "Kids" },
  { id: "24", title: "White Hoodie", price: 51, img: "Kid_image/White_hoody.png", description: "Stylish White Hoodie for kids", category: "Kids" },
  { id: "25", title: "Stylish Bracelet style A", price: 49, img: "Accessories_image/Bracelet1.png", description: "Stylish Bracelet", category: "Accessories" },
  { id: "26", title: "Stylish Bracelet style B", price: 100, img: "Accessories_image/Bracelet2.png", description: "Stylish Bracelet", category: "Accessories" },
  { id: "27", title: "Belt style A", price: 99, img: "Accessories_image/Belt1.png", description: "Stylish Belt", category: "Accessories" },
  { id: "28", title: "Belt style B", price: 40, img: "Accessories_image/Belt2.png", description: "Stylish Belt", category: "Accessories" },
  { id: "29", title: "Hat style A", price: 99, img: "Accessories_image/Hat1.png", description: "Stylish Hat", category: "Accessories" },
  { id: "30", title: "Hat style B", price: 50, img: "Accessories_image/Hat2.png", description: "Stylish Hat", category: "Accessories" },
];
window.products = products;

// Get product ID from URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

// Find the product in our array
const product = products.find(p => p.id === productId);

// If found, update the page
if (product) {
  // Fill product detail
  document.getElementById("title").textContent = product.title;
  document.getElementById("price").textContent = "MYR " + product.price;
  document.getElementById("description").textContent = product.description;
  document.getElementById("main-image").src = product.img;

  // Fill breadcrumb
  const breadcrumb = document.getElementById("breadcrumb");
  breadcrumb.innerHTML = `
    <li><a href="main.html">Luke & Co</a></li>
    <li>/</li>
    <li><a href="${product.category.toLowerCase()}.html">${product.category}</a></li>
    <li>/</li>
    <li>${product.title}</li>
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  // Handle size button selection
  document.querySelectorAll(".size-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".size-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
    });
  });

  // Quantity control
  const qtyValue = document.getElementById("quantity-value");
  let quantity = 1;

  document.getElementById("increase").addEventListener("click", () => {
    quantity++;
    qtyValue.textContent = quantity;
  });

  document.getElementById("decrease").addEventListener("click", () => {
    if (quantity > 1) {
      quantity--;
      qtyValue.textContent = quantity;
    }
  });
})

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('share-btn').addEventListener("click", function () {
    const pageUrl = window.location.href; // current product page URL
    const productTitle = document.getElementById("title").textContent;
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}&quote=${encodeURIComponent(productTitle)}`;

    window.open(facebookUrl, "_blank");
  })
})

document.addEventListener('DOMContentLoaded', () => {
  const addToCartBtn = document.getElementById("add-to-cart");

  if (addToCartBtn) {
    addToCartBtn.addEventListener("click", () => {
      const productId = new URLSearchParams(window.location.search).get("id");
      const product = products.find(p => p.id === productId);

      if (!product) return alert("Product not found!");

      // Get selected quantity
      const qty = parseInt(document.getElementById("quantity-value").textContent) || 1;

      // Get cart from localStorage (or empty)
      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      const selectedSizeBtn = document.querySelector(".size-btn.active");
      const size = selectedSizeBtn ? selectedSizeBtn.textContent : "N/A";

      // Check if same product + same size is already in cart
      const existing = cart.find(item => item.id === product.id && item.size === size);

      if (existing) {
        existing.qty += qty; // increase qty
      } else {
        cart.push({ ...product, qty, size });
      }

      // Save back to localStorage
      localStorage.setItem("cart", JSON.stringify(cart));

      alert(`${product.title} (x${qty}, Size: ${size}) added to cart!`);

    });
  }
});
