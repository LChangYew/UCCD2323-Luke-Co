document.addEventListener("DOMContentLoaded", () => {
    const searchBtn = document.getElementById("search-btn");
    const searchBox = document.getElementById("search-box");
    const searchInput = document.getElementById("search-input");
    const searchResults = document.getElementById("search-results");

    if (searchBtn) {
        searchBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            searchBox.style.display = searchBox.style.display === "block" ? "none" : "block";
            searchInput.focus();
        });
    }

    // Close search dropdown when clicking outside
    window.addEventListener("click", (e) => {
        if (!searchBox.contains(e.target) && e.target !== searchBtn) {
            searchBox.style.display = "none";
        }
    });

    // --- Search Function ---
    const productsDB = window.products || [];

    if (searchInput) {
        searchInput.addEventListener("input", () => {
            const query = searchInput.value.toLowerCase();
            searchResults.innerHTML = "";

            if (query.length > 0) {
                const matches = productsDB.filter(p =>
                    p.title.toLowerCase().includes(query) ||
                    p.description.toLowerCase().includes(query) ||
                    p.category.toLowerCase().includes(query) ||
                    p.price.toString().includes(query)
                );

                if (matches.length > 0) {
                    matches.forEach(p => {
                        const resultItem = document.createElement("div");
                        resultItem.classList.add("search-result-item");

                        resultItem.innerHTML = `
              <img src="${p.img}" alt="${p.title}">
              <div>
                <strong>${p.title}</strong><br>
                MYR ${p.price}
              </div>
            `;

                        resultItem.addEventListener("click", () => {
                            window.location.href = `detail.html?id=${p.id}`;
                        });

                        searchResults.appendChild(resultItem);
                    });
                } else {
                    searchResults.innerHTML = "<div>No products found</div>";
                }
            }
        });
    }
});
