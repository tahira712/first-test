async function getData() {
  try {
    let res = await fetch("https://dummyjson.com/products");
    let data = await res.json();
    let productsData = data.products;
    let products = document.querySelector(".products");
    let input = document.createElement("input");
    let inputDiv = document.querySelector(".inputDiv");
    inputDiv.append(input);
    products.append(inputDiv);
    input.setAttribute("type", "text");
    input.setAttribute("placeholder", "Search");

    input.addEventListener("input", () => {
      let value = input.value.trim().toLowerCase();
      productsData.forEach((productData) => {
        let productDiv = document.getElementById(`product-${productData.id}`);
        let arr = Object.values(productData).join("");
        console.log(productDiv);
        if (arr.toLowerCase().includes(value)) {
          productDiv.style.display = "grid";
        } else {
          productDiv.style.display = "none";
        }
      });
    });

    productsData.forEach((productData) => {
      let productDiv = document.querySelector(`product-${productData.id}`);
      if (!productDiv) {
        productDiv = document.createElement("div");
        productDiv.setAttribute("id", `product-${productData.id}`);
        productDiv.classList.add("product");

        productDiv.innerHTML = `
          <span class='discount'>${
            productData.discountPercentage
          }%<span></span></span>
            <div class="productImg"><img src="${productData.thumbnail}"/></div>
            <div class="productText">
                <p class="title"><span class="titleSpan">${
                  productData.title
                }</span><span class="stockSpan">${productData.stock}</span></p>
                <div class="description">${
                  productData.description.slice(0, 80) + "..."
                }</div>
                <div class="category">${productData.category}<img
                    src="./img/arrow.svg" alt=""> </div>
            </div>
            <div class="productInfo">
            <div class="rating">
                <div class="left">${productData.rating}</div>
                <div class="right"><div class="imgScore"><div class="img"><img src="./img/default.png" alt=""></div><span
                    class="scoretxt">score</span></div></div>
            </div>
            <a href="details.html?id=${
              productData.id
            }" ><button>More Info</button></a>
            <div class="compare">Compare prices<img
            src="./img/arrow.svg" alt=""></div>
        </div>
          `;

        products.appendChild(productDiv);
      }
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

window.addEventListener("load", getData);
