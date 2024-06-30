async function fetchProducts() {
    try {
      const response = await fetch('data.json');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching products:', error);
      return []; 
    }
  }
class product{
    constructor(name, tag, unit_price, image, price, discount, old_price, short_desc){
        this.name = name;
        this.tag = tag;
        this.unit_price = unit_price;
        this.image = image;
        this.price = price;
        this.discount = discount;
        this.old_price = old_price;
        this.short_desc = short_desc;
    }
}

function capitalizeFirstLetter(str) {
    const firstLetter = str.charAt(0).toUpperCase();
    const remainingString = str.slice(1);
    return firstLetter + remainingString;
}

function reverse(s){
    return s.split("").reverse().join("");
}

function changePriceFormat(price){
    price = price.toString();
    price = reverse(price);
    price = price.match(/.{1,3}/g);
    return reverse(price.join("."));
}

function generateProduct(product){

    if (product.tag){
        product.tag = capitalizeFirstletter(product.tag);
    }
    if (product.image){
        product.image = "data:image/png;base64," + product.image;
    }
    product.price = changePriceFormat(product.price);
    product.unit_price = capitalizeFirstletter(product.unit_price);
    const markup = `<div class = "product-container" id="${product.name}"> 
    <img class = "product-image" src="${product.image}" alt="${product.name}">
    <p class = "discount">${product.discount ?`-${product.discount}%`:"" } </p>
    <p class = "tag">${product.tag ? product.tag : ""} </p>

    <h3 class = "product-name">${product.name}</h3>
    <p class = "product-description">${product.short_desc}</p>
    <h4 class = "product-price">${product.unit_price} ${product.price}</h4>
    <p class = "product-old-price"><del>${product.old_price ? product.old_price : ""}</del></p>
    <div class = "product-hover-utility">
        <button class "product-add-to-cart">Add to Cart</button>
        <a href = ""><span class = "material-symbols-outlined">share</span>Share</a>
        <a href = ""><span class = "material-symbols-outlined">sync_alt</span>Compare</a>
        <a href = ""><span class = "material-symbols-outlined">favourite</span>Like</a>
    </div>
</div>`;
    const productContainer = document.getElementById("product-range");
    productContainer.insertAdjacentHTML("beforeend", markup);
}

async function displayProducts() {
    const products = await fetchProducts();

    products.forEach(product => {
      generateProduct(product);
    });
  }

  displayProducts();