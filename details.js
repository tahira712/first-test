const search = window.location.search;
const params = new URLSearchParams(search);
const id = params.get("id");
async function fetchProductDetails() {
  try {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const id = params.get("id");

    const response = await fetch(`https://dummyjson.com/products/${id}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const productData = await response.json();

    const details = document.querySelector(".details");
    const div = document.createElement("div");
    div.classList.add("detail");
    let priceDiscount =
    Math.floor(  productData.price -
      (productData.price * productData.discountPercentage) / 100)
    console.log(productData);
    div.innerHTML = `
        <div class="detailItem">
          <div>
          
          <img src="${productData.thumbnail}" alt="${productData.title}">
          </div>
          <div> <h3 class='title'>${productData.title}</h3>
          <p class="description">${productData.description}</p>
          <p > <span class="price"> $  ${priceDiscount}</span><span class="oldPrice">$${productData.price}</span></p>
          <p class="discount"><span class='sub'>Discount:</span> ${productData.discountPercentage}%</p>
          <p class="rating"><span class='sub'>Rating:</span> ${productData.rating}</p>
          <p class="stock"><span class='sub'>Stock:</span> ${productData.stock}</p>
          <p class="brand"><span class='sub'>Brand:</span> ${productData.brand}</p>
          <p class="category"><span class='sub'>Category:</span>${productData.category}</p></div>
     
    
          
        </div>`;
    details.appendChild(div);
  } catch (error) {
    console.error("Error:", error);
  }
}

fetchProductDetails();
