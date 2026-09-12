
// ===========================================
//       Cart Data
// ===========================================

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ===========================================
//       Save Cart
// ===========================================

function saveCart() {

    localStorage.setItem("cart", JSON.stringify(cart));

}

// ===========================================
//       Add To Cart 
// ===========================================

function addToCart(watchId) {
    const watch = watches.find(function(item) {
        return item.id === watchId;
    });

    if (!watch) {
        console.error("Watch not found");
        return;
    }

    const existingItem = cart.find(function(item) {
        return item.id === watchId;
    });

    // ========================================
    // CHECK STOCK
    // ========================================

    if (existingItem) {

        if (existingItem.quantity >= watch.stock) {

            alert("You cannot add more than the available stock.");

            return;
        }

        existingItem.quantity++;

    } else {

        if (watch.stock <= 0) {

            alert("Sorry, this watch is out of stock.");

            return;
        }

        cart.push({
            ...watch,
            quantity: 1
        });

    }


    //alert("Watch added to cart");
    saveCart();
    console.log("Watch ID:", watch);
    console.log(cart);
    
    displayProducts();

}

// ===========================================
//   Increase Quantity in Cart
// ===========================================

function increaseQuantity(watchId) {

    const item = cart.find(function(item) {
        return item.id === watchId;
    });

    if (!item) {
        return;
    }

    if (item.quantity < item.stock) {

        item.quantity++;

        saveCart();

        displayCart();

        displayProducts();

    } else {

        alert("You have reached the available stock.");

    }

}

// ===========================================
//   Decrease Quantity in Cart
// ===========================================

function decreaseQuantity(watchId) {

    const item = cart.find(function(item) {
        return item.id === watchId;
    });

    if (!item) {
        return;
    }

    if (item.quantity > 1) {

        item.quantity--;

        saveCart();

        displayCart();

    }

}

// ===========================================
//       Remove From Cart
// ===========================================

function removeFromCart(watchId) {

    cart = cart.filter(function(item) {
        return item.id !== watchId;
    });

    saveCart();

    displayCart();


}

// ============================================
//       Display Cart
// ============================================

function displayCart() {
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    
    cartItems.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <p class="empty-cart">
                Your cart is empty.
            </p>
        `;

        cartTotal.textContent = "0";
        return;
    }


        cart.forEach(function(item) {
            total += item.price*item.quantity; // Add item price to total
            cartItems.innerHTML += `
                <div class="cart-item">
                    <h3 class="cart-item-name">
                        ${item.name}
                    </h3>
                    <p class="cart-item-img">
                        <img src="${item.image}" width="100">
                    </p>
                    <p class="cart-item-price">
                        ₹${item.price}
                    </p>
                    <div class="quantity-controls">
                        <button 
                            class="quantity-button" 
                            onclick="decreaseQuantity(${item.id})">
                            -
                        </button>
                        <span class="quantity">
                            ${item.quantity}
                        </span>
                        <button 
                            class="quantity-button" 
                            onclick="increaseQuantity(${item.id})">
                            +
                        </button>
                    </div>
                    <button
                        class="remove-button"
                        onclick="removeFromCart(${item.id})">
                        Remove
                    </button>
                                        
                </div>
            `;
        });
        cartTotal.textContent = total;

    
}

// ========================================
// INITIALIZE PAGE
// ========================================

if (document.getElementById("product-list")) {

    displayProducts();

}

if (document.getElementById("cart-items")) {

    displayCart();

}

// ===================================
//    Checkout Button
// ===================================

function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    cart.forEach(function(item) {
        const watch = watches.find(function(watch) {
            return watch.id === item.id;
        });

        if (watch) {
            watch.stock -= item.quantity;

            localStorage.setItem(
                "watchStock",
                JSON.stringify(
                    watches.reduce(function(stock, watch) {
                        stock[watch.id] = watch.stock;
                        return stock;
                    }, {})
                )
            );
        }
        
    });

    alert("Purchase successful!");

    cart = [];
    saveCart();
    displayCart();
    displayProducts();
}