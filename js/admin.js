// ========================================
// DISPLAY WATCHES IN ADMIN DASHBOARD
// ========================================

function displayAdminProducts() {

    const adminProducts = document.getElementById("admin-products");

    if (!adminProducts) {
        return;
    }

    adminProducts.innerHTML = "";

    watches.forEach(function(watch) {

        adminProducts.innerHTML += `
            <div class="admin-product">
                <img
                    src="${watch.image}"
                    width="200"
                    alt="${watch.name}"
                >
                <h3>${watch.name} "</h3>

                <p>Price: ₹${watch.price}</p>

                <p>Stock: ${watch.stock}</p>

                <input
                    type="number"
                    id="stock-${watch.id}"
                    min="1"
                    placeholder="Amount"
                >

                <button onclick="addStock(${watch.id})">
                    Add Stock
                </button>
            </div>
        `;
    });
}


// ========================================
// INITIALIZE ADMIN PAGE
// ========================================

displayAdminProducts();

function addStock(watchId) {

    const watch = watches.find(function(item) {
        return item.id === watchId;
    });

    if (!watch) {
        return;
    }

    const input = document.getElementById(`stock-${watchId}`);

    const amount = Number(input.value);

    if (amount <= 0) {
        alert("Enter a valid amount.");
        return;
    }

    watch.stock += amount;

    localStorage.setItem(
        "watchStock",
        JSON.stringify(
            watches.reduce(function(stock, watch) {
                stock[watch.id] = watch.stock;
                return stock;
            }, {})
        )
    );

    alert(`${amount} watches added to stock.`);
    displayAdminProducts();
}

// ========================================
// ADD NEW WATCH
// ========================================

const saveWatchButton = document.getElementById("save-watch-button");

if (saveWatchButton) {

    saveWatchButton.addEventListener("click", async function() {

        const name = document.getElementById("watch-name").value.trim();
        const price = Number(document.getElementById("watch-price").value);
        const stock = Number(document.getElementById("watch-stock").value);
        const imageFile = document.getElementById("watch-image").files[0];

        if (!name || price <= 0 || stock <= 0 || !imageFile) {
            alert("Please fill in all fields correctly.");
            return;
        }

        const formData = new FormData();

        formData.append("image", imageFile);

        const uploadResponse = await fetch(
            "http://127.0.0.1:5000/upload-watch-image",
            {
                method: "POST",
                credentials: "include",
                body: formData
            }
        );

        const uploadResult = await uploadResponse.json();

        if (!uploadResult.success) {
            alert(uploadResult.message);
            return;
        }

        const image = uploadResult.image;

        const newWatch = {
            id: Date.now(),
            name: name,
            price: price,
            stock: stock,
            quantity: 1,
            image: image
        };

        watches.push(newWatch);
        
        localStorage.setItem(
            "watches",
            JSON.stringify(watches)
        );

        displayAdminProducts();

        alert("New watch added!");

        document.getElementById("watch-name").value = "";
        document.getElementById("watch-price").value = "";
        document.getElementById("watch-stock").value = "";
        document.getElementById("watch-image").value = "";
    });
}

const logoutButton = document.getElementById("logout-button");

if (logoutButton) {
    logoutButton.addEventListener("click", async function() {

        const response = await fetch("http://127.0.0.1:5000/admin-logout", {
            method: "POST",
            credentials: "include"
        });

        const result = await response.json();

        if (result.success) {
            window.location.href = "admin-login.html";
        }

    });
}

const addWatchButton = document.querySelector(".add-watch-button");
const addWatchForm = document.querySelector(".add-watch-form");

if (addWatchButton && addWatchForm) {

    addWatchButton.addEventListener("click", function() {

        addWatchForm.classList.toggle("show");

    });

}