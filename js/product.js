const savedWatches = JSON.parse(localStorage.getItem("watches"));


const watches = savedWatches || [
    {
        id: 1,
        name: "Brown Leather fossil Watch",
        price: 2999,
        stock: 5,
        quantity: 1,
        image: "/assets/fossil.jpg"
    },

    {
        id: 2,
        name: "Silver-OLEVS-Watch-Men",
        price: 4999,
        stock: 5,
        quantity: 1,
        image: "/assets/Silver-OLEVS-Watch-Men.jpeg"
    },

    {
        id: 3,
        name: "Black-classic-casio-watch",
        price: 5999,
        stock: 5,
        quantity: 1,
        image: "/assets/Black-classic-casio-watch.jpg"
    }
]

watches.forEach(function(watch) {

    if (watch.image && !watch.image.startsWith("/")) {
        watch.image = "/" + watch.image;
    }

});

localStorage.setItem(
    "watches",
    JSON.stringify(watches)
);

const savedStock = JSON.parse(localStorage.getItem("watchStock"));

if (savedStock) {
    watches.forEach(function(watch) {
        if (savedStock[watch.id] !== undefined) {
            watch.stock = savedStock[watch.id];
        }
    });
}

// ========================================
// DISPLAY PRODUCTS
// ========================================

function displayProducts(filteredWatches) {

    const productList = document.getElementById("product-list");

     if (!productList) {
        return;
    }

    // Get the latest cart from localStorage
    cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Keep the current search
    if (filteredWatches === undefined) {

        const searchInput = document.getElementById("search-input");

        if (searchInput && searchInput.value.trim() !== "") {

            const searchText = searchInput.value.toLowerCase();

            filteredWatches = watches.filter(function(watch) {

                return watch.name.toLowerCase().includes(searchText);

            });

        } else {

            filteredWatches = watches;

        }
    }

    productList.innerHTML = "";

    filteredWatches.forEach(function(watch) {

        const remainingStock = watch.stock;


        productList.innerHTML += `
            <div class="product">

                <img 
                    src="${watch.image}" 
                    alt="${watch.name}"
                >

                <h2>${watch.name}</h2>

                <p>₹${watch.price}</p>

                <p class="stock">
                    ${
                        remainingStock > 0
                            ? `${remainingStock} available`
                            : "Out of Stock"
                    }
                </p>

                <button 
                    class="add-to-cart-button"
                    onclick="addToCart(${watch.id})"
                    ${remainingStock <= 0 ? "disabled" : ""}
                >
                    ${
                        remainingStock > 0
                            ? "Add to Cart"
                            : "Out of Stock"
                    }
                </button>

            </div>
        `;

    });

}

// ========================================
// UPDATE PRODUCTS WHEN RETURNING TO PAGE
// ========================================

window.addEventListener("pageshow", function() {
    const savedStock = JSON.parse(localStorage.getItem("watchStock"));

    if (savedStock) {
        watches.forEach(function(watch) {
            if (savedStock[watch.id] !== undefined) {
                watch.stock = savedStock[watch.id];
            }
        });
    }

    displayProducts();
});

// ========================================
// SEARCH WATCHES
// ========================================

const searchInput = document.getElementById("search-input");

if (searchInput) {

    searchInput.addEventListener("input", function() {

        const searchText = searchInput.value.toLowerCase();

        const filteredWatches = watches.filter(function(watch) {

            return watch.name.toLowerCase().includes(searchText);

        });

        displayProducts(filteredWatches);

    });

}