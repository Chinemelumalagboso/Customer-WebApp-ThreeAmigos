// Initialize products and categories
let products = [];
let categories = [];

// Fetch all products from the fake API
async function fetchAllProducts() {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        products = await response.json();
        displayProducts(products, "all");
    } catch (error) {
        console.error("Error fetching products:", error);
    }
}

// Fetch all categories from the fake API
async function fetchCategories() {
    try {
        const response = await fetch('https://fakestoreapi.com/products/categories');
        categories = await response.json();
        renderCategoryButtons();
    } catch (error) {
        console.error("Error fetching categories:", error);
    }
}

// Display dynamic category buttons
function renderCategoryButtons() {
    const categoriesContainer = document.querySelector(".categories");

    // Clear any existing buttons to avoid duplication
    categoriesContainer.innerHTML = "";

    // Create the "All Products" button
    const allButton = document.createElement("button");
    allButton.classList.add("category", "active");
    allButton.textContent = "All Products";
    allButton.onclick = () => filterProducts("all");
    categoriesContainer.appendChild(allButton);

    // Render category buttons dynamically
    categories.forEach((category) => {
        const button = document.createElement("button");
        button.classList.add("category");
        button.textContent = capitalize(category);
        button.onclick = () => filterProducts(category);
        categoriesContainer.appendChild(button);
    });
}

// Capitalize category names
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Filter products by category
function filterProducts(category) {
    const filteredProducts =
        category === "all"
            ? products
            : products.filter((product) => product.category === category);
    displayProducts(filteredProducts, category);
}

// Display products dynamically
function displayProducts(productsArray, category) {
    const productsContainer = document.getElementById("products");
    productsContainer.innerHTML = ""; // Clear previous products

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
                <p class="price">£${product.price.toFixed(2)}</p>
                <div class="product-actions">
                    <button class="buy-now" onclick="buyNow(${product.id})">Buy Now</button>
                    <button class="add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
                </div>
            </div>
        `;
        productsContainer.innerHTML += productCard;
    });
}

// Initialize on DOMContentLoaded
document.addEventListener("DOMContentLoaded", async () => {
    await fetchAllProducts(); 
    await fetchCategories();  
});
