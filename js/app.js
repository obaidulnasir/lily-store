const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};

loadProducts();

// single product 
const detailsBtn = (id) => {
 
  const url = `https://fakestoreapi.com/products/${id}`;
  fetch(url)
  .then(res=>res.json())
  .then(json=>showDetails(json))
}

const showDetails = (details) => {
  
  document.getElementById("single-product").innerHTML = '';
  const productContainer = document.getElementById("single-product");
  const div = document.createElement("div");
  div.innerHTML = `
      <div>
        <img width="150px" src="${details.image}" alt="">
      </div>
      <!-- description -->
      <div>
        <p class="fw-bold">${details.title}</p>
        <p>${details.description}</p>
        <p class="fw-bold">Price: ${details.price}$</p>
      </div>
  `
  productContainer.appendChild(div);
  window.scroll (0, 25)

}
// show all product in UI
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `
    <div class="single-product">
      <div>
        <img class="product-image" src=${image}></img>
      </div>
      <h4>${product.title}</h4>
      <p>Category: ${product.category}</p>
      <h5>Price: $ ${product.price}</h5>

      <!-- my line -->
      <div class="">
        <p><i class="bi bi-star-fill"></i> ${product.rating.rate} (${product.rating.count})</p>
      </div>

      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success"><i class="bi bi-cart-plus"></i> Add to cart</button>
      <button onclick ="detailsBtn(${product.id})" class="btn btn-primary"><i class="bi bi-info-circle"></i> Details</button>
    </div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};

let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);
  
  updateTotal();

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  
  const converted = Math.round(element * 100) / 100;

  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = total.toFixed(2);
  
};

// set innerText function
const setInnerText = (id, value) => {
 
  document.getElementById(id).innerText = value.toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
    updateTotal();
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
    updateTotal();
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
    updateTotal();
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") +
    getInputValue("delivery-charge") +
    getInputValue("total-tax");

 const mainTotal = grandTotal.toFixed(2);
  document.getElementById("total").innerText = mainTotal;
};
