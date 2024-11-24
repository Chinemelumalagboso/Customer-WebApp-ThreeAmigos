document.addEventListener("DOMContentLoaded", () => {
    displayProducts(products, "all");
    setupPagination();
});



function filterProducts(category) {
    document.querySelectorAll(".category").forEach(button => button.classList.remove("active"));
    document.querySelector(`button[onclick="filterProducts('${category}')"]`).classList.add("active");
    displayProducts(products, category);
}

function setupPagination() {
    // Implement pagination logic here
}


// Cart state
let cart = [];

// Display products with buttons
function displayProducts(productsArray, category) {
    const productsContainer = document.getElementById("products");
    productsContainer.innerHTML = "";

    if (productsArray.length === 0) {
        productsContainer.innerHTML = `<p>No products found in the "${category}" category.</p>`;
        return;
    }

    productsArray.forEach((product) => {
        const productCard = `
            <div class="product-card">
                <img src="${product.image}" alt="${product.title}">
                <h3>${product.title.slice(0, 25)}...</h3>
                <p>${product.description.slice(0, 50)}...</p>
                <p class="price">$${product.price.toFixed(2)}</p>
                <button class="add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
                <button class="buy-now" onclick="buyNow(${product.id})">Buy Now</button>
            </div>
        `;
        productsContainer.innerHTML += productCard;
    });
}

// Add to cart
function addToCart(productId) {
    const product = products.find((p) => p.id === productId);
    if (!cart.some((item) => item.id === productId)) {
        cart.push(product);
    }
    updateCart();
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter((item) => item.id !== productId);
    updateCart();
}

// Update cart modal
function updateCart() {
    const cartItemsContainer = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    cartItemsContainer.innerHTML = "";

    cart.forEach((item) => {
        const cartItem = `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.title}" style="width: 50px; height: 50px;">
                <span>${item.title.slice(0, 20)}...</span>
                <span>$${item.price.toFixed(2)}</span>
                <button class="remove-from-cart" onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        `;
        cartItemsContainer.innerHTML += cartItem;
    });

    cartCount.textContent = cart.length;
}

// Open cart modal
function openCart() {
    document.getElementById("cart-modal").style.display = "block";
}

// Close cart modal
function closeCart() {
    document.getElementById("cart-modal").style.display = "none";
}

// Buy now functionality
function buyNow(productId) {
    const product = products.find((p) => p.id === productId);
    alert(`You have purchased ${product.title}!`);
}

// Checkout
function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
    } else {
        alert("Thank you for your purchase!");
        cart = [];
        updateCart();
        closeCart();
    }
}

// Initialize
document.addEventListener("DOMContentLoaded", async () => {
    await fetchAllProducts();
    await fetchCategories();
    updateCart();
});
