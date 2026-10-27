const products = [
  {
    name: "Normal chair",
    category: "chairs",
    type: "Chair",
    price: "3920tk",
    image: "image/chair 1.png",
  },
  {
    name: "Comfortable chair",
    category: "chairs",
    type: "Chair",
    price: "20000tk",
    image: "image/chair 2.png",
  },
  {
    name: "premium sofa",
    category: "sofas",
    type: "Sofa",
    price: "12500tk",
    image: "image/sofa 1.png",
  },
  {
    name: "Single sofa",
    category: "sofas",
    type: "Sofa",
    price: "51900tk",
    image: "image/soafa.png",
  },
  {
    name: "Group sofa",
    category: "sofas",
    type: "Sofa",
    price: "92100tk",
    image: "image/Houston-111.webp",
  },
  {
    name: " Elegant sofa",
    category: "sofas",
    type: "Sofa",
    price: "12500tk",
    image: "image/images.jpg",
  },
  {
    name: "Eggri lamp",
    category: "lamps",
    type: "Lamp",
    price: "12900tk",
    image: "image/unsplash_h2_3dL9yLpU.png",
  },
  {
    name: "Modern lamp",
    category: "lamps",
    type: "Lamp",
    price: "1100tk",
    image: "image/download.jpg",
  }
];

const productGrid = document.querySelector("#product-grid");
const filterList = document.querySelector("#filters");
const cartCount = document.querySelector("#cart-count");
const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");
let cart = 0;
let activeCategory = "all";


function renderProducts() {
  const query = searchInput.value.trim().toLowerCase();

  let visibleProducts = products;

  if (query !== "") {
    visibleProducts = products.filter((product) =>
      product.name.toLowerCase().includes(query)
    );
  } else {
    visibleProducts = products.filter((product) =>
      activeCategory === "all" || product.category === activeCategory
    );
  }

  productGrid.innerHTML = "";

  if (visibleProducts.length > 0) {
    for (let i = 0; i < visibleProducts.length; i++) {
      const product = visibleProducts[i];

      productGrid.innerHTML += `
        <article class="product-card">
          <div class="product-image"><img src="${product.image}" alt="${product.name}"> 
          </div>
          <div class="product-info">
            <p class="product-category">${product.type}</p>
            <h3 class="product-name">${product.name}</h3>
            <h1>*****</h1>
            <div class="product-bottom">
              <p class="price">${product.price}</p>
              <button class="add" type="button">+</button>
            </div>
          </div>
        </article>
      `;
    }
  } else {
    productGrid.innerHTML = "<h2>No products found.</h2>" ;
  }
}


renderProducts();

filterList.addEventListener("click", (event) => {
  const selectedFilter = event.target.closest(".filter");
  if (!selectedFilter) return;

  filterList.querySelectorAll(".filter").forEach((filter) => {
    filter.classList.toggle("active", filter === selectedFilter);
    filter.setAttribute("aria-selected", String(filter === selectedFilter));
  });
  activeCategory = selectedFilter.dataset.category;
  renderProducts();
});


productGrid.addEventListener("click", (event) => {
  const addButton = event.target.closest(".add");

  if (!addButton) {
    return;
  }

  if (addButton.textContent === "+") {
    cart++;
    addButton.textContent = "✓";
  } else {
    cart--;
    addButton.textContent = "+";
  }

  cartCount.textContent = cart;
});

searchInput.addEventListener("input", renderProducts);
searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  renderProducts();
  document.querySelector("#shop").scrollIntoView({ behavior: "smooth" });
});
